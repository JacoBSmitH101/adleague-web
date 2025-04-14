import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PlayerPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const tournamentId = import.meta.env.VITE_TOURNAMENT_ID;
    const [playerName, setPlayerName] = React.useState("");
    const [standings, setStandings] = React.useState([]);
    const [playerDivision, setPlayerDivision] = React.useState(null);
    const [matches, setMatches] = React.useState([]);
    // 🔁 Fake test data
    const divisionName = "Division 2";
    const table = [
        { name: "julie881", played: 5, wins: 3, losses: 2, points: 14 },
        { name: "kebab_kebab", played: 5, wins: 3, losses: 2, points: 13 },
        { name: "yakoob19", played: 5, wins: 3, losses: 2, points: 11 },
    ];

    // 🔁 Fetch player dat
    //from useeffect with /api/user-name?challonge_id=
    useEffect(() => {
        const fetchPlayerName = async () => {
            try {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_API_URL
                    }/user-name?challonge_id=${id}`
                );
                console.log(
                    `${
                        import.meta.env.VITE_API_URL
                    }/user-name?challonge_id=${id}`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setPlayerName(data.name);
            } catch (error) {
                console.error("Error fetching player name:", error);
            }
        };
        const fetchStandings = async () => {
            try {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_API_URL
                    }/tournament-standings/15864815`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setStandings(data);

                // Find the division the player is in
                const division = data.divisions.find((div) =>
                    div.players.some((p) => p.id === id)
                );
                setPlayerDivision(division || null);
            } catch (error) {
                console.error("Error fetching standings:", error);
            }
        };
        const fetchMatches = async () => {
            try {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_API_URL
                    }/recent-matches?challonge_id=${id}`
                );
                if (!response.ok) throw new Error("Failed to fetch matches");
                const data = await response.json();
                setMatches(data.matches);
            } catch (err) {
                console.error("Error fetching matches:", err);
            }
        };

        fetchPlayerName();
        fetchStandings();
        fetchMatches(); // 👈 Add this
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                    <button
                        onClick={() => navigate("/")}
                        className="text-gray-400 hover:text-blue-400 transition"
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
                    <h1 className="text-3xl font-bold mb-2">{playerName}</h1>
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
                        {playerDivision ? (
                            <>
                                <h2 className="text-xl font-semibold mb-4">
                                    {playerDivision.name}
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
                                        {playerDivision.players.map(
                                            (player) => (
                                                <tr
                                                    key={player.id}
                                                    onClick={() =>
                                                        navigate(
                                                            `/player/${player.id}`
                                                        )
                                                    }
                                                    className={`hover:bg-gray-900 cursor-pointer transition ${
                                                        player.id === id
                                                            ? "bg-teal-700 text-white font-bold"
                                                            : ""
                                                    }`}
                                                >
                                                    <td className="p-2">
                                                        {player.name}
                                                    </td>
                                                    <td className="p-2">
                                                        {player.played}
                                                    </td>
                                                    <td className="p-2">
                                                        {player.wins}
                                                    </td>
                                                    <td className="p-2">
                                                        {player.losses}
                                                    </td>
                                                    <td className="p-2">
                                                        {player.points}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <p className="text-gray-400 italic">
                                Division not found for this player.
                            </p>
                        )}
                    </div>

                    {/* Match List */}
                    <div className="bg-gray-800 p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Recent Matches
                        </h2>
                        <ul className="space-y-2">
                            {matches.length > 0 ? (
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
                                                    {new Date(
                                                        match.date
                                                    ).toLocaleDateString(
                                                        "en-GB",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400 italic">
                                    No recent matches found.
                                </p>
                            )}
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
