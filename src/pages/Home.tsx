import React, { useEffect } from "react";
import { API } from "../lib/api";
import { useStore } from "../store/useStore";
import TrendGlobe3D from "../components/TrendGlobe3D";
import SportsList from "../components/SportsList";
import SentimentBadge from "../components/SentimentBadge";

export default function Home(){
  const { trends, setTrends } = useStore();
  useEffect(()=>{(async()=>{
    const { data } = await API.get("/trends?limit=12");
    setTrends(data);
  })();},[]);
  return (
    <div className="grid" style={{gridTemplateColumns:"1.1fr .9fr"}}>
      <div className="grid" style={{gridTemplateColumns:"1fr"}}>
        <TrendGlobe3D data={trends} />
        <div className="card">
          <div className="subtitle" style={{marginBottom:8}}>Latest Trends</div>
          <div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
            {trends.map((t)=> (
              <div key={t._id} className="card">
                <div style={{fontWeight:700}}>{t.title}</div>
                <div className="subtitle">{t.source} · {t.location || "Global"}</div>
                <SentimentBadge v={t.sentiment} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="title" style={{marginBottom:12}}>AI Sports Predictions</div>
        <SportsList />
      </div>
    </div>
  );
}
