import TaskList from './components/tasks/TaskList.component'
import Timer from './components/timer/Timer.component'

import './index.css'

function App() {

  return (
    <>
      <div className="container">
        <Timer />
        <TaskList />
      </div>
    </>
  )
}

export default App
