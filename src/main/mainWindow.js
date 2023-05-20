import BrowserWinHandler from './BrowserWinHandler'

const winHandler = new BrowserWinHandler({
  height: 600,
  width: 1000,
  autoHideMenuBar: true
})

winHandler.onCreated(_browserWindow => {
  winHandler.loadPage('/')
  // Or load custom url
  // _browserWindow.loadURL('https://google.com')
})

export default winHandler
