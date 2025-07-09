import { useState } from "react";
// import "../styles/Login1.css";
import axios from "axios";
import React from 'react';
// const apiUrl = import.meta.env.VITE_API_URL;
import Sidebar from "../components/Sidebar";

export default function Admin() {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <div style={{ display: "flex" }}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedSidebarNav="Administrador" selectedIconPage = ""/>
                <div className="content-sidebear" style={{ width: collapsed ? "96.2vw" : "89.5vw" }}>
                    <h1>Contenido Principal</h1>
                    <p>Aquí va tu contenidoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                </div>
            </div>
        </>

    );
}