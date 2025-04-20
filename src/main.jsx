import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PlayerPage from "./PlayerPage";
import "./index.css";
import WeeklyFixturesPage from "./Fixtures";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/player/:id" element={<PlayerPage />} />
                <Route
                    path="/weekly-fixtures"
                    element={<WeeklyFixturesPage />}
                />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
