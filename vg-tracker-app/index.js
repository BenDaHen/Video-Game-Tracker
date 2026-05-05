const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 280.
    })

    //CORS Bypass
    // win.webContents.session.webRequest.onBeforeSendHeaders(
    //     (details, callback) => {
    //         callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
    //      },
    // );

    // win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    //     callback({
    //         responseHeaders: {
    //             'Access-Control-Allow-Origin': ['*'],
    //             // We use this to bypass headers
    //             'Access-Control-Allow-Headers': ['*'],
    //             ...details.responseHeaders,
    //         },
    //     });
    // });

    //Content Security Policy
    // win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    //     callback({
    //         responseHeaders: {
    //             ...details.responseHeaders,
    //             'Content-Security-Policy': ['default-src \'none\'']
    //         }
    //     })
    // })

    win.loadFile('index.html')

    win.setMenuBarVisibility(false)
}

app.whenReady().then(() => {
    createWindow()
})