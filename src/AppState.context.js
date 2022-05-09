import React, {createContext, useEffect, useState} from "react";
import {io} from "socket.io-client";

export const AppState = createContext(null);

let endPoint = "http://127.0.0.1:5000/web";
const socket = io(endPoint, {reconnection: false, transports: ['websocket']});

export const AppStateProvider = (props => {
    const appStateData = {
        appMode: 'SPLASH',
        serverHello: 0,
        loadingProcess: 'APP',
        loadingProcesses: {
            'APP': true,
        }
    };


    const [appState, setAppState] = useState(appStateData)

    const changeAppState = (property, value, subProperty='') => {
        if (subProperty === '') {
            setAppState(prevInfo => ({...prevInfo, [property]: value}));
        }
        else {
            setAppState( prevInfo => ({
                    ...prevInfo,
                    [property]: {
                        ...prevInfo[property],
                        [subProperty]: value
                    }
                })
            )
        }
    }


    useEffect(() => {
        socket.on('server_ready', () => {
            setAppState(prevState => ({
                    ...prevState,
                    loadingProcesses: {
                        ...prevState["loadingProcesses"],
                        'APP': false,
                    },
                })
            )
        })
    }, []);

    return (
        <AppState.Provider value={{ appState, changeAppState, socket}}>
            {props.children}
        </AppState.Provider>
    )
})