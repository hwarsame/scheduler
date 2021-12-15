import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition (value, replace = false){
      console.log('HISTORY>>>> 1', history)
      // setMode(value)
      setHistory(prev => {
        if (replace) {
        prev.pop()
        }
        return  [...prev ,value]})
  }

  function back () {
    console.log('HISTORY>>>>>', history.length)
    // setMode(history [history.length - 2])
    setHistory(prev  => {
      if (prev.length > 1){
        prev.pop()
      }
      return  [...prev]})
  }
    const mode = history[history.length - 1]
    return {mode, transition, back}
}



