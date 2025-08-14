import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../lib/api";
import PredictionBadge from "../components/PredictionBadge";
import Comments from "../components/Comments";

export default function MatchDetails(){
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  useEffect(()=>{(async()=>{ const { data } = await API.get(`/sports/match/${id}`); setData(data); })();},[id]);
  if (!data) return <div className="card">Loading…</div>;
  const m = data.match; const p = data.prediction;
  return (
    <div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
      <div className="card">
        <div className="title">{m.homeTeam} vs {m.awayTeam}</div>
        <div className="subtitle">{m.league} · {new Date(m.date).toLocaleString()}</div>
      </div>
      <div className="card">
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{fontWeight:700}}>AI Pick:</div>
          <PredictionBadge pick={p?.pick || "DRAW"} />
        </div>
        {p && (
          <div className="subtitle" style={{marginTop:8}}>
            Probabilities — Home {(p.probs.home*100).toFixed(0)}%, Draw {(p.probs.draw*100).toFixed(0)}%, Away {(p.probs.away*100).toFixed(0)}%
          </div>
        )}
        <div style={{marginTop:8}}>{p?.explanation}</div>
      </div>
      <div style={{gridColumn:"1 / span 2"}}>
        <Comments topicType="match" topicId={m._id} />
      </div>
    </div>
  );
}
