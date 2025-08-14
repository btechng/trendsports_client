import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Pulses({ data }:{ data: Array<{lat?:number; lng?:number; sentiment:number}> }){
  const points = useMemo(()=> data.filter(d=>typeof d.lat==='number'&&typeof d.lng==='number')
    .map(d=>({lat:d.lat as number, lng:d.lng as number, s:d.sentiment})),[data]);
  return (
    <group>
      {points.map((p,i)=>{
        const phi = (90 - p.lat) * (Math.PI/180);
        const theta = (p.lng + 180) * (Math.PI/180);
        const r = 2;
        const x = -r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.cos(phi);
        const z = r * Math.sin(phi) * Math.sin(theta);
        return (
          <mesh key={i} position={[x,y,z]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial emissive={p.s>0?"green":p.s<0?"red":"gray"} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function TrendGlobe3D({ data }:{ data: Array<{title:string; lat?:number; lng?:number; sentiment:number}> }){
  return (
    <div className="card">
      <div className="subtitle">3D Trend Globe</div>
      <Canvas style={{height:400, borderRadius:12}} camera={{ position: [0,0,5] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5,5,5]} />
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color={"#0b4"} wireframe />
        </mesh>
        <Pulses data={data} />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
