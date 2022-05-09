import theme from "./Theme.style";
import React, {useContext, useEffect, useState} from "react";
import {AppState} from "../AppState.context";
import Splash from "./Splash";
import Content from "./Content";
import {CssBaseline, ThemeProvider} from "@mui/material";
import './MainWindow.css';


function MainWindow (props){
    const { classes } = props;
    const { appState, changeAppState, socket } = useContext(AppState);
    const [appMode, setAppMode] = useState(<Content/>)


    useEffect(() => {
        socket.on('change_app_mode', (newMode) => {
            console.log(newMode)
            changeAppState('loadingProcesses',  false, 'APP_MODE_CHANGE')
            if (newMode === 'SPLASH'){
                setAppMode(<Splash/>)
            }
            else if (newMode === 'USER') {
                setAppMode(<Content/>)

            }
            socket.emit('app_mode_change', newMode)
        });
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
                {appMode}
        </ThemeProvider>
    );
}
export default MainWindow;