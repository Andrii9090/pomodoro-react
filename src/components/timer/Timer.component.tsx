import { useCallback, useMemo, useReducer, useRef, useState } from "react"
import Button from "../ui/button.ui"
import './Timer.css'
import soundfile from '../../assets/music/ring.mp3'

let endPoint = 0
let interval: number | undefined

enum TimeToTimer {
    WORK = 25 * 60 * 1000,
    REST = 5 * 60 * 1000,
    LONG_REST = 15 * 60 * 1000
}

const initState = {
    minutes: 25,
    seconds: 60,
    isActive: false,
    quantity: 0,
    time: TimeToTimer.WORK
}

const formatMinutes = (minutes: number) => String(minutes).padStart(2, '0');


const formatSeconds = (totalSeconds: number) => String(totalSeconds % 60).padStart(2, '0');

const getTimeRemaning = (deadline: number) => {
    let time = deadline - new Date().getTime()
    return {
        minutes: Math.floor((time / 1000 / 60) % 60),
        seconds: Math.floor(time / 1000 % 60)
    }
}

const timerReducer = (_state: any, action: any): any => {
    switch (action.type) {
        case 'start':
            const result = getTimeRemaning(endPoint)
            if (result.minutes == 0 && result.seconds == 0) {
                new Audio(soundfile).play()
                _state.quantity += 1
                if (_state.quantity % 4==0) {
                    initState.time = TimeToTimer.LONG_REST
                }else{
                    if(_state.time == TimeToTimer.WORK){
                        initState.time = TimeToTimer.REST
                    }
                }
                clearInterval(interval)
                return initState
            }
            return { ...result, isActive: true }
        case 'stop':
            clearInterval(interval)
            return initState
    }
}

const Timer = () => {
    const [state, dispatch] = useReducer(timerReducer, initState)
    const defaultTitle = useRef(document.title)

    const clickHandler = useCallback(() => {
        endPoint = new Date().getTime() + state.time
        dispatch({ type: 'start' })

        if (!state.isActive) {
            interval = setInterval(() => {
                dispatch({ type: 'start' })
            }, 1000)
        } else {
            document.title = defaultTitle.current
            dispatch({ type: 'stop' })
        }
    }, [state])

    useMemo(() => {
        document.title = state.isActive ? `${formatMinutes(state.minutes)}:${formatSeconds(state.seconds)}` : defaultTitle.current
    }, [state])

    return (
        <>
            <div className="timer-wrapp">
                <div className="timer-data">
                    <span className='minutes'>{formatMinutes(state.minutes)}</span>
                    <span className='colon'>:</span>
                    <span className='seconds'>{formatSeconds(state.seconds)}</span>
                </div>
                <div className="controls">
                    {!state.isActive && <Button title="Iniciar" className="btn-start" onClick={() => clickHandler()} />}
                    {state.isActive && <Button title="Detener" className="btn-stop" onClick={() => clickHandler()} />}
                </div>
            </div>
        </>
    )
}

export default Timer