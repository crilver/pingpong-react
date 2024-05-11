import { useState, useEffect } from "react";

export default function NewGame({player1, player2, setPlayer1, setPlayer2, server, setServer, data, loading, setNewGame}) {
    
    const[playerList, setPlayerList] = useState([])
    const[error, setError] = useState(false)

    useEffect(() => {
        if(!loading && data && !playerList.length){
            setPlayerList(data?.map(player => player.name))
        }
    },[loading])
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(server == "" || (player1.name == player2.name)){
            setError(true)            
        }else{
            setError(false)

            const dataPlayer1 = data.filter(player => player.name == player1.name)
            const dataPlayer2 = data.filter(player => player.name == player2.name)

            if(!dataPlayer1.length){
                fetch(`http://localhost:3030/players/${player1.name}`, { method: "Post"}).then(() => console.log("Player 1 registered"))
                setPlayer1({name: player1.name, wins: 0, points: 0})
            } else{
                setPlayer1(dataPlayer1[0])
            }

            if(!dataPlayer2.length){
                fetch(`http://localhost:3030/players/${player2.name}`, { method: "Post"}).then(() => console.log("Player 2 registered"))
                setPlayer2({name: player2.name, wins: 0, points: 0})
            } else{
                setPlayer2(dataPlayer2[0])
            }
            setNewGame(false)
        }            
        
    }

    const selectServer = (index) => {
        if(index == 0){
            setServer(player1.name)
        }else{
            setServer(player2.name)
        }
    }

    return (
        <>
            <div className="my-10 flex justify-center items-center">
                <div className="shadow-md py-5 px-5 bg-amber-200 w-4/6 rounded-lg">
                    <h2 className="text-center text-4xl font-bold">New Game</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex mt-4">
                            <div className="w-1/2 mb-4 text-center">
                                <label 
                                    htmlFor="player1"
                                    className="block text-xl text-gray-700 uppercase font-bold"
                                >
                                    Player 1
                                </label>
                                <input 
                                    id="player1"
                                    placeholder="Name of the Player"
                                    className="border-2 rounded-md text-center"
                                    onChange={e => setPlayer1({name: e.target.value})}
                                    list="p1"
                                    required
                                />
                                <datalist id="p1">
                                    {playerList?.map((v,i)=>(
                                        <option key={i} value={v}></option>
                                    ))}
                                </datalist>
                            </div>
                            <div className="w-1/2 mb-4 text-center">
                                <label 
                                    htmlFor="player2"
                                    className="block text-xl text-gray-700 uppercase font-bold"
                                >
                                    Player 2
                                </label>
                                <input 
                                    id="player2"
                                    placeholder="Name of the Player"
                                    className="border-2 rounded-md text-center"
                                    onChange={e => setPlayer2({name: e.target.value})}
                                    list="p2"
                                    required
                                />
                                <datalist id="p2">
                                    {playerList?.map((v,i)=>(
                                        <option key={i} value={v}></option>
                                    ))}
                                </datalist>
                            </div>                            
                        </div>
                        <div className="mb-4 text-center">
                            <label htmlFor="server" className="block text-gray-700 uppercase font-bold text-xl">Server</label>
                            <select
                                id="server"
                                className="border-2 w-2/5 rounded-md text-center"
                                defaultValue=""
                                onChange={e => selectServer(+e.target.value)}
                            >
                                <option value="">Choose the Server</option>
                                <option value="0">Player1</option>
                                <option value="1">Player2</option>
                            </select>
                        </div>
                        <input 
                            type="submit" 
                            className="rounded-md py-2 mt-4 bg-amber-500 w-full font-bold uppercase cursor-pointer hover:bg-amber-600 transition-all"
                            value="Start Match"
                        />
                        {error && (
                        <div
                            className="bg-red-500 rounded-lg text-center mt-3 py-3 font-bold uppercase"
                        >
                            <h3>Wrong Data</h3>
                        </div>
                        )}
                        
                    </form>
                </div>
            </div>
        </>
    );
}
