import { useState } from "react";
// import "../styles/Login1.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import React from 'react';

// //const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = "backconservatoriomusica-bhe8dsakdqa4a0gp.westus-01.azurewebsites.net"

export default function Profesor() {
  
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
            <div style={{ display: "flex" }}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedIconPage="Asignatura" selectedSidebarNav="Profesor" />
                <div className="content-sidebear" style={{ width: collapsed ? "90.2vw" : "80.5vw" }}>
                    <h1>Contenido Principal</h1>
                    <p>Aquí va tu contenidoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                </div>
            </div>
        </>
  );
}