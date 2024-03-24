import { Edit, Trash2 } from "react-feather"
import Button from "../ui/button.ui"
import './Task.css'
import TaskContext from "../../context/TaskContext"
import { useContext, useState } from "react"
import CreateTask from "./CreateTask.component"

type TaskProps = {
    id: number
    title: string
    isActive: boolean
    isEditing: number
    setIsEditing: (id: number) => void
}

const Task = ({ id, title, isActive, isEditing, setIsEditing }: TaskProps) => {
    const [isActiveTask, setIsActiveTask] = useState(isActive)
    const { tasks, setTasks } = useContext(TaskContext)
    if (isEditing==id) {
        return <CreateTask value={title} onClickHander={(text) => {
            setTasks([...tasks.map((task) => task.id === id ? { ...task, title: text } : task)])
            setIsEditing(-1)
        }}/>
    } else {
        return (<div className="task fade-item fadein">
            <span className={`task-title ${!isActiveTask ? 'task-no-active' : ''}`} onClick={() => {
                setIsActiveTask(!isActiveTask)
                setTasks([...tasks.map((task) => task.id === id ? { ...task, isActive: !task.isActive } : task)])
            }}>{title}</span>
            <div className="btn-block">
                <Button title={<Edit />} className="btn-edit" onClick={() =>setIsEditing(id) } />
                <Button title={<Trash2 />} className="btn-delete" onClick={() => {
                    if (confirm('¿Deseas eliminar esta tarea ' + title + '?')) {
                        setTasks([...tasks.filter((task) => task.id !== id)])
                    }
                }} />
            </div>
        </div>)
    }
}

export default Task