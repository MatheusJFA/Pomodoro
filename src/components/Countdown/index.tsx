import { useContext, useEffect } from "react";
import { Separator, TimerContainer } from "./style";

import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../context/CycleContext";

export function Countdown() {
    const {activeCycle, amountSecondsPassed, setSecondPassed, finishCurrentCycle} = useContext(CyclesContext);

    const durationInSeconds = activeCycle ? activeCycle.durationInMinutes * 60 : 0;
    const currentSeconds = activeCycle ? (durationInSeconds - amountSecondsPassed) : 0;

    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;

    const minutesDigits = String(minutes).padStart(2, '0')
    const secondsDigits = String(seconds).padStart(2, '0')


    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const elapsedSeconds = differenceInSeconds(new Date(), activeCycle.startDate);

                if (elapsedSeconds >= durationInSeconds) {

                    finishCurrentCycle();

                    setSecondPassed(durationInSeconds);
                    clearInterval(interval);
                }
                else setSecondPassed(elapsedSeconds);

            }, 1000)
        }

        return () => {
            clearInterval(interval);
        }
    }, [activeCycle, durationInSeconds, finishCurrentCycle, setSecondPassed]);


    useEffect(() => {
        if (activeCycle) document.title = `${activeCycle.task} - ${minutesDigits}:${secondsDigits}`;
    }, [activeCycle, minutesDigits, secondsDigits])

    return (
        <TimerContainer>
            <span>{minutesDigits[0]}</span>
            <span>{minutesDigits[1]}</span>
            <Separator>:</Separator>
            <span>{secondsDigits[0]}</span>
            <span>{secondsDigits[1]}</span>
        </TimerContainer>
    )
}