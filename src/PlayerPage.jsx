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
    const [aggregatedStats, setAggregatedStats] = React.useState(null);
    const [loadingStats, setLoadingStats] = React.useState(true);
    const [loadingMatches, setLoadingMatches] = React.useState(true);
    // 🔁 Fake test data
    const divisionName = "Division 2";
    const table = [
        { name: "julie881", played: 5, wins: 3, losses: 2, points: 14 },
        { name: "kebab_kebab", played: 5, wins: 3, losses: 2, points: 13 },
        { name: "yakoob19", played: 5, wins: 3, losses: 2, points: 11 },
    ];
    const Stat = ({ label, value }) => (
        <div className="bg-gray-700 p-3 rounded text-center">
            <div className="text-xs text-gray-400">{label}</div>
            <div className="text-lg font-bold text-white">{value ?? "-"}</div>
        </div>
    );
    // 🔁 Fetch player dat
    //from useeffect with /api/user-name?challonge_id=
    useEffect(() => {
        const fetchAll = async () => {
            setLoadingStats(true);
            setLoadingMatches(true);
            try {
                const api = import.meta.env.VITE_API_URL;

                // 🔹 Player name
                const nameRes = await fetch(
                    `${api}/user-name?challonge_id=${id}`
                );
                if (!nameRes.ok) throw new Error("Failed to fetch name");
                const nameData = await nameRes.json();
                setPlayerName(nameData.name);

                // 🔹 Standings
                const standingsRes = await fetch(
                    `${api}/tournament-standings/${tournamentId}`
                );
                if (!standingsRes.ok)
                    throw new Error("Failed to fetch standings");
                const standingsData = await standingsRes.json();
                setStandings(standingsData);

                const division = standingsData.divisions.find((div) =>
                    div.players.some((p) => p.id === id)
                );
                setPlayerDivision(division || null);

                // 🔹 Matches
                const matchRes = await fetch(
                    `${api}/recent-fixtures?challonge_id=${id}`
                );
                if (!matchRes.ok) throw new Error("Failed to fetch matches");
                const matchData = await matchRes.json();
                setMatches(matchData.fixtures);

                // 🔹 Aggregates
                const aggRes = await fetch(
                    `${api}/player-aggregates?tournament_id=${tournamentId}&challonge_id=${id}`
                );
                if (!aggRes.ok) throw new Error("Failed to fetch aggregates");
                const aggData = await aggRes.json();
                setAggregatedStats(aggData);
            } catch (err) {
                console.error("Error fetching player page data:", err);
            } finally {
                setLoadingStats(false);
                setLoadingMatches(false);
            }
        };

        fetchAll();
    }, [id, tournamentId]);

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

                    {/* Played & Upcoming Matches Section */}
                    <div className="bg-gray-800 p-4 rounded shadow">
                        {/* Card title */}
                        <h2 className="text-xl font-semibold mb-2 text-center">
                            Matches
                        </h2>

                        {/* Section Loop: Played + Upcoming */}
                        {[
                            {
                                label: "Played",
                                data: matches.filter(
                                    (m) => m.state === "complete"
                                ),
                            },
                            {
                                label: "Upcoming",
                                data: matches.filter(
                                    (m) => m.state !== "complete"
                                ),
                            },
                        ].map((section) => (
                            <div key={section.label} className="mb-4">
                                <h3 className="text-lg font-semibold text-blue-300 mb-2">
                                    {section.label}
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    {loadingMatches ? (
                                        <div className="flex justify-center py-4">
                                            <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    ) : section.data.length === 0 ? (
                                        <li className="text-gray-400 italic">
                                            No {section.label.toLowerCase()}{" "}
                                            matches
                                        </li>
                                    ) : (
                                        section.data.map((match, i) => {
                                            const isPlayer1 =
                                                match.player1.id ===
                                                parseInt(id);
                                            const opponent = isPlayer1
                                                ? match.player2.name
                                                : match.player1.name;
                                            const playerScore = isPlayer1
                                                ? match.player1.score
                                                : match.player2.score;
                                            const opponentScore = isPlayer1
                                                ? match.player2.score
                                                : match.player1.score;

                                            const result =
                                                typeof playerScore ===
                                                    "number" &&
                                                typeof opponentScore ===
                                                    "number"
                                                    ? `${playerScore}-${opponentScore}`
                                                    : null;

                                            const isWin =
                                                playerScore > opponentScore;
                                            const isDraw =
                                                playerScore === opponentScore;
                                            const hasResult = result !== null;

                                            let resultColor = "text-gray-300";
                                            if (hasResult) {
                                                resultColor = isWin
                                                    ? "text-green-400 font-bold"
                                                    : isDraw
                                                    ? "text-yellow-300 font-bold"
                                                    : "text-red-400 font-bold";
                                            }

                                            return (
                                                <li
                                                    key={match.id}
                                                    className="flex justify-between items-center bg-gray-700 p-2 rounded shadow"
                                                >
                                                    <div className="text-blue-300 font-semibold">
                                                        vs {opponent}
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        {hasResult ? (
                                                            <span
                                                                className={
                                                                    resultColor
                                                                }
                                                            >
                                                                {result}
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-400 italic">
                                                                Week{" "}
                                                                {match.suggested_play_order
                                                                    ? Math.ceil(
                                                                          match.suggested_play_order /
                                                                              4
                                                                      )
                                                                    : "?"}
                                                            </span>
                                                        )}
                                                    </div>
                                                </li>
                                            );
                                        })
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Full-width Stats Box */}
                <div className="bg-gray-800 p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        Stats Summary
                    </h2>
                    {loadingStats ? (
                        <div className="flex justify-center py-4">
                            <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : aggregatedStats ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <Stat
                                label="Matches Played"
                                value={aggregatedStats.matches_played}
                            />
                            <Stat
                                label="Legs Played"
                                value={aggregatedStats.legs_played}
                            />
                            <Stat
                                label="Darts Thrown"
                                value={aggregatedStats.darts_thrown}
                            />
                            <Stat
                                label="Total Score"
                                value={aggregatedStats.total_score}
                            />
                            <Stat
                                label="3 Dart Avg"
                                value={aggregatedStats.three_dart_avg?.toFixed(
                                    2
                                )}
                            />
                            <Stat
                                label="First 9 Avg"
                                value={aggregatedStats.first9_avg?.toFixed(2)}
                            />
                            <Stat
                                label="Scores 60+"
                                value={aggregatedStats.scores_60_plus}
                            />
                            <Stat
                                label="Scores 100+"
                                value={aggregatedStats.scores_100_plus}
                            />
                            <Stat
                                label="Scores 140+"
                                value={aggregatedStats.scores_140_plus}
                            />
                            <Stat
                                label="Scores 180"
                                value={aggregatedStats.scores_180}
                            />
                            <Stat
                                label="Checkouts"
                                value={`${aggregatedStats.checkouts_hit}/${aggregatedStats.checkout_attempts}`}
                            />
                            <Stat
                                label="Checkout %"
                                value={`${(
                                    aggregatedStats.checkout_pct * 100
                                ).toFixed(1)}%`}
                            />
                        </div>
                    ) : (
                        <p className="text-gray-400 italic text-center">
                            Loading stats...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlayerPage;
