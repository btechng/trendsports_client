import React from "react";
export default function SentimentBadge({v}:{v:number}){
  const cls = v>0.1?"badge pos": v<-0.1?"badge neg":"badge neu";
  const label = v>0.1?"Positive": v<-0.1?"Negative":"Neutral";
  return <span className={cls}>{label}</span>;
}
