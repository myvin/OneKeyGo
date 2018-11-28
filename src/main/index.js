'use strict'

import { app, Menu, Tray, BrowserWindow } from 'electron'
import pkg from '../../package.json'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let miniWindow
let aboutWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#edit`
  : `file://${__dirname}/index.html#edit`
const miniWinURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#mini`
  : `file://${__dirname}/index.html#mini`
const aboutWinUrl = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#about`
  : `file://${__dirname}/index.html#about`

// let openDialog = () => {
//   dialog.showMessageBox({
//     title: 'QuietWeather',
//     message: 'QuietWeather',
//     detail: `Copyright: 2018-present, myvin\nVersion: ${pkg.version}\nAuthor: myvin\nGihub: https://github.com/myvin`
//   })
// }

let createMiniWindow = () => {
  miniWindow = new BrowserWindow({
    // useContentSize: true,
    height: 350,
    width: 196,
    show: false,
    frame: true,
    // center: true,
    fullscreenable: false,
    // titleBarStyle: 'hidden',
    // do not set title here, title here will be ignored by the title of index.html
    // title: `${pkg.name}`,
    resizable: false,
    vibrancy: 'ultra-dark',
    transparent: false,
    webPreferences: {
      backgroundThrottling: false
    }
  })

  miniWindow.loadURL(miniWinURL)
  miniWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle(`${pkg.name}`)
  })

  miniWindow.on('closed', () => {
    miniWindow = null
  })
}

let createAboutWindow = () => {
  aboutWindow = new BrowserWindow({
    height: 260,
    width: 300,
    show: false,
    frame: true,
    // center: true,
    fullscreenable: false,
    resizable: false,
    minimizable: false,
    maximizable: false,
    vibrancy: 'ultra-dark',
    transparent: false,
    backgroundColor: '#ececec',
    webPreferences: {
      backgroundThrottling: false
    }
  })

  aboutWindow.loadURL(aboutWinUrl)
  aboutWindow.webContents.on('did-finish-load', () => {
    aboutWindow.setTitle(`关于 ${pkg.name}`)
  })

  aboutWindow.on('closed', () => {
    aboutWindow = null
  })
}

let createWindow = () => {
  mainWindow = new BrowserWindow({
    // useContentSize: true,
    height: 600,
    width: 900,
    show: true,
    frame: true,
    // center: true,
    fullscreenable: false,
    // titleBarStyle: 'hidden',
    resizable: true,
    vibrancy: 'ultra-dark',
    transparent: false,
    webPreferences: {
      backgroundThrottling: false
    }
  })

  mainWindow.loadURL(winURL)
  mainWindow.webContents.on('did-finish-load', () => {
    miniWindow.setTitle(`${pkg.name}`)
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  createMiniWindow()
  createAboutWindow()
}

let tray = null
app.on('ready', () => {
  createWindow()
  tray = new Tray(`${__static}/assets/menubar_black.png`)
  // ipcMain.on('setTrayTitle', (e, arg) => {
  //   tray.setTitle(arg)
  // })
  // macOS only
  if (process.platform === 'darwin') {
    tray.setPressedImage(`${__static}/assets/menubar_white.png`)
  }
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '关于',
      click: () => {
        aboutWindow.show()
      }
    },
    {label: '退出', role: 'quit'}
  ])
  tray.on('right-click', () => {
    tray.popUpContextMenu(contextMenu)
  })

  tray.on('click', (e, bounds, pos) => {
    if (miniWindow.isVisible()) {
      miniWindow.hide()
    } else {
      miniWindow.setPosition(bounds.x, 0, true)
      miniWindow.show()
    }
  })
  tray.setToolTip(`${pkg.name}`)
  // 不设置上下文
  // tray.setContextMenu(contextMenu)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
