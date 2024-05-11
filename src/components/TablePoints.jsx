export default function TablePoints({data}) {
    return (
        <>
            <div className="flex justify-center">
                <table
                    className="text-center bg-lime-200 w-2/5"
                >
                    <thead className="border-b-2 border-black">
                        <tr>
                            <th>Position</th>
                            <th>Name</th>
                            <th>Wins</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((rank,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{rank.name}</td>
                                <td>{rank.wins}</td>
                                <td>{rank.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
