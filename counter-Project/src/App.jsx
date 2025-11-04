import { useState } from 'react'
import './App.css'

function App() {
  const [value, setvalue] = useState(0)

  function increment() {
    setvalue(value + 1)
  }

  function decrement() {
    setvalue(value - 1)
  }

  function reset() {
    setvalue(0)
  }

  return (

    <div className="app">
      <div className="counter-container">
        <button onClick={increment}>+</button>
        <h1 className="value">{value}</h1>
        <button onClick={decrement}>-</button>
      </div>
      <button className="reset" onClick={reset}>RESET</button>
    </div>
  )
}

export default App
