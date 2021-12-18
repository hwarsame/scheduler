import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial])

  function transition(value, replace = false) {
    console.log('HISTORY>>>> 1', history)
    setHistory(prev => {
      if (replace) {
        prev.pop()
      }
      return [...prev, value]
    })
  }

  function back() {
    console.log('HISTORY>>>>>', history.length)
    setHistory(prev => {
      if (prev.length > 1) {
        prev.pop()
      }
      return [...prev]
    })
  }
  const mode = history[history.length - 1]
  return { mode, transition, back }
}



