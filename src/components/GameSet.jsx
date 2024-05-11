import { useState, useEffect } from "react";

export default function GameSet({player1, player2, server, setServer, setNewGame}) {
    
    const[pointsPlayer1, setPointsPlayer1] = useState(0)
    const[pointsPlayer2, setPointsPlayer2] = useState(0)
    const[winner, setWinner] = useState("")
    
    useEffect(() => {
        if((pointsPlayer1+pointsPlayer2) != 0 && (pointsPlayer1+pointsPlayer2) % 2 === 0){
            if(server == player1.name){
                setServer(player2.name)
            }else{
                setServer(player1.name)
            }
        }
        if(pointsPlayer1 > 10 && pointsPlayer2 < 10){
            setWinner(player1.name)
        }else if(pointsPlayer2 > 10 && pointsPlayer1 < 10){
            setWinner(player2.name)
        }

        if(pointsPlayer1 >= 10 && pointsPlayer2 >= 10){
            if(pointsPlayer1 - pointsPlayer2 == 2){
                setWinner(player1.name)
            }else if(pointsPlayer2 - pointsPlayer1 == 2){
                setWinner(player2.name)
            }
        }

    },[pointsPlayer1,pointsPlayer2])

    useEffect(() =>{
        if(pointsPlayer1 > 0 || pointsPlayer2 > 0){
            updateWin()
        }
    }, [winner])

    const updateWin = () => {
        const wins = (winner == player1.name) ? player1.wins + 1 : player2.wins + 1
        const points = (winner == player1.name) ? player1.points + pointsPlayer1 : player2.points + pointsPlayer2
        fetch(`http://localhost:3030/players/${winner}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"wins": wins, "points": points})
        }).then(() => console.log("Winner registered")).catch(err => console.log(err))
    }

    const cancelMatch = () =>{
        setPointsPlayer1(0)
        setPointsPlayer2(0)
        setServer("")
        setWinner("")
        setNewGame(true)
    }

    return (
        <>
            {!winner ?(
                <>
                    <div className="p-6 mt-3 mx-6 flex flex-row">
                        <div className="bg-blue-300 w-1/2 p-4 text-center">
                            <h3 className="font-bold uppercase text-2xl">{player1.name}</h3>
                            <h2 className="font-black uppercase text-5xl my-5">{pointsPlayer1}</h2>
                            <button
                                className="bg-green-300 px-2 rounded-3xl font-bold text-lg hover:bg-green-400"
                                onClick={() => setPointsPlayer1(lastPoint => lastPoint+1)}
                            >
                                Add Point
                            </button>
                        </div>
                        <div className="absolute top-52 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-cyan-200 h-28 w-28 py-7 text-center rounded-full">
                                <h2 className="font-bold text-sm">Server</h2>
                                <h2 className="font-black uppercase text-lg">{server}</h2>
                            </div>
                        </div>
                        <div className="bg-violet-300 w-1/2 p-4 text-center">
                            <h3 className="font-bold uppercase text-2xl">{player2.name}</h3>
                            <h2 className="font-black uppercase text-5xl my-5">{pointsPlayer2}</h2>
                            <button
                                className="bg-green-300 px-2 rounded-3xl font-bold text-lg hover:bg-green-400"
                                onClick={() => setPointsPlayer2(lastPoint => lastPoint+1)}
                            >
                                Add Point
                            </button>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            className="bg-red-400 w-1/6 rounded-lg mb-6 cursor-pointer hover:bg-red-500 font-bold uppercase p-2"
                            onClick={() => cancelMatch()}
                        >
                            Cancel Match
                        </button>
                    </div>    
                </>
            ):(
                <div className="flex justify-center">
                    <div className="bg-green-400 w-3/6 p-4 text-center mb-4">
                        <h3 className="text-2xl font-bold">WINNER!</h3>
                        <h3 className="text-4xl font-black uppercase my-5">{winner}</h3>
                        <button
                            className="bg-red-300 w-3/6 rounded-lg mb-3 cursor-pointer hover:bg-red-500 font-bold uppercase p-2"
                            onClick={() => cancelMatch()}
                        >
                            New Game
                        </button>
                    </div>
                </div>
            )}                   
        </>
    );
}
