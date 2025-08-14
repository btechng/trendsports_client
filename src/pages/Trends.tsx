import React, { useEffect } from "react";
import { API } from "../lib/api";
import { useStore } from "../store/useStore";
import TrendGlobe3D from "../components/TrendGlobe3D";

export default function Trends(){
  const { trends, setTrends } = useStore();
  useEffect(()=>{(async()=>{ const { data } = await API.get("/trends?limit=50"); setTrends(data); })();},[]);
  return (
    <div className="grid" style={{gridTemplateColumns:"1fr"}}>
      <TrendGlobe3D data={trends} />
      <div className="grid" style={{gridTemplateColumns:"1fr 1fr 1fr"}}>
        {trends.map((t)=> (
          <div key={t._id} className="card">
            <div style={{fontWeight:700}}>{t.title}</div>
            <div className="subtitle">{t.source} · {t.location || "Global"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
