import React from "react";
import "./index.css";

const App = () => {
    //do a test fetch from https://adleague-web-api-dev.azurewebsites.net/api/webtest
    const [standings, setStandings] = React.useState(null);
    const [selectedDivision, setSelectedDivision] = React.useState(null);
    const [recentFixtures, setRecentFixtures] = React.useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const fetchStandings = async () => {
        try {
            const response = await fetch(
                //"https://adleague-web-api-dev.azurewebsites.net/api/tournament-standings/15864815"
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

    React.useEffect(() => {
        fetchStandings();
        fetchRecentFixtures();
    }, []);
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <header className="text-center py-10">
                <h1 className="text-4xl font-extrabold text-blue-400">
                    Online League for Autodarts
                </h1>
                <a
                    href="https://discord.gg/YOUR_LINK"
                    className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                >
                    Join via Discord
                </a>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <a
                    href="#fixtures"
                    className="bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6 text-center shadow-lg"
                >
                    <div className="text-blue-400 text-4xl mb-2">📅</div>
                    <h2 className="text-xl font-semibold">Weekly Fixtures</h2>
                    <p className="text-sm text-gray-300">
                        See the current weeks fixtures
                    </p>
                </a>
                <a
                    href="#standings"
                    className="bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6 text-center shadow-lg"
                >
                    <div className="text-blue-400 text-4xl mb-2">📈</div>
                    <h2 className="text-xl font-semibold">Standings</h2>
                    <p className="text-sm text-gray-300">League tables</p>
                </a>
                <a
                    href="#stats"
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
                                                    className="hover:bg-gray-800"
                                                >
                                                    <td className="p-2">
                                                        {player.name.trim()}
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
                        Upcoming Fixtures
                    </h2>
                    <div className="p-4 bg-gray-800 rounded shadow text-center text-gray-300 italic">
                        Upcoming fixtures view is a work in progress!
                    </div>
                </section>
            </main>
        </div>
    );
};

export default App;
