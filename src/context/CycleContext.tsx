import { ReactNode, createContext, useState } from "react";

interface Cycle {
    id: string;
    task: string;
    durationInMinutes: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date
}

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
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

    function interruptCurrentCycle() {
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleId) return { ...cycle, interruptedDate: new Date() }
            else return cycle;
        }))

        setActiveCycleId(null);
    }

    function createNewCycle(data: NewCycleFormData) {

        let id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            durationInMinutes: data.durationInMinutes,
            startDate: new Date()
        }

        setCycles(state => [...state, newCycle]);
        setActiveCycleId(newCycle.id);
        setAmountSecondsPassed(0);

        // reset();
    }

    function finishCurrentCycle() {
        setCycles((state: any) => state.map((cycle: Cycle) => {
            if (cycle.id === activeCycleId) return { ...cycle, finishedDate: new Date() }
            else return cycle;
        }))
    }

    function setSecondPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

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