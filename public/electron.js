const { app, BrowserWindow } = require('electron');
const {io} = require("socket.io-client");
const isDev = require('electron-is-dev');
const path = require('path');


let mainWindow;
let splash

function createWindow() {
    mainWindow = new BrowserWindow({
        width:1350,
        height:700,
        show: false,
        webPreferences: { nativeWindowOpen: true,
            enableRemoteModule: true,
            nodeIntegration:true,
            contextIsolation:false},
        autoHideMenuBar: true,
        // titleBarStyle: "hidden",
        // frame:false,
        useContentSize: true
    });
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
    const {PythonShell} = require('python-shell');


    splash = new BrowserWindow({width: 450, height: 450, transparent: true, frame: false, alwaysOnTop: true});
    splash.loadURL(`file://${__dirname}/splash.html`);

    if (!isDev) {
        let python = require("child_process").execFile("python_engine\\dist\\app\\app.exe", {shell: true});
        python.stderr.on("data", (data) => {
          console.error(`stderr: ${data}`);
          console.log(`stderr: ${data}`);
        });

        python.on("close", (code) => {
          console.log(`child process exited with code ${code}`);
        });

        // const options = {
        //     mode: 'text',
        //     pythonPath: 'C:/Users/Welaptega/CMSv3/app/envs/cms_env/Scripts/python.exe',
        //     scriptPath: 'C:/Users/Welaptega/CMSv3-app/CMSv3/python_engine',
        // };
        // let pyshell = new PythonShell('app.py', options);
        // pyshell.on('message', function (message) {
        //     console.log(message);
        // })
        //
        // pyshell.end(function (err) {
        //     if (err) {
        //         throw err;
        //     }
        //     console.log('finished');
        // });
    }

    let endPoint = "http://127.0.0.1:5000/elec";
    const socket = io(endPoint, {reconnection: true, transports: ['websocket']});

    socket.on('connect', () => {
        console.log("connected renderer"); // displayed
        socket.emit('window_ready')
    })

    socket.on('connected', () => {
        mainWindow.loadURL(startURL);
        mainWindow.setSize(800, 600);
        mainWindow.center();
        console.log("server ready"); // displayed
    })

    socket.on('show_window', () => {
        splash.destroy()
    })

    socket.on('disconnect', () => {
        console.log("server disconected"); // displayed
        mainWindow.close()
    })

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        console.log('main_window_ready')
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
        app.exit()
    });
}

app.on('ready', createWindow);