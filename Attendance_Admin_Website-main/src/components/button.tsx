import React from "react";

export default function Button({ title = "", onclick = () => {}, style={}}) {
  return (
  
      <button
        onClick={() => onclick()}
        style={{
          backgroundColor: "green",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
          marginTop:30
        }}
      >
        <text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          {title}
        </text>
      </button>
  );
}
