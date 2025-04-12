import React from "react";
import "./index.css";

const App = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <header className="text-center py-10">
                <h1 className="text-4xl font-extrabold text-blue-400">
                    Online League for Autodarts
                </h1>
                <a
                    href="https://discord.gg/YOUR_LINK"
                    className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                >
                    Join via Discord
                </a>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto my-10">
                <a
                    href="#fixtures"
                    className="bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6 text-center shadow-lg"
                >
                    <div className="text-blue-400 text-4xl mb-2">📅</div>
                    <h2 className="text-xl font-semibold">Weekly Fixtures</h2>
                    <p className="text-sm text-gray-300">Current league week</p>
                </a>
                <a
                    href="#standings"
                    className="bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6 text-center shadow-lg"
                >
                    <div className="text-blue-400 text-4xl mb-2">📈</div>
                    <h2 className="text-xl font-semibold">Standings</h2>
                    <p className="text-sm text-gray-300">
                        Current league tables
                    </p>
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

            <main className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <section id="standings">
                    <h2 className="text-2xl font-bold mb-4">Live Standings</h2>
                    <table className="w-full text-sm text-left border border-gray-600">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="p-2">Player</th>
                                <th className="p-2">W</th>
                                <th className="p-2">L</th>
                                <th className="p-2">Legs Won</th>
                                <th className="p-2">Legs Lost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-800">
                                <td className="p-2">Johnson</td>
                                <td className="p-2">8</td>
                                <td className="p-2">4</td>
                                <td className="p-2">31</td>
                                <td className="p-2">20</td>
                            </tr>
                            <tr className="hover:bg-gray-800">
                                <td className="p-2">Smith</td>
                                <td className="p-2">8</td>
                                <td className="p-2">4</td>
                                <td className="p-2">31</td>
                                <td className="p-2">20</td>
                            </tr>
                            <tr className="hover:bg-gray-800">
                                <td className="p-2">Taylor</td>
                                <td className="p-2">7</td>
                                <td className="p-2">5</td>
                                <td className="p-2">28</td>
                                <td className="p-2">24</td>
                            </tr>
                            <tr className="hover:bg-gray-800">
                                <td className="p-2">Williams</td>
                                <td className="p-2">6</td>
                                <td className="p-2">6</td>
                                <td className="p-2">26</td>
                                <td className="p-2">26</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section id="results">
                    <h2 className="text-2xl font-bold mb-4">Recent Results</h2>
                    <ul className="space-y-2">
                        <li className="p-2 bg-gray-800 rounded shadow">
                            Jones def. Williams 3–2 — Apr 19
                        </li>
                        <li className="p-2 bg-gray-800 rounded shadow">
                            Miller def. Davis 3–0 — Apr 18
                        </li>
                        <li className="p-2 bg-gray-800 rounded shadow">
                            Smith def. Brown 3–1 — Apr 17
                        </li>
                        <li className="p-2 bg-gray-800 rounded shadow">
                            Taylor def. Smith 3–2 — Apr 16
                        </li>
                    </ul>
                </section>

                <section id="fixtures">
                    <h2 className="text-2xl font-bold mb-4">
                        Upcoming Fixtures
                    </h2>
                    <ul className="space-y-2">
                        <li className="p-2 bg-gray-800 rounded shadow">
                            Jones vs. Williams — Apr 20 @ 19:00
                        </li>
                        <li className="p-2 bg-gray-800 rounded shadow">
                            Miller vs. Davis — Apr 21 @ 18:30
                        </li>
                        <li className="p-2 bg-gray-800 rounded shadow">
                            Smith vs. Brown — Apr 22 @ 20:00
                        </li>
                        <li className="p-2 bg-gray-800 rounded shadow">
                            Taylor vs. Johnson — Apr 22 @ 19:00
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default App;
