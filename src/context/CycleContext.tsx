import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { Cycle } from "../pages/Home";
import { ActionTypes, cyclesReducer } from "../reducers/cycles";
import { differenceInSeconds } from "date-fns";

interface NewCycleFormData {
    task: string;
    durationInMinutes: number;
}

interface CycleContextType {
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    cycles: Cycle[]
    amountSecondsPassed: number,
    setSecondPassed: (seconds: number) => void,
    finishCurrentCycle: () => void,
    createNewCycle: (data: NewCycleFormData) => void
    interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, 
        { cycles: [], activeCycleId: null }, 
        (initialState) => { 
            const storeValues = localStorage.getItem("@tomadoro:cyclesState-1.0.0");
             
            if (storeValues)
                return JSON.parse(storeValues);
            else 
                return initialState;
        });

    useEffect(() => {
        const json = JSON.stringify(cyclesState)

        localStorage.setItem("@tomadoro:cyclesState-1.0.0", json)
    }, [cyclesState])

    const { cycles, activeCycleId } = cyclesState;

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
        if(activeCycle) return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
        else  return 0;
    });

    function interruptCurrentCycle() {
        dispatch({ type: ActionTypes.INTERRUPT_CURRENT_CYCLE, payload: activeCycleId })
    }

    function createNewCycle(data: NewCycleFormData) {

        let id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            durationInMinutes: data.durationInMinutes,
            startDate: new Date()
        }

        dispatch({ type: ActionTypes.ADD_NEW_CYCLE, payload: { newCycle } })
        setAmountSecondsPassed(0);

        // reset();
    }

    function finishCurrentCycle() {
        dispatch({ type: ActionTypes.FINISH_CURRENT_CYCLE, payload: activeCycleId })
    }

    function setSecondPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }


    return (
        <CyclesContext.Provider value={{
            activeCycle,
            activeCycleId,
            cycles,
            amountSecondsPassed,
            setSecondPassed,
            finishCurrentCycle,
            createNewCycle,
            interruptCurrentCycle
        }}>
            {children}
        </CyclesContext.Provider>
    )

}