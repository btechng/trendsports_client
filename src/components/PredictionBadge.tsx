import React from "react";
export default function PredictionBadge({ pick }:{ pick: "HOME"|"DRAW"|"AWAY"|string }){
  const map: any = { HOME: "#22c55e", DRAW: "#6b7280", AWAY: "#ef4444" };
  return <span className="badge" style={{ background: (map[pick]||"#6b7280") + "33", color: "#e5e7eb" }}>{pick}</span>
}
