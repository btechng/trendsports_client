import React, { useEffect, useState } from "react";
import { API } from "../lib/api";

interface Fixture {
  _id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  league?: string;
}

export default function SportsList() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        // ✅ Correct path: /sports/fixtures?days=3
        const { data } = await API.get<Fixture[]>("/sports/fixtures?days=3");
        setFixtures(data);
      } catch (err: any) {
        console.error("Error fetching sports fixtures:", err);
        setError("Failed to load sports fixtures");
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  if (loading) return <div>Loading fixtures...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="grid" style={{ gap: "8px" }}>
      {fixtures.map((f) => (
        <div key={f._id} className="card">
          <div style={{ fontWeight: 700 }}>
            {f.homeTeam} vs {f.awayTeam}
          </div>
          <div className="subtitle">{f.date}</div>
          {f.league && <div className="subtitle">{f.league}</div>}
        </div>
      ))}
    </div>
  );
}
