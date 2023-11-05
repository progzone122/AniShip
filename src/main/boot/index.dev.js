/* eslint-disable */
import { Menu, MenuItem, app, protocol } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { ELECTRON_RELAUNCH_CODE } from '../../../.electron-nuxt/config'

import * as path from 'path'
import { URL } from 'url'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

const PRODUCTION_APP_PROTOCOL = 'aniship'
const PRODUCTION_APP_PATH = path.join(__dirname, '..', 'renderer')

app.once('browser-window-created', (_, browserWindow) => {
  browserWindow.webContents.once('did-frame-finish-load', () => {
    browserWindow.webContents.openDevTools();
  })
})

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: PRODUCTION_APP_PROTOCOL, privileges: { secure: true, standard: true } }
]);


app.once('ready', () => {
  registerProtocol(PRODUCTION_APP_PROTOCOL)
  const menu = Menu.getApplicationMenu()
  const refreshButton = new MenuItem({
    label: 'Relaunch electron',
    accelerator: 'CommandOrControl+E',
    click: () => {
      app.exit(ELECTRON_RELAUNCH_CODE)
    }
  })
  menu.append(refreshButton)
  Menu.setApplicationMenu(menu)

  installExtension(VUEJS_DEVTOOLS)
})

// Credits: https://github.com/nklayman/vue-cli-plugin-electron-builder/blob/master/lib/createProtocol.js
function registerProtocol(scheme) {
  protocol.registerFileProtocol(
    scheme,
    (request, callback) => {
      const relativePath = path.normalize(new URL(request.url).pathname)
      const absolutePath = path.join(PRODUCTION_APP_PATH, relativePath)

      callback({ path: absolutePath })

    }
  )
}

// app.on('ready', () => {
//   const menu = Menu.getApplicationMenu()
//   const refreshButton = new MenuItem({
//     label: 'Relaunch electron',
//     accelerator: 'CommandOrControl+E',
//     click: () => {
//       app.exit(ELECTRON_RELAUNCH_CODE)
//     }
//   })
//   menu.append(refreshButton)
//   Menu.setApplicationMenu(menu)

//   installExtension(VUEJS_DEVTOOLS)
// })


const handleProcessExit = () => {
  app.exit(0)
  process.exit(0)
}

process.on('SIGINT', handleProcessExit);
process.on('SIGQUIT', handleProcessExit);
process.on('SIGTERM', handleProcessExit);

// Require `main` process to boot app
require('../index')
