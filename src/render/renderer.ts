/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import { ipcRenderer } from 'electron';
import dayjs from 'dayjs';
import type { DbData } from '../shared/types';
import _ from 'lodash';

(window as any).DEBUG = {
  showDB() {
    const db = ipcRenderer.sendSync('getDB');
    console.log(db);
  },
};

setInterval(() => {
  ipcRenderer.send('requestStats');
}, 1000);

ipcRenderer.on('updateStats', (event, data: DbData['stats']) => {
  const todayStats = data[dayjs().format('YYYY-MM-DD')];
  const statsSum = _.mapValues(todayStats, (detail) => _.sum(_.values(detail))); // Object.entries(todayStats); //.map(([process, detail]) => )

  document.querySelector('#stats').innerHTML = `
  <div>
    <div>今日统计信息</div>
    <div>${JSON.stringify(statsSum, null, 2)}</div>
  </div>
  `;
});
