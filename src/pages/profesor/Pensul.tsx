import { useEffect, useState } from "react";
import axios from "axios";


import Sidebar from "../../components/Sidebar";
import "../../styles/administrador/Profesor.css";
import { getUserFromLocalStorage } from "../../utils/auth";
import React from 'react';
import { PensulData } from "../../types/Pensul";

const apiUrl = import.meta.env.VITE_API_URL2;


export default function PensulAlumno() {

    const user = getUserFromLocalStorage();

    const [collapsed, setCollapsed] = useState(false);
    const [pensuls, setPensul] = useState<PensulData[]>([]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/pensul/listAlumnos/${user.idProfesor}`)
            .then(res => {
                if (res.data.pensuls) {
                    setPensul(res.data.pensuls);
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
                                            <th className="px-4 py-2 border">Id Pensul</th>
                                            <th className="px-4 py-2 border">Id Alumno</th>
                                            <th className="px-4 py-2 border">Id Clase</th>
                                            <th className="px-4 py-2 border">Nota</th>
                                            <th className="px-4 py-2 border">Nombre</th>
                                            <th className="px-4 py-2 border">Apellido</th> 
                                            <th className="px-4 py-2 border">Asignatura</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pensuls.map((alumno, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="px-4 py-2 border">{alumno.idPensul}</td>
                                                <td className="px-4 py-2 border">{alumno.idAlumno}</td>
                                                <td className="px-4 py-2 border">{alumno.idClase}</td>
                                                <td className="px-4 py-2 border">{alumno.nota}</td>
                                                <td className="px-4 py-2 border">{alumno.nombreAlumno}</td>
                                                <td className="px-4 py-2 border">{alumno.apellidoAlumno}</td>
                                                <td className="px-4 py-2 border">{alumno.nombreAsignatura}</td>
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