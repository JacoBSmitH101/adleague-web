import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();
    //do a test fetch from https://adleague-web-api-dev.azurewebsites.net/api/webtest
    const [standings, setStandings] = React.useState(null);
    const [selectedDivision, setSelectedDivision] = React.useState(null);
    const [recentFixtures, setRecentFixtures] = React.useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [weeklyFixtures, setWeeklyFixtures] = React.useState([]);
    const [loadingFixtures, setLoadingFixtures] = React.useState(true);
    const getCurrentWeek = () => {
        const referenceDate = new Date("2025-06-09"); // start of week 6
        const now = new Date();
        const diffDays = Math.floor(
            (now - referenceDate) / (1000 * 60 * 60 * 24)
        );
        return 1 + Math.floor(diffDays / 7);
    };

    const [currentWeek, setCurrentWeek] = React.useState(getCurrentWeek());

    // Calculate current week based on reference date

    const fetchStandings = async () => {
        try {
            const response = await fetch(
                //"https://adleague-web-api-dev.azurewebsites.net/api/tournament-standings/16310779"
                `${apiUrl}/tournament-standings/15864815`
            );
            const data = await response.json();
            setStandings(data);
            setSelectedDivision(data.divisions?.[0]?.name || null);
            console.log("Standings data:", data);
        } catch (error) {
            console.error("Error fetching standings:", error);
        }
    };
    const fetchRecentFixtures = async () => {
        try {
            const response = await fetch(
                //"https://adleague-web-api-dev.azurewebsites.net/api/recent-fixtures"
                `${apiUrl}/recent-fixtures`
            );
            const data = await response.json();
            setRecentFixtures(data.fixtures);
        } catch (error) {
            console.error("Error fetching recent fixtures:", error);
        }
    };

    const fetchWeeklyFixtures = async () => {
        try {
            const res = await fetch(
                `${apiUrl}/weekly-fixtures/${
                    import.meta.env.VITE_TOURNAMENT_ID
                }`
            );
            const data = await res.json();
            const filtered = data.divisions.map((div) => ({
                name: div.name,
                matches: div.matches.filter((m) => m.week === currentWeek),
            }));
            setWeeklyFixtures(filtered);
        } catch (err) {
            console.error("Error fetching weekly fixtures:", err);
        } finally {
            setLoadingFixtures(false);
        }
    };
    React.useEffect(() => {
        fetchStandings();
        fetchRecentFixtures();
        fetchWeeklyFixtures();
    }, []);
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <header className="text-center py-10">
                <h1 className="text-4xl font-extrabold text-blue-400">
                    Online League with Autodarts
                </h1>
                <p className="text-sm text-gray-400 mt-2 italic">
                    (Unofficial community league – not affiliated with
                    Autodarts)
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <a
                    href=""
                    onClick={() => navigate("/weekly-fixtures")}
                    className="bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6 text-center shadow-lg"
                >
                    <div className="text-blue-400 text-4xl mb-2">📅</div>
                    <h2 className="text-xl font-semibold">Weekly Fixtures</h2>
                    <p className="text-sm text-gray-300">
                        See the current weeks fixtures
                    </p>
                </a>
                <a
                    href=""
                    onClick={() => navigate("/all-standings")}
                    className="bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6 text-center shadow-lg"
                >
                    <div className="text-blue-400 text-4xl mb-2">📈</div>
                    <h2 className="text-xl font-semibold">Standings</h2>
                    <p className="text-sm text-gray-300">League tables</p>
                </a>
                <a
                    href=""
                    onClick={() => alert("Coming soon!")}
                    className="bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6 text-center shadow-lg"
                >
                    <div className="text-blue-400 text-4xl mb-2">📊</div>
                    <h2 className="text-xl font-semibold">Stats</h2>
                    <p className="text-sm text-gray-300">Tracked performance</p>
                </a>
            </section>

            <main className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-10">
                <section id="standings">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Live Standings</h2>
                        {standings && (
                            <select
                                value={selectedDivision}
                                onChange={(e) =>
                                    setSelectedDivision(e.target.value)
                                }
                                className="bg-gray-800 text-white border border-gray-600 px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            >
                                {standings.divisions.map((d) => (
                                    <option key={d.name} value={d.name}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <table className="w-full text-sm text-left border border-gray-600">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="p-2">Name</th>
                                <th className="p-2">Played</th>
                                <th className="p-2">Wins</th>
                                <th className="p-2">Losses</th>
                                <th className="p-2">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standings &&
                                standings.divisions
                                    .filter(
                                        (division) =>
                                            division.name === selectedDivision
                                    )
                                    .map((division) => (
                                        <React.Fragment key={division.name}>
                                            <tr className="bg-gray-700">
                                                <td
                                                    colSpan="5"
                                                    className="p-2 font-bold"
                                                >
                                                    {division.name}
                                                </td>
                                            </tr>
                                            {division.players.map((player) => (
                                                <tr
                                                    key={player.id}
                                                    onClick={() =>
                                                        navigate(
                                                            `/player/${player.id}`
                                                        )
                                                    }
                                                    className="hover:bg-gray-800 cursor-pointer transition"
                                                >
                                                    <td className="p-2">
                                                        {player.name.trim()}{" "}
                                                        <span className="text-gray-400">
                                                            (
                                                            {player.avg
                                                                ? player.avg
                                                                : "n/a"}
                                                            )
                                                        </span>
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
                                            ))}
                                        </React.Fragment>
                                    ))}
                        </tbody>
                    </table>
                </section>

                <section id="results">
                    <h2 className="text-2xl font-bold mb-4">Recent Results</h2>
                    <ul className="space-y-2">
                        {recentFixtures.length === 0 ? (
                            <div className="flex justify-center py-4">
                                <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : null}
                        {recentFixtures.map((fixture) => {
                            const p1 = fixture.player1;
                            const p2 = fixture.player2;
                            const date = new Date(
                                fixture.updated_at
                            ).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                            });

                            const isP1Winner = p1.score > p2.score;
                            const p1Class = isP1Winner
                                ? "text-green-400 font-bold"
                                : "text-red-400 font-bold";
                            const p2Class = !isP1Winner
                                ? "text-green-400 font-bold"
                                : "text-red-400 font-bold";

                            return (
                                <li
                                    key={fixture.id}
                                    className="p-2 bg-gray-800 rounded shadow"
                                >
                                    <span className={p1Class}>
                                        {p1.name.trim()}
                                    </span>{" "}
                                    vs{" "}
                                    <span className={p2Class}>
                                        {p2.name.trim()}
                                    </span>{" "}
                                    —{" "}
                                    <span className="text-gray-300 font-medium">
                                        {p1.score}–{p2.score}
                                    </span>{" "}
                                    <span className="text-gray-400">
                                        ({date})
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </section>

                <section id="fixtures">
                    <h2 className="text-2xl font-bold mb-4">
                        Week {currentWeek} Fixtures
                    </h2>
                    {loadingFixtures ? (
                        <div className="flex justify-center py-4">
                            <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {weeklyFixtures.map((division) =>
                                division.matches.length > 0 ? (
                                    <div
                                        key={division.name}
                                        onClick={() =>
                                            navigate(
                                                `/weekly-fixtures?division=${division.name}&week=${currentWeek}`
                                            )
                                        }
                                        className="flex bg-gray-800 rounded shadow overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
                                    >
                                        {/* Rotated Division Label */}
                                        <div className="bg-gray-700 text-center w-20 flex items-center justify-center">
                                            <span className="transform -rotate-90 text-blue-300 font-bold text-m tracking-wider">
                                                {"Div " +
                                                    division.name[
                                                        division.name.length - 1
                                                    ]}
                                            </span>
                                        </div>

                                        {/* Match List */}
                                        <ul className="flex-1 py-2 px-4 space-y-1">
                                            {division.matches.map((match) => {
                                                const hasResult =
                                                    match.result &&
                                                    match.result.includes(
                                                        "-"
                                                    ) &&
                                                    match.result.split("-")
                                                        .length === 2;

                                                let p1Class = "text-gray-200";
                                                let p2Class = "text-gray-200";

                                                if (hasResult) {
                                                    const [s1, s2] =
                                                        match.result
                                                            .split("-")
                                                            .map(Number);
                                                    if (
                                                        !isNaN(s1) &&
                                                        !isNaN(s2)
                                                    ) {
                                                        p1Class =
                                                            s1 > s2
                                                                ? "text-green-400 font-bold"
                                                                : "text-red-400 font-bold";
                                                        p2Class =
                                                            s2 > s1
                                                                ? "text-green-400 font-bold"
                                                                : "text-red-400 font-bold";
                                                    }
                                                }

                                                return (
                                                    <li
                                                        key={match.match_id}
                                                        className="text-m text-center"
                                                    >
                                                        {match.player1_avg && (
                                                            <span className="text-gray-400 mr-1 text-sm">
                                                                (
                                                                {
                                                                    match.player1_avg
                                                                }
                                                                )
                                                            </span>
                                                        )}
                                                        <span
                                                            className={p1Class}
                                                        >
                                                            {match.player1_name}
                                                        </span>{" "}
                                                        vs{" "}
                                                        <span
                                                            className={p2Class}
                                                        >
                                                            {match.player2_name}
                                                        </span>
                                                        {match.player2_avg && (
                                                            <span className="text-gray-400 ml-1 text-sm">
                                                                (
                                                                {
                                                                    match.player2_avg
                                                                }
                                                                )
                                                            </span>
                                                        )}
                                                        {hasResult && (
                                                            <span className="text-gray-400 ml-1">
                                                                — {match.result}
                                                            </span>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ) : null
                            )}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default App;
