import { useEffect, useState } from "react";
import axios from "axios";

// const apiUrl = import.meta.env.VITE_API_URL;
import Sidebar from "../../components/Sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import "../../styles/administrador/Alumno.css";
import React from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

type Alumno = {
    nombre: string;
    apellido: string;
    email: string;
    telefonoContacto: string;
    dni: string;
    edad: number;
    fechaNacimientoAlumno: string;
    fechaRegistro: string;
    fechaActualizacion: string;
};

export default function Admin() {

    const [collapsed, setCollapsed] = useState(false);

    const [showRegister, setShowRegister] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);

    const [formRegister, setFormRegister] = useState({
        nombre: "",
        apellido: "",
        email: "",
        contraseña: "",
        fechaNacimientoAlumno: "",
        telefonoContacto: "",
        dni: "",
        edad: 0
    });

    const handleChangeRegister = (e: any) => {
        setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
    };


    const handleSubmitRegister = async (e: any) => {

        const options = {
            method: 'POST',
            url: `${apiUrl}/api/alumno/add`,
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
        axios.get(`${apiUrl}/api/alumno/list`)
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
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedIconPage="Alumno" selectedSidebarNav="Administrador"/>
                <div className="content-sidebear" style={{ width: collapsed ? "90vw" : "80vw" }}>
                    <h1 className="titulo-principal">Alumnos</h1>
                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowRegister(!showRegister)} className="titulo-principal">
                        Registrar Alumno {showRegister ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showRegister && (<>
                        <form onSubmit={handleSubmitRegister} className="space-y-5">

                            <div className="space-y-5 form-grid-container-data">

                                <div className="form-group-register">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formRegister.nombre}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="Nikola"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="apellido" className="form-label">Apellido</label>
                                    <input
                                        type="text"
                                        name="apellido"
                                        value={formRegister.apellido}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="Tesla"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formRegister.email}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="nikola.tesla@correo.com"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        name="contraseña"
                                        value={formRegister.contraseña}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="fechaNacimientoAlumno" className="form-label">Fecha de Nacimiento</label>
                                    <input
                                        type="date"
                                        name="fechaNacimientoAlumno"
                                        value={formRegister.fechaNacimientoAlumno}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="1999-01-01"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="telefonoContacto" className="form-label">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="telefonoContacto"
                                        value={formRegister.telefonoContacto}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="328-759-8759"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="telefonoContacto" className="form-label">DNI</label>
                                    <input
                                        type="text"
                                        name="dni"
                                        value={formRegister.dni}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="1111111111"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="telefonoContacto" className="form-label">Edad</label>
                                    <input
                                        type="number"
                                        name="edad"
                                        value={formRegister.edad}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="25"
                                    />
                                </div>

                                <div className="btn-wrapper-register">
                                    <button type="submit" className="btn-submit">
                                        Agregar Usuario
                                    </button>
                                </div>
                            </div>


                        </form>
                        <br></br>
                    </>)}

                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowTable(!showTable)}  className="titulo-principal">
                        Alumnos Registrados {showTable ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showTable && (<>


                        <div className="p-4">
                            <div className="overflow-x-auto">
                                <table className="tabla-alumnos">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th className="px-4 py-2 border">Nombre</th>
                                            <th className="px-4 py-2 border">Apellido</th>
                                            <th className="px-4 py-2 border">Email</th>
                                            <th className="px-4 py-2 border">Teléfono</th>
                                            <th className="px-4 py-2 border">DNI</th>
                                            <th className="px-4 py-2 border">Edad</th>
                                            <th className="px-4 py-2 border">Fecha Nacimiento</th>
                                            <th className="px-4 py-2 border">Registro</th>
                                            <th className="px-4 py-2 border">Actualización</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alumnos.map((alumno, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="px-4 py-2 border">{alumno.nombre}</td>
                                                <td className="px-4 py-2 border">{alumno.apellido}</td>
                                                <td className="px-4 py-2 border">{alumno.email}</td>
                                                <td className="px-4 py-2 border">{alumno.telefonoContacto}</td>
                                                <td className="px-4 py-2 border">{alumno.dni}</td>
                                                <td className="px-4 py-2 border">{alumno.edad}</td>
                                                <td className="px-4 py-2 border">{alumno.fechaNacimientoAlumno}</td>
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