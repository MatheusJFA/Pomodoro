import { produce } from "immer";

export interface Cycle {
    id: string;
    task: string;
    durationInMinutes: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date
}

interface CycleState {
    cycles: Cycle[],
    activeCycleId: string | null
}

export enum ActionTypes {
    ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
    INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
    FINISH_CURRENT_CYCLE = "FINISH_CURRENT_CYCLE"
}

export function cyclesReducer(state: CycleState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            return produce(state, draft => {
                draft.cycles.push(action.payload.newCycle);
                draft.activeCycleId = action.payload.newCycle.id;
            })

        case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
            const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId);

            if (currentCycleIndex < 0) return state;

            return produce(state, draft => {
                draft.activeCycleId = null;
                draft.cycles[currentCycleIndex].interruptedDate = new Date();
            })
        }

        case ActionTypes.FINISH_CURRENT_CYCLE: {
            const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId);

            if (currentCycleIndex < 0) return state;

            return produce(state, draft => {
                draft.activeCycleId = null;
                draft.cycles[currentCycleIndex].finishedDate = new Date();
            })   
        }
        default:
            return state;

    }
}