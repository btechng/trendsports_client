import React, { useEffect, useState } from "react";
import { API } from "../lib/api";
import { useAuth } from "../hooks/useAuth";

export default function Comments({ topicType, topicId }:{ topicType: "trend" | "match"; topicId: string }){
  const [list, setList] = useState<any[]>([]);
  const [text, setText] = useState("");
  const { user, authHeader } = useAuth();

  async function load(){
    const { data } = await API.get(`/comments/${topicType}/${topicId}`);
    setList(data);
  }
  useEffect(()=>{ load(); }, [topicType, topicId]);

  async function post(){
    if (!text.trim()) return;
    const { data } = await API.post(`/comments/${topicType}/${topicId}`, { text }, { headers: authHeader() });
    setText("");
    setList([data, ...list]);
  }

  return (
    <div className="card">
      <div style={{fontWeight:700, marginBottom:8}}>Comments</div>
      {user ? (
        <div className="row">
          <input className="input" placeholder="Write a comment..." value={text} onChange={e=>setText(e.target.value)} />
          <button className="btn" onClick={post}>Post</button>
        </div>
      ) : <div className="subtitle">Login to comment</div>}
      <div className="stack" style={{marginTop:12}}>
        {list.map((c)=> (
          <div key={c._id} className="card">
            <div className="subtitle">{c.authorName || 'Anon'} · {new Date(c.createdAt).toLocaleString()}</div>
            <div>{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
