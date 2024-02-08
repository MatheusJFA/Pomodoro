import { FormContainer, MinutesAmountInput, TaskInput } from "./style";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../context/CycleContext";



export function CycleForm() {
    const { cycles, activeCycle } = useContext(CyclesContext);

    const { register } = useFormContext()

    return (
        <>
            <FormContainer>
                <label htmlFor="task">Vou trabalhar em </label>
                <TaskInput
                    type="text"
                    id="task"
                    placeholder="Insira o nome do seu projeto"
                    disabled={!!activeCycle}
                    list="task-suggestions"
                    {...register("task")}
                />

                <datalist id="task-suggestions">
                    {cycles.map(cycle => <option value={cycle.task} />)}
                </datalist>


                <label htmlFor="durationInMinutes">durante</label>
                <MinutesAmountInput
                    type="number"
                    id="durationInMinutes"
                    placeholder="00"
                    disabled={!!activeCycle}
                    step={5}
                    min={5}
                    max={60}
                    {...register("durationInMinutes", { valueAsNumber: true })}
                />

                <span>minutos.</span>
            </FormContainer >
        </>
    )
}