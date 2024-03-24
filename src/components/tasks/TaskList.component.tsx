import Task from "./Task.component"
import CreateTask from './CreateTask.component'
import './TaskList.css'
import { useMemo, useState } from "react"
import TaskContext from "../../context/TaskContext"

export type TaskType = {
    id: number
    title: string
    isActive: boolean
}

const generateId = () => Math.floor(Math.random() * 1000) + new Date().getTime()


const TaskList = () => {
    const [isEditing, setIsEditing] = useState(-1)
    const [tasks, setTasks] = useState<TaskType[]>([{
        id: generateId(),
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ipsa numquam totam impedit itaque temporibus aliquam tenetur beatae cupiditate earum eligendi amet quos explicabo omnis maxime, possimus eaque error? Accusantium sapiente corrupti eum?',
        isActive: false
    },
    {
        id: generateId(),
        title: 'Tarea 2',
        isActive: true
    }])

    const tasksSorted = useMemo(() => {
        return tasks.sort((a, b) => Number(b.isActive) - Number(a.isActive))
    }, [tasks])

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>

            <div className="task-wrapp">
                <CreateTask onClickHander={(text) => setTasks([{ id: generateId(), title: text, isActive: true }, ...tasks])} />
                {tasks.length > 0 ? tasksSorted.map((task) => <Task isEditing={isEditing} setIsEditing={setIsEditing} key={task.id} isActive={task.isActive} title={task.title} id={task.id} />) : <p className="no-tasks">No hay tareas</p>}
            </div>
        </TaskContext.Provider>
    )
}

export default TaskList