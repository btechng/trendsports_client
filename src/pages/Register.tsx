import React, { useState } from "react";
import { API } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register(){
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false);
  const nav = useNavigate(); const { login } = useAuth();
  async function onSubmit(e: React.FormEvent){ e.preventDefault(); setLoading(true);
    try { const { data } = await API.post("/auth/register", { name, email, password }); login(data.token, data.user); nav("/"); }
    catch (e:any){ alert(e?.response?.data?.error || "Register failed"); } finally { setLoading(false); } }
  return (
    <form onSubmit={onSubmit} className="card stack" style={{maxWidth:420, margin:"40px auto"}}>
      <div className="title">Create account</div>
      <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn" disabled={loading}>{loading?"...":"Create"}</button>
    </form>
  );
}
