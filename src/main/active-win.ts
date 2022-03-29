// import activeWindows, { WindowMeta } from 'electron-active-window';
import activeWindow from 'active-win';
import { ipcMain, app } from 'electron';
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import { get, set } from 'lodash-es';
import dayjs from 'dayjs';
import type { DbData } from '../shared/types';

type WindowMeta = activeWindow.Result;

const defaultData: DbData = {
  stats: {},
};

const dbpath = path.join(app.getPath('userData'), 'usage-db.json');
console.log('数据库地址:', dbpath);

const adapter = new JSONFile<DbData>(dbpath);
const db = new Low<DbData>(adapter);

export async function init(frequency = 1000): Promise<void> {
  await db.read();
  db.data ||= defaultData;

  const loop = () => {
    getActiveWindowMeta()
      .then((meta) => {
        recordActiveWindowUsage(meta, frequency);

        setTimeout(() => {
          loop();
        }, frequency);
      })
      .catch((error) => {
        console.error('获取当前窗口信息失败', error);
      });
  };
  loop();
}

async function getActiveWindowMeta(): Promise<WindowMeta> {
  // const meta = await activeWindows().getActiveWindow();
  const meta = await activeWindow();

  return meta;
}

/**
 * 记录当前窗口信息
 * @param meta 当前窗口信息
 * @param inc 增长数。默认1000(1s)
 */
async function recordActiveWindowUsage(
  meta: WindowMeta,
  inc: number
): Promise<void> {
  if (!meta) {
    return;
  }

  const date = dayjs().format('YYYY-MM-DD');

  // const p = [date, meta.windowClass, meta.windowName];
  const p = [date, meta.owner.name, meta.title];
  const usageTime = Number(get(db.data.stats, p)) || 0;
  set(db.data.stats, p, usageTime + inc);

  await db.write();
}

ipcMain.on('getDB', (event) => {
  event.returnValue = db.data;
});

ipcMain.on('requestStats', (event) => {
  event.reply('updateStats', db.data.stats);
});
