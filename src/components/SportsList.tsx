import React, { useEffect, useState } from "react";
import { API } from "../lib/api";
import MatchCard from "./MatchCard";

export default function SportsList(){
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    (async()=>{
      const { data } = await API.get("/sports/fixtures?days=3");
      const out = await Promise.all(data.map(async (m:any)=>{
        const { data: md } = await API.get(`/sports/match/${m._id}`);
        return { ...md.match, prediction: md.prediction };
      }));
      setItems(out); setLoading(false);
    })();
  },[]);
  if (loading) return <div className="card">Loading matches…</div>;
  return <div className="grid" style={{gridTemplateColumns:"1fr"}}>{items.map((m)=>(<MatchCard key={m._id} m={m} />))}</div>;
}
