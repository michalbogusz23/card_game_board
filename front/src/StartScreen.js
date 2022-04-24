import {SocketContext} from "./context";
import {useContext, useState} from "react";

export default function StartScreen(props) {
    const [value, setValue] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const handleNewGame = () => {
        props.onChangeStep(1)
    }

    const socket = useContext(SocketContext)

    const joinGame = async () => {
        socket.emit("create room", 123, 2)
    }

    return <div className="center-screen">
        <div className="center-screen-row">
            <input type="text"
                   name="name"
                   placeholder="GAME CODE"
                   value={value}
                   onChange={e => handleChange(e)}
            />
            <button className="btn-join-game" onClick={joinGame}>Join game</button>
        </div>
        <div className="center-screen-row">
            <button className="btn-create-game" onClick={handleNewGame}>Create new game</button>
        </div>
    </div>;
}