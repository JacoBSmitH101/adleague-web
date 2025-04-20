import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WeeklyFixturesPage = () => {
    const [fixtures, setFixtures] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState("");
    const [currentWeek, setCurrentWeek] = useState(6); // default to week 6
    const tournamentId = import.meta.env.VITE_TOURNAMENT_ID;
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFixtures = async () => {
            try {
                const res = await fetch(
                    `${apiUrl}/weekly-fixtures/${tournamentId}`
                );
                const data = await res.json();
                setFixtures(data.divisions);
                if (data.divisions.length > 0) {
                    setSelectedDivision(data.divisions[0].name);
                }
            } catch (err) {
                console.error("Error fetching fixtures:", err);
            }
        };
        fetchFixtures();
    }, [tournamentId]);

    const handlePrevWeek = () => {
        if (currentWeek > 1) setCurrentWeek(currentWeek - 1);
    };

    const handleNextWeek = () => {
        setCurrentWeek(currentWeek + 1);
    };

    const selected = fixtures.find((d) => d.name === selectedDivision);
    const matches =
        selected?.matches.filter((m) => m.week === currentWeek) || [];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
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

                    <select
                        value={selectedDivision}
                        onChange={(e) => setSelectedDivision(e.target.value)}
                        className="bg-gray-800 text-white px-4 py-2 rounded shadow border border-gray-600"
                    >
                        {fixtures.map((div) => (
                            <option key={div.name} value={div.name}>
                                {div.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={handlePrevWeek}
                        className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                    >
                        ← Prev
                    </button>
                    <h2 className="text-2xl font-bold">Week {currentWeek}</h2>
                    <button
                        onClick={handleNextWeek}
                        className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                    >
                        Next →
                    </button>
                </div>

                <ul className="space-y-2">
                    {matches.length > 0 ? (
                        matches.map((match) => (
                            <li
                                key={match.match_id}
                                className="bg-gray-800 p-4 rounded shadow text-center"
                            >
                                <span className="font-semibold text-blue-300">
                                    {match.player1_name}
                                </span>{" "}
                                vs{" "}
                                <span className="font-semibold text-blue-300">
                                    {match.player2_name}
                                </span>
                                {match.result && (
                                    <span className="ml-2 text-gray-400">
                                        — {match.result}
                                    </span>
                                )}
                            </li>
                        ))
                    ) : (
                        <li className="text-center text-gray-400 italic">
                            No fixtures for this week.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default WeeklyFixturesPage;
