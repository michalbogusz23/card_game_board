import React, {useContext, useState} from "react";
import "./war.css";
import StartScreen from "../StartScreen";
import GamesList from "../GamesList";

export default function Start() {
    const [step, setStep] = useState(0)
    function handleChangeStep(step) {
        setStep(step);
    }
    return (
        <div>
            {step === 0 && <StartScreen onChangeStep={handleChangeStep}/>}
            {step === 1 && <GamesList/>}
        </div>
    )
}
