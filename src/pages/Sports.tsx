import React from "react";
import SportsList from "../components/SportsList";
export default function Sports(){
  return (
    <div>
      <div className="title" style={{marginBottom:12}}>Upcoming Fixtures</div>
      <SportsList />
    </div>
  );
}
