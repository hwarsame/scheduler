import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition (value, replace = false){
      if (replace) {
        history.pop()
      }
      setMode(value)
      setHistory(prev => [...prev ,value])
  }

  function back () {
    console.log('HISTORY>>>>>', history.length)
    if (history.length > 1){
      history.pop()
    }
    setMode(history[history.length - 1])
  }
 
    return {mode, transition, back}

}


