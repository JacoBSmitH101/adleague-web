import React from "react";
import { useParams } from "react-router-dom";

const PlayerPage = () => {
    const { id } = useParams();
    const tournamentId = import.meta.env.VITE_TOURNAMENT_ID;

    // 🔁 Fake test data
    const divisionName = "Division 2";
    const table = [
        { name: "julie881", played: 5, wins: 3, losses: 2, points: 14 },
        { name: "kebab_kebab", played: 5, wins: 3, losses: 2, points: 13 },
        { name: "yakoob19", played: 5, wins: 3, losses: 2, points: 11 },
    ];

    const matches = [
        {
            opponent: "joker_xi.",
            result: "Win",
            score: "3–2",
            date: "Apr 14",
        },
        {
            opponent: "yorked16",
            result: "Loss",
            score: "2–3",
            date: "Apr 12",
        },
        {
            opponent: "ibroxi_loyal",
            result: "Win",
            score: "3–1",
            date: "Apr 9",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Player Profile</h1>
                <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-2xl font-semibold">Player Profile</h2>
                    <div
                        className="relative group cursor-pointer"
                        title={`Tournament ID: ${tournamentId}\nPlayer ID: ${id}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-400 hover:text-blue-400 transition"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.25 9.75h.008v.008h-.008V9.75zm.75 4.5v-3M12 21a9 9 0 100-18 9 9 0 000 18z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Grid: Table + Fixtures */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Division Table */}
                    <div className="bg-gray-800 p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Division 2
                        </h2>
                        <table className="w-full text-sm text-left border border-gray-700">
                            <thead className="bg-gray-700 text-gray-300">
                                <tr>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Played</th>
                                    <th className="p-2">Wins</th>
                                    <th className="p-2">Losses</th>
                                    <th className="p-2">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table.map((player, i) => (
                                    <tr key={i} className="hover:bg-gray-800">
                                        <td className="p-2">{player.name}</td>
                                        <td className="p-2">{player.played}</td>
                                        <td className="p-2">{player.wins}</td>
                                        <td className="p-2">{player.losses}</td>
                                        <td className="p-2">{player.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Match List */}
                    <div className="bg-gray-800 p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Recent Matches
                        </h2>
                        <ul className="space-y-2">
                            {matches.map((match, i) => (
                                <li
                                    key={i}
                                    className="p-2 bg-gray-700 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center"
                                >
                                    <div>
                                        vs{" "}
                                        <span className="text-blue-300 font-semibold">
                                            {match.opponent}
                                        </span>{" "}
                                        — {match.score}
                                    </div>
                                    <div className="flex gap-4 mt-1 sm:mt-0">
                                        <span
                                            className={
                                                match.result === "Win"
                                                    ? "text-green-400 font-bold"
                                                    : "text-red-400 font-bold"
                                            }
                                        >
                                            {match.result}
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            {match.date}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Full-width Stats Box */}
                <div className="bg-gray-800 p-6 rounded shadow text-center">
                    <h2 className="text-xl font-semibold mb-2">Stats</h2>
                    <p className="text-gray-400 italic">
                        Stats view is a work in progress.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlayerPage;
