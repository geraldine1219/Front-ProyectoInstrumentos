import { useEffect, useState } from "react";
import axios from "axios";

// const apiUrl = import.meta.env.VITE_API_URL;
import Sidebar from "../../components/Sidebar";
import "../../styles/administrador/Profesor.css";
import { getUserFromLocalStorage } from "../../utils/auth";
import React from 'react';
import { Pensul } from "../../types/Pensul";

const apiUrl = import.meta.env.VITE_API_URL;

export default function PensulAlumno() {

    const user = getUserFromLocalStorage();

    const [collapsed, setCollapsed] = useState(false);
    const [pensuls, setPensul] = useState<Pensul[]>([]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/alumno/pensul/${user.idProfesor}`)
            .then(res => {
                if (res.data.pensul) {
                    setPensul(res.data.pensul);
                }
            })
            .catch(err => {
                console.error("Error al obtener profesor:", err);
            });
    }, []);

    return (
        <>
            <div style={{ display: "flex" }}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedIconPage="Estudiantes" selectedSidebarNav="Profesor"/>
                <div className="content-sidebear" style={{ width: collapsed ? "90vw" : "80vw" }}>
                    <h1 className="titulo-principal">Pensul de Materias</h1>
                    <hr className="linea-azul"></hr>

                        <div className="p-4">
                            <div className="overflow-x-auto">
                                <table className="tabla-profesores">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th className="px-4 py-2 border">Id</th>
                                            <th className="px-4 py-2 border">Clase</th>
                                            <th className="px-4 py-2 border">Nota</th>
                                            <th className="px-4 py-2 border">Actualización</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pensuls.map((alumno, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="px-4 py-2 border">{alumno.idPensul}</td>
                                                <td className="px-4 py-2 border">{alumno.idClase}</td>
                                                <td className="px-4 py-2 border">{alumno.nota}</td>
                                                <td className="px-4 py-2 border">{alumno.fechaActualizacion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                </div>
            </div>
        </>

    );
}