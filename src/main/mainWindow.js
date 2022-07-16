import BrowserWinHandler from './BrowserWinHandler'
import './rpc.js'
const winHandler = new BrowserWinHandler({
  minWidth: 1152,
  minHeight: 864,
  autoHideMenuBar: true
})

winHandler.onCreated(_browserWindow => {
  winHandler.loadPage('/')
})

export default winHandler
