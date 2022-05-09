import React, {useContext, useEffect, useRef, useState} from "react";
import {Box, Button} from "@mui/material";
import logo from "../logo.svg";
import {AppState} from "../AppState.context";


function Content (props){
    const { classes } = props;
    const {appState, socket, changeAppState } = useContext(AppState);
    const [helloCount, setHelloCount] = useState(0)
    const appStateRef = useRef(appState);

    useEffect(() => {
        appStateRef.current = appState;
    });

    useEffect(() => {
        console.log('hello')
        socket.on('hello_from_backend', () => {
            setHelloCount( (prevState) => prevState + 1)
            changeAppState('serverHello', appStateRef.current.serverHello + 1)
        });
    }, []);

    const webHello = () => {
        socket.emit('hello_from_web')
    }

    return (
        <Box >
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <Button onClick={webHello}>Hello to Server</Button>
                    <p>Responses (page Count): {helloCount}</p>
                    <p>Responses (global Count): {appState.serverHello}</p>
                </header>
            </div>
        </Box>
    );
}
export default Content;