import activeWindow from 'active-win';

export function init(): void {
  const loop = () => {
    getActiveWindowMeta().then((meta) => {
      console.log('meta', meta);
      setTimeout(() => {
        loop();
      }, 1000);
    });
  };
  loop();
}

async function getActiveWindowMeta() {
  const meta = await activeWindow();

  return meta;
}
