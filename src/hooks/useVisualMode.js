import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial])

  function transition(value, replace = false) {
    console.log('HISTORY>>>> 1', history)
    const newHistory = [...history]
    // setHistory(prev => {
    //   if (replace) {
    //     prev.pop()
    //   }
    //   return [...prev, value]
    // })
    if (replace){
      newHistory.pop()
    }
    setHistory([...newHistory, value])
  }

  function back() {
    console.log('HISTORY>>>>>', history.length)
    const newHistory = [...history]
    if (newHistory.length > 1) {
      newHistory.pop()
    }
    setHistory([...newHistory])
  }
  const mode = history[history.length - 1]
  return { mode, transition, back }
}



// function transition(value, replace = false) {
//   setMode(value);
//   if (replace) {
//     setHistory(prev => {
//       return [...prev.slice(0, prev.length - 1), value]
//     });
//   } else {
//     setHistory(prev => [...prev, value]);
//   }
// }