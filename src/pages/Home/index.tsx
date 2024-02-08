import { HandPalm, Play } from "phosphor-react"
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./style"
import { CycleForm } from "../CycleForm";
import { Countdown } from "../../components/Countdown";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../context/CycleContext";

export interface Cycle {
    id: string;
    task: string;
    durationInMinutes: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date
}

export interface NewCycleFormData {
    task: string;
    durationInMinutes: number;
}

export function Home() {
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext);

    const newCycleForm = useForm<NewCycleFormData>({
        defaultValues: {
            task: "",
            durationInMinutes: 0
        }
    });

    const { handleSubmit, watch, /* reset */ } = newCycleForm;


    const task = watch("task");
    const durationInMinutes = watch("durationInMinutes");

    const isSubmitDisabled = !task && !durationInMinutes;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(createNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <CycleForm />
                </FormProvider>
                <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm size={24} />Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer >
    )
}