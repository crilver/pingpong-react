import { useState, useEffect } from "react"
import TablePoints from "./components/TablePoints"
import NewGame from "./components/NewGame"
import GameSet from "./components/GameSet"

function App() {
  
  const[player1, setPlayer1] = useState({})
  const[player2, setPlayer2] = useState({})
  const[server, setServer] = useState("")

  const[newGame, setNewGame] = useState(true)

  const[data, setData] = useState(null)
  const[loading, setLoading] = useState(true)

  useEffect(() =>{
    setLoading(true)
    fetch("http://localhost:3030/players")
    .then(res => res.json())
    .then(data => setData(data))
    .finally(() => setLoading(false))
  },[newGame])

  return (
    <>
      <div className="flex flex-col h-screen bg-slate-300">
        <h1
          className="text-4xl font-bold text-center my-5"
        >
          Ping Pong Game
        </h1>
        {newGame ? (
          <NewGame 
          player1={player1}
          player2={player2}
          setPlayer1={setPlayer1}
          setPlayer2={setPlayer2}
          server={server}
          setServer={setServer}
          data={data}
          loading={loading}
          setNewGame={setNewGame}
        />
        ):(
          <GameSet 
            player1={player1}
            player2={player2}
            server={server}
            setServer={setServer}
            setNewGame={setNewGame}
          />
        )}        
        <TablePoints 
          data={data}
        />
      </div>
    </>
  )
}

export default App
