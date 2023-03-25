import React from "react";

export default function InputField({ title = "", onChangeText =()=> {},value='',onKeyDown=()=>{}, disabled = false}) {
  return (
    <div style={{ flexDirection: "column", display: "flex" }}>
      <text style={{marginBottom:5}}>{title} </text>
      <input disabled={disabled} onKeyPressCapture={()=>console.log('huhu')} onKeyDown={onKeyDown} onEnded={()=>console.log('huhu')} style={{ borderWidth: 1, borderColor: "gray", padding: 10 }} value={value} onChange={onChangeText} />
    </div>
  );
}
