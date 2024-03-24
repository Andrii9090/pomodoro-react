import { useState } from "react"
import Button from "../ui/button.ui"
import './CreateTask.css'


const CreateTask = ({value='', onClickHander=(text:string) => {}}) => {
    const [currentValue, setCurrentValue] = useState(value)
    return (
        <div className="task">
            <input autoFocus type="text" className="input-task" placeholder="Escribe una nueva tarea" value={currentValue} onChange={(e)=>setCurrentValue(e.target.value)}/>
            <Button title="OK" className='btn-add' onClick={() => {
                setCurrentValue('')
                onClickHander(currentValue)
                }} />
        </div>
    )
}

export default CreateTask