// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { API } from "../lib/api";
import { useStore } from "../store/useStore";
import TrendGlobe3D from "../components/TrendGlobe3D";
import SportsList from "../components/SportsList";
import SentimentBadge from "../components/SentimentBadge";

interface Trend {
  _id: string;
  title: string;
  source: string;
  location?: string;
  sentiment: number;
  lat?: number;
  lng?: number;
}

export default function Home() {
  const { trends, setTrends } = useStore();
  const [loadingTrends, setLoadingTrends] = useState(true);
  const [trendsError, setTrendsError] = useState("");

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const { data } = await API.get<Trend[]>("/trends?limit=12"); // ✅ Correct path
        setTrends(data);
      } catch (err: any) {
        console.error("Error fetching trends:", err);
        setTrendsError("Failed to load trends");
      } finally {
        setLoadingTrends(false);
      }
    };
    fetchTrends();
  }, [setTrends]);

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: "1.1fr .9fr", gap: "16px" }}
    >
      {/* Left Column */}
      <div className="grid" style={{ gridTemplateColumns: "1fr", gap: "16px" }}>
        <TrendGlobe3D data={trends} />

        <div className="card">
          <div className="subtitle" style={{ marginBottom: 8 }}>
            Latest Trends
          </div>
          {loadingTrends ? (
            <div>Loading trends...</div>
          ) : trendsError ? (
            <div className="error">{trendsError}</div>
          ) : (
            <div
              className="grid"
              style={{ gridTemplateColumns: "1fr 1fr", gap: "8px" }}
            >
              {trends.map((t) => (
                <div key={t._id} className="card">
                  <div style={{ fontWeight: 700 }}>{t.title}</div>
                  <div className="subtitle">
                    {t.source} · {t.location || "Global"}
                  </div>
                  <SentimentBadge v={t.sentiment} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div>
        <div className="title" style={{ marginBottom: 12 }}>
          AI Sports Predictions
        </div>
        <SportsList /> {/* ✅ Uses fixed API instance */}
      </div>
    </div>
  );
}
