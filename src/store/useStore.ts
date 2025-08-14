import { create } from "zustand";
type Trend = { _id:string; title:string; source:string; location?:string; lat?:number; lng?:number; sentiment:number; summary?:string };
export type Match = { _id:string; league:string; country:string; date:string; homeTeam:string; awayTeam:string };
interface Store {
  trends: Trend[]; setTrends: (t:Trend[])=>void;
  matches: Match[]; setMatches: (m:Match[])=>void;
}
export const useStore = create<Store>((set)=>({
  trends: [], setTrends: (t)=>set({trends:t}),
  matches: [], setMatches: (m)=>set({matches:m})
}));
