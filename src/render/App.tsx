import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import dayjs from 'dayjs';
import type { DbData } from '../shared/types';
import { mapValues, sum, values } from 'lodash-es';
import ms from 'ms';

export const App: React.FC = React.memo(() => {
  const [arr, setArr] = useState<[string, number][]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      ipcRenderer.send('requestStats');
    }, 1000);

    ipcRenderer.on('updateStats', (event, data: DbData['stats']) => {
      const todayStats = data[dayjs().format('YYYY-MM-DD')];
      const statsSum = mapValues(todayStats, (detail) => sum(values(detail)));

      setArr(Object.entries(statsSum));
    });

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <div>今日用量统计: </div>
      {arr.map(([name, count]) => (
        <div key={name}>
          {name}: {ms(count)}
        </div>
      ))}
    </div>
  );
});
App.displayName = 'App';
