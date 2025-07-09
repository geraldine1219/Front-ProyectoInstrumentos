import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Admin() {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <div style={{ display: "flex" }}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedIconPage="Asignatura" selectedSidebarNav="Alumno" />
                <div className="content-sidebear" style={{ width: collapsed ? "96.2vw" : "89.5vw" }}>
                    <h1>Contenido Principal</h1>
                    <p>Aquí va tu contenidoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                </div>
            </div>
        </>

    );
}