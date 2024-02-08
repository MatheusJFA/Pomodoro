import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./style";
import { CyclesContext } from "../../context/CycleContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
export function History() {
    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(cycle => (
                            <tr>
                                <td>{cycle.task}</td>
                                <td>{cycle.durationInMinutes} minutos</td>
                                <td>{formatDistanceToNow(new Date(cycle.startDate), {
                                    addSuffix: true,
                                    locale: ptBR
                                })}</td>
                                {cycle.finishedDate && (<td><Status statusColor="green">Concluido</Status></td>)}
                                {cycle.interruptedDate && (<td><Status statusColor="red">Interrompido</Status></td>)}
                                {(!cycle.finishedDate && !cycle.interruptedDate) && (<td><Status statusColor="yellow">Em andamento</Status></td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
