import { useEffect, useState } from "react";
import axios from "axios";

// //const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = "backconservatoriomusica-bhe8dsakdqa4a0gp.westus-01.azurewebsites.net"
import Sidebar from "../../components/Sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import "../../styles/administrador/Alumno.css";
import React from 'react';

//const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = "backconservatoriomusica-bhe8dsakdqa4a0gp.westus-01.azurewebsites.net"

type Alumno = {
    nombreAsignatura: string;
    horasRequeridas: number;
    fechaRegistro: string;
    fechaActualizacion: string;
};

export default function Admin() {

    const [collapsed, setCollapsed] = useState(false);

    const [showRegister, setShowRegister] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);

    const [formRegister, setFormRegister] = useState({
        nombreAsignatura: "",
        horasRequeridas: 0,
        fechaRegistro: "",
        fechaActualizacion: "",
    });

    const handleChangeRegister = (e: any) => {
        setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
    };


    const handleSubmitRegister = async (e: any) => {

        const options = {
            method: 'POST',
            url: `${apiUrl}/api/asignatura/add`,
            headers: { 'Content-Type': 'application/json' },
            data: formRegister
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });

    }

    useEffect(() => {
        axios.get(`${apiUrl}/api/asignatura/list`)
            .then(res => {
                setAlumnos(res.data.user);
            })
            .catch(err => {
                console.error("Error al obtener alumnos:", err);
            });
    }, []);

    return (
        <>
            <div style={{ display: "flex" }}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedIconPage="Asignatura" selectedSidebarNav="Administrador"/>
                <div className="content-sidebear" style={{ width: collapsed ? "90vw" : "80vw" }}>
                    <h1 className="titulo-principal">Asignatura</h1>
                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowRegister(!showRegister)} className="titulo-principal">
                        Registrar Asignatura {showRegister ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showRegister && (<>
                        <form onSubmit={handleSubmitRegister} className="space-y-5">

                            <div className="form-grid-container-asignatura">

                                <div className="form-group-register">
                                    <label htmlFor="nombre" className="form-label">Nombre de la asignatura</label>
                                    <input
                                        type="text"
                                        name="nombreAsignatura"
                                        value={formRegister.nombreAsignatura}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="Nikola"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="telefonoContacto" className="form-label">Horas requeridas</label>
                                    <input
                                        type="number"
                                        name="horasRequeridas"
                                        value={formRegister.horasRequeridas}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="25"
                                    />
                                </div>

                                <div className="btn-wrapper-register">
                                    <button type="submit" className="btn-submit">
                                        Agregar Asignatura
                                    </button>
                                </div>
                            </div>


                        </form>
                        <br></br>
                    </>)}

                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowTable(!showTable)}  className="titulo-principal">
                        Asignaturas Registrados {showTable ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showTable && (<>


                        <div className="p-4">
                            <div className="overflow-x-auto">
                                <table className="tabla-alumnos">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th className="px-4 py-2 border">Nombre</th>
                                            <th className="px-4 py-2 border">Horas Requeridas</th>
                                            <th className="px-4 py-2 border">Registro</th>
                                            <th className="px-4 py-2 border">Actualización</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alumnos.map((alumno, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="px-4 py-2 border">{alumno.nombreAsignatura}</td>
                                                <td className="px-4 py-2 border">{alumno.horasRequeridas}</td>
                                                <td className="px-4 py-2 border">{alumno.fechaRegistro}</td>
                                                <td className="px-4 py-2 border">{alumno.fechaActualizacion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </>)}
                </div>
            </div>
        </>

    );
}