import React from "react";
import { Link } from "react-router-dom";
import PredictionBadge from "./PredictionBadge";
export default function MatchCard({ m }:{ m:any }){
  const d = new Date(m.date);
  return (
    <div className="card" style={{display:"flex",alignItems:"center",gap:12,justifyContent:"space-between"}}>
      <div>
        <div style={{fontWeight:700}}>{m.homeTeam} vs {m.awayTeam}</div>
        <div className="subtitle">{m.league} · {d.toLocaleString()}</div>
      </div>
      {m.prediction?.pick && <PredictionBadge pick={m.prediction.pick} />}
      <Link to={`/sports/${m._id}`} className="btn">View</Link>
    </div>
  );
}
