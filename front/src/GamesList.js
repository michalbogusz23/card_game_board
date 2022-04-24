import React, {useState} from "react";
import CreateGameSettings from "./CreateGameSettings";

export default function GamesList() {
    const [games, setGames] = useState(["makao", "war"])
    const [game, setGame] = useState("")

    function handleGameChosen(game) {
        setGame(game)
        console.log('dupa')
    }

    function renderAllGames() {
        return games.map((game, index) => {
            return <button key={index} onClick={e => handleGameChosen(game, e)} className="game-tile">{game}</button>;
        });
    }


    return (
        <div className="center-screen">
            {
                game === "" &&
                <div>
                    <div className="choose-game">Choose game:</div>
                    <div className="game-list">
                        {renderAllGames(games)}
                    </div>
                </div>
            }
            {
                game === "war" &&
                <CreateGameSettings/>
            }

        </div>
    )
}