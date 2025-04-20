import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllTablesPage = () => {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const tournamentId = import.meta.env.VITE_TOURNAMENT_ID;
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${apiUrl}/tournament-standings/${tournamentId}`
                );
                const data = await res.json();
                setStandings(data.divisions);
            } catch (err) {
                console.error("Error fetching standings:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [apiUrl, tournamentId]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate("/")}
                        className="text-gray-400 hover:text-blue-400"
                        title="Back to homepage"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 9.75L12 4.5l9 5.25M4.5 10.5V19.5a.75.75 0 00.75.75H9m6 0h3.75a.75.75 0 00.75-.75V10.5M9 19.5v-3.75A1.5 1.5 0 0110.5 14.25h3A1.5 1.5 0 0115 15.75V19.5"
                            />
                        </svg>
                    </button>
                    <h1 className="text-3xl font-bold">League Tables</h1>
                    <div></div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-4">
                        <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {standings.map((division) => (
                            <div
                                key={division.name}
                                className="bg-gray-800 rounded shadow p-4 border border-gray-700"
                            >
                                <h2 className="text-xl text-blue-400 font-bold mb-2">
                                    {division.name}
                                </h2>
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-700">
                                        <tr>
                                            <th className="p-2 text-left">
                                                Name
                                            </th>
                                            <th className="p-2 text-center">
                                                P
                                            </th>
                                            <th className="p-2 text-center">
                                                W
                                            </th>
                                            <th className="p-2 text-center">
                                                L
                                            </th>
                                            <th className="p-2 text-center">
                                                Pts
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {division.players.map((player) => (
                                            <tr
                                                key={player.id}
                                                onClick={() =>
                                                    navigate(
                                                        `/player/${player.id}`
                                                    )
                                                }
                                                className="hover:bg-gray-900 cursor-pointer transition"
                                            >
                                                <td className="p-2 text-left">
                                                    {player.name.trim()}
                                                </td>
                                                <td className="p-2 text-center">
                                                    {player.played}
                                                </td>
                                                <td className="p-2 text-center">
                                                    {player.wins}
                                                </td>
                                                <td className="p-2 text-center">
                                                    {player.losses}
                                                </td>
                                                <td className="p-2 text-center">
                                                    {player.points}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTablesPage;
