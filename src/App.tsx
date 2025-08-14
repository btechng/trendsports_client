import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
export default function App(){
  const { user, logout } = useAuth();
  return (
    <div>
      <nav className="nav">
        <div className="title">TrendSphere ⚡ SportsPredictor</div>
        <div style={{flex:1}}/>
        <NavLink to="/" className={({isActive})=>isActive?"active":""}>Home</NavLink>
        <NavLink to="/trends" className={({isActive})=>isActive?"active":""}>Trends</NavLink>
        <NavLink to="/sports" className={({isActive})=>isActive?"active":""}>Sports</NavLink>
        <NavLink to="/leaderboard" className={({isActive})=>isActive?"active":""}>Leaderboard</NavLink>
        {user ? (
          <>
            <span className="subtitle">Hi {user.name}</span>
            <button className="btn secondary" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({isActive})=>isActive?"active":""}>Login</NavLink>
            <NavLink to="/register" className={({isActive})=>isActive?"active":""}>Register</NavLink>
          </>
        )}
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
