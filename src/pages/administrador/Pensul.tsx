import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
// const apiUrl = import.meta.env.VITE_API_URL;
import Sidebar from "../../components/Sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import "../../styles/administrador/Pensul.css";

const apiUrl = import.meta.env.VITE_API_URL;

type pensul = {
    idPensul: number;
    idAlumno: number;
    idClase: number;
    nota: number;
    fechaRegistro: string;
    fechaActualizacion: string;
};

type typeListaAlumno  = {
    idAlumno: string,
    nombre: string
    apellido: string
}

type typeListaClase  = {
    idClase: string,
    idAsignatura: string
}

export default function Admin() {

    const [collapsed, setCollapsed] = useState(false);

    const [showRegister, setShowRegister] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [pensuls, setpensuls] = useState<pensul[]>([]);

    const [listaAlumno, setListaAlumno] = useState<typeListaAlumno[]>([{
        idAlumno: "",
        nombre: "",
        apellido: ""
    }]);

    const [listaClase, setListaClase] = useState<typeListaClase[]>([{
        idClase: "",
        idAsignatura: "",
    }]);

    const [formRegister, setFormRegister] = useState({
        idAlumno: "",
        idClase: "",
        nota: 0,
    });

    const handleChangeRegister = (e: any) => {
        setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
    };


    const handleSubmitRegister = async (e: any) => {

        const options = {
            method: 'POST',
            url: `${apiUrl}/api/pensul/add`,
            headers: { 'Content-Type': 'application/json' },
            data: formRegister
        };

        axios.request(options).then(function (response) {
            alert(response.data)
        }).catch(function (error) {
            console.error(error);
        });

    }

    useEffect(() => {
        axios.get(`${apiUrl}/api/pensul/list`)
            .then(res => {
                setpensuls(res.data.pensuls);
            })
            .catch(err => {
                console.error("Error al obtener pensuls:", err);
            });

        axios.get(`${apiUrl}/api/pensul/listNameId`)
            .then(res => {
                setListaAlumno(res.data.alumno);
                setListaClase(res.data.clase);
            })
            .catch(err => {
                console.error("Error al obtener pensuls:", err);
            });
    }, []);

    return (
        <>
            <div style={{ display: "flex" }}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedIconPage="Pensul" selectedSidebarNav="Administrador" />
                <div className="content-sidebear" style={{ width: collapsed ? "90vw" : "80vw" }}>
                    <h1 className="titulo-principal">Pensuls</h1>
                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowRegister(!showRegister)} className="titulo-principal">
                        Registrar pensul {showRegister ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showRegister && (<>
                        <form onSubmit={handleSubmitRegister} className="space-y-5">

                            <div className="space-y-5 form-grid-container-data">

                                <div className="form-group-register">
                                    <label htmlFor="idAlumno" className="form-label">Alumno</label>
                                    <select
                                        id="tipo"
                                        name="idAlumno"
                                        value={formRegister.idAlumno}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">-- Selecciona un tipo --</option>
                                        
                                        {listaAlumno.map((alumnoData) => (
                                        <option key={alumnoData.idAlumno} value={alumnoData.idAlumno}>
                                            {alumnoData.nombre} {alumnoData.apellido}
                                        </option>
                                        ))}

                                    </select>
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="idClase" className="form-label">Clase</label>
                                    <select
                                        id="tipo"
                                        name="idClase"
                                        value={formRegister.idClase}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">-- Selecciona un tipo --</option>
                                        
                                        {listaClase.map((claseData) => (
                                        <option key={claseData.idClase} value={claseData.idClase}>
                                            {claseData.idClase}
                                        </option>
                                        ))}

                                    </select>
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="nota" className="form-label">Notas</label>
                                    <input
                                        type="number"
                                        max={5}
                                        min={0}
                                        name="nota"
                                        value={formRegister.nota}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="0.0"
                                    />
                                </div>

                                <div className="btn-wrapper-register">
                                    <button type="submit" className="btn-submit">
                                        Agregar Pensul
                                    </button>
                                </div>
                            </div>


                        </form>
                        <br></br>
                    </>)}

                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowTable(!showTable)} className="titulo-principal">
                        Pensuls Registrados {showTable ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showTable && (<>


                        <div className="p-4">
                            <div className="overflow-x-auto">
                                <table className="tabla-pensuls">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th className="px-4 py-2 border">Id</th>
                                            <th className="px-4 py-2 border">Alumno</th>
                                            <th className="px-4 py-2 border">Clase</th>
                                            <th className="px-4 py-2 border">Nota</th>
                                            <th className="px-4 py-2 border">Fecha de Registro</th>
                                            <th className="px-4 py-2 border">Fecha de Actualziación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pensuls.map((pensul, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="px-4 py-2 border">{pensul.idPensul}</td>
                                                <td className="px-4 py-2 border">{pensul.idAlumno}</td>
                                                <td className="px-4 py-2 border">{pensul.idClase}</td>
                                                <td className="px-4 py-2 border">{pensul.nota}</td>
                                                <td className="px-4 py-2 border">{pensul.fechaRegistro}</td>
                                                <td className="px-4 py-2 border">{pensul.fechaActualizacion ? "Si":"No"}</td>
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