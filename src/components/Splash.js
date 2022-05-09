import React, {useContext, useEffect, useRef} from "react";
import {AppState} from "../AppState.context";
import {Box, Button} from "@mui/material";


function Splash (props){
    const {classes} = props
    const {socket } = useContext(AppState);

    const startApp = () => {

            socket.emit('set_ui_mode', {mode: 'USER'})
    }


    return (
        <Box>
            <Button onClick={startApp}>Start App</Button>
        </Box>
    );
}

export default Splash;