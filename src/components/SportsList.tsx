// src/components/SportsList.tsx
import React, { useEffect, useState } from "react";
import { API } from "../lib/api";

interface SportsListProps {
  apiPath: string;
}

export default function SportsList({ apiPath }: SportsListProps) {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const { data } = await API.get(apiPath);
        setFixtures(data);
      } catch (err: any) {
        console.error("Error fetching sports fixtures:", err);
        setError("Failed to load sports fixtures");
      } finally {
        setLoading(false);
      }
    };
    fetchFixtures();
  }, [apiPath]);

  if (loading) return <div>Loading fixtures...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="grid" style={{ gap: "8px" }}>
      {fixtures.map((f) => (
        <div key={f._id} className="card">
          <div>
            {f.homeTeam} vs {f.awayTeam}
          </div>
          <div className="subtitle">{f.date}</div>
        </div>
      ))}
    </div>
  );
}
