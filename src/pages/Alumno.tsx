import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import React from 'react';

export default function Admin() {

    const [collapsed, setCollapsed] = useState(false);

    const containerStyle = {
    minHeight: '30vh',
    
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
  };
  
  const titleStyle = {
    // fontSize: '36px',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '20px',
  };

  const textStyle = {
    fontSize: '18px',
    color: '#374151',
    lineHeight: '1.6',
    marginBottom: '30px',
  };
  return (<>
    <div style={{ display: "flex" }}>
    <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedIconPage="Home" selectedSidebarNav="Alumno" />
    <div className="content-sidebear" style={{ width: collapsed ? "90vw" : "80vw" }}>

    <div style={containerStyle}>
      <div>
        <h1 style={titleStyle}>¡Bienvenido!</h1>
        <p style={textStyle}>
          Nos alegra tenerte de vuelta en el Conservatorio de Música. Te deseamos una experiencia llena de aprendizaje y armonía musical.
        </p>
      </div>
    </div>
    </div>
    </div>
  </>
  );

}