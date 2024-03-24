import { createContext } from "react"
import { TaskType } from "../components/tasks/TaskList.component"

type taskContextType = {
    tasks: TaskType[],
    setTasks: Function,
}

const TaskContext = createContext<taskContextType>({
    tasks: [],
    setTasks: () => {},
})

export default TaskContext