import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WeeklyFixturesPage = () => {
    const [fixtures, setFixtures] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState("");
    const [currentWeek, setCurrentWeek] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const tournamentId = import.meta.env.VITE_TOURNAMENT_ID;
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    // ✅ Fix dynamic week calculation
    useEffect(() => {
        const leagueStart = new Date("2025-03-04"); // 📌 use actual 2025 league start
        const today = new Date();
        const diffInDays = Math.floor(
            (today - leagueStart) / (1000 * 60 * 60 * 24)
        );
        const week = Math.max(1, Math.floor(diffInDays / 7) + 1);
        setCurrentWeek(week);
    }, []);

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
        setCurrentWeek((prev) => Math.max(1, prev - 1));
    };

    const handleNextWeek = () => {
        setCurrentWeek((prev) => prev + 1);
    };

    const selected = fixtures.find((d) => d.name === selectedDivision);
    const matches =
        selected?.matches.filter((m) => m.week === currentWeek) || [];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="flex justify-start mb-4">
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
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Top nav */}
                <div className="flex flex-col items-center mb-6 relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="text-4xl font-bold text-white flex items-center gap-2 hover:text-blue-400"
                    >
                        {selectedDivision}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25L12 15.75 4.5 8.25"
                            />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <ul className="absolute mt-2 bg-gray-800 text-white rounded shadow z-10 w-48">
                            {fixtures.map((div) => (
                                <li
                                    key={div.name}
                                    onClick={() => {
                                        setSelectedDivision(div.name);
                                        setDropdownOpen(false);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-700 text-base cursor-pointer"
                                >
                                    {div.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Week Nav */}
                <div className="flex justify-between items-center mb-4 mt-10">
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

                {/* Fixtures */}
                <ul className="space-y-2">
                    {matches.length > 0 ? (
                        matches.map((match) => {
                            const result = match.result || match.score || "";
                            const hasResult = result.length > 0;

                            let p1Score = null;
                            let p2Score = null;
                            let p1ScoreClass = "text-gray-400";
                            let p2ScoreClass = "text-gray-400";

                            if (hasResult) {
                                const s1 = result[0];
                                const s2 = result[2];
                                if (!isNaN(s1) && !isNaN(s2)) {
                                    p1Score = s1;
                                    p2Score = s2;

                                    if (s1 > s2) {
                                        p1ScoreClass =
                                            "text-green-400 font-bold";
                                        p2ScoreClass = "text-red-400 font-bold";
                                    } else if (s2 > s1) {
                                        p1ScoreClass = "text-red-400 font-bold";
                                        p2ScoreClass =
                                            "text-green-400 font-bold";
                                    } else {
                                        p1ScoreClass = p2ScoreClass =
                                            "text-yellow-300 font-bold";
                                    }
                                }
                            }

                            return (
                                <li
                                    key={match.match_id}
                                    className="bg-gray-800 p-4 rounded shadow text-center text-lg"
                                >
                                    {hasResult && (
                                        <span
                                            className={`${p1ScoreClass} mr-5`}
                                        >
                                            {p1Score}
                                        </span>
                                    )}
                                    <span className="text-blue-300">
                                        {match.player1_name}
                                    </span>{" "}
                                    vs{" "}
                                    <span className="text-blue-300">
                                        {match.player2_name}
                                    </span>
                                    {hasResult && (
                                        <span
                                            className={`${p2ScoreClass} ml-5`}
                                        >
                                            {p2Score}
                                        </span>
                                    )}
                                </li>
                            );
                        })
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
