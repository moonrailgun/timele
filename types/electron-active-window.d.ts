declare module 'electron-active-window' {
  export interface WindowMeta {
    // Operating system (linux | windows | macos)
    os: 'linux' | 'windows' | 'macos';
    // Process name (chromium.exe on windows)
    windowClass: string;
    // Blog | bytee.net
    windowName: string;
    // Desktop on which the window is displayed (Linux only)
    windowDesktop: string | null;
    // Window Type (Linux only)
    windowType: string | null;
    // Process ID of the window
    windowPid: string;
    // Idle Time in seconds
    idleTime: string;
  }

  function activeWindows(): {
    getActiveWindow(): Promise<WindowMeta>;
  };

  export default activeWindows;
}
