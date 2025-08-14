import React, { useEffect, useState } from "react";
import { API } from "../lib/api";

export default function Leaderboard(){
  const [rows, setRows] = useState<any[]>([]);
  useEffect(()=>{(async()=>{ const { data } = await API.get("/leaderboard"); setRows(data); })();},[]);
  return (
    <div className="card">
      <div className="title" style={{marginBottom:12}}>Leaderboard</div>
      <div className="stack">
        {rows.map((u,i)=>(
          <div key={u._id} className="row" style={{justifyContent:"space-between"}}>
            <div className="row"><div style={{width:24, textAlign:"right"}}>{i+1}.</div><div style={{fontWeight:700, marginLeft:8}}>{u.name}</div></div>
            <div className="badge">{u.score} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
}
