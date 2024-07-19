import React from "react";
import { auth } from "./firebaseConfig";
import "./App.css";

function Navbar({ onCreateClick, onAllPostersClick }) {
  return (
    <nav style={{ minWidth: "1040px" }}>
      <div
      // style={{
      //   display: "flex",
      //   justifyContent: "space-between",
      //   alignItems: "center",
      //   padding: "0 2rem",
      //   borderBottom: "1px solid #e0e0e0",
      // }}
      >
        <h2 style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#BF1E2E",
          color: "white",
          padding: "15px 32px",
          fontSize: "20px",
          margin: "0 auto",
        }}>
          Email Signature Generator
          {/* <button
            type="button" 
            style={{
              backgroundColor: "white",
              border: "none",
              color: "#BF1E2E",
              padding: "15px",
              textAlign: "center",
              fontSize: "15px",
              fontWeight: "bold",
              margin: "0 auto",
              display: "block",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {'New'}
          </button> */}
          <button onClick={onCreateClick} style={{
            marginLeft: "auto", padding: "10px",
            textAlign: "center", backgroundColor: "white",
            fontSize: "15px", fontWeight: "bold",
            borderRadius: "5px", color: "#BF1E2E",
            cursor: "pointer"
          }}>Create New</button>
          <div style={{ width: "15px" }} />
          <button onClick={onAllPostersClick} style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px", fontSize: "15px", fontWeight: "bold", color: "#BF1E2E", cursor: "pointer" }}>All Posters</button>
          <div style={{ width: "15px" }} />
          <button onClick={() => auth.signOut()} style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px", fontSize: "15px", fontWeight: "bold", color: "#BF1E2E", cursor: "pointer" }}>Sign out</button>
        </h2>
        <div
          style={{
            display: "flex",
          }}
        >

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
