export const consoleLog = jest.spyOn(console, 'log').mockImplementation();
export const consoleError = jest.spyOn(console, 'error').mockImplementation();
export const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
export const consoleInfo = jest.spyOn(console, 'info').mockImplementation();
