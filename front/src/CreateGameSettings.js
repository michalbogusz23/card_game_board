import React, {useContext, useState} from "react";
import {SocketContext} from "./context";

export default function CreateGameSettings() {
    const uid = `http://localhost:3003/war/${Date.now()}`
    const game = 'war'
    const socket = useContext(SocketContext)

    return (
        <div className="center-screen">
            <div>
                <span id="myInput">{uid}</span>

                <button onClick={() => {navigator.clipboard.writeText(uid)}}>Copy text</button>
            </div>
            <div>
                <button>Start the game</button>
            </div>
        </div>
    )
}