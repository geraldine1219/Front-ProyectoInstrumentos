import { useEffect, useState } from "react";
import axios from "axios";

// const apiUrl = import.meta.env.VITE_API_URL;
import Sidebar from "../../components/Sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import "../../styles/administrador/Clase.css";
import React from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

type Clase = {
    idClase: string;
    idAsignatura: string;
    idProfesor: string;
    idInstrumento: string;
    fechaRegistro: string;
    fechaActualizacion: string;
};

type typeListaAsignaturas  = {
    idAsignatura: string,
    nombreAsignatura: string
}

type typeListaProfesores  = {
    idProfesor: string,
    nombre: string,
    apellido: string
}

type typeListaIsntrumentos = {
    idInstrumento: string,
    nombreInstrumento: string
}

export default function Admin() {

    const [collapsed, setCollapsed] = useState(false);

    const [showRegister, setShowRegister] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [clases, setClase] = useState<Clase[]>([]);

    const [formRegister, setFormRegister] = useState({
        idAsignatura: "",
        idProfesor: "",
        idInstrumento: "",
    });

    const [listaAsignaturas, setListaAsignaturas] = useState<typeListaAsignaturas[]>([{
            idAsignatura: "",
            nombreAsignatura: ""
        }]);

    const [listaProfesores, setListaProfesores] = useState<typeListaProfesores[]>([{
            idProfesor: "",
            nombre: "",
            apellido: ""
        }]);

    const [listaInstrumentos, setListaInstrumentos] = useState<typeListaIsntrumentos[]>([{
            idInstrumento: "",
            nombreInstrumento: ""
        }]);

    const handleChangeRegister = (e: any) => {
        setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
    };


    const handleSubmitRegister = async (e: any) => {

        const options = {
            method: 'POST',
            url: `${apiUrl}/api/clase/add`,
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

        axios.get(`${apiUrl}/api/clase/list`)
            .then(res => {
                setClase(res.data.clase);
            })
            .catch(err => {
                console.error("Error al obtener clases:", err);
            });
        axios.get(`${apiUrl}/api/asignatura/listNameId`)
            .then(res => {
                setListaAsignaturas(res.data.asignatura);
            })
            .catch(err => {
                console.error("Error al obtener aulas:", err);
            });
        axios.get(`${apiUrl}/api/profesor/listNameId`)
            .then(res => {
                setListaProfesores(res.data.profesor);
            })
            .catch(err => {
                console.error("Error al obtener aulas:", err);
            });
        axios.get(`${apiUrl}/api/instrumento/listNameId`)
            .then(res => {
                console.log(res.data.instrumento)
                setListaInstrumentos(res.data.instrumento);
            })
            .catch(err => {
                console.error("Error al obtener aulas:", err);
            });

    }, []);

    return (
        <>
            <div style={{ display: "flex" }}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedIconPage="Clase" selectedSidebarNav="Administrador"/>
                <div className="content-sidebear" style={{ width: collapsed ? "90vw" : "80vw" }}>
                    <h1 className="titulo-principal">Clase</h1>
                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowRegister(!showRegister)} className="titulo-principal">
                        Registrar Clase {showRegister ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showRegister && (<>
                        <form onSubmit={handleSubmitRegister} className="space-y-5">

                            <div className="space-y-5 form-grid-container-data">
                                
                                <div className="form-group-register">
                                    <label htmlFor="idAsignatura" className="form-label">Asignatura</label>
                                    <select
                                        id="tipo"
                                        name="idAsignatura"
                                        value={formRegister.idAsignatura}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">-- Selecciona un tipo --</option>
                                        
                                        {listaAsignaturas.map((asignaturaData) => (
                                        <option key={asignaturaData.idAsignatura} value={asignaturaData.idAsignatura}>
                                            {asignaturaData.nombreAsignatura}
                                        </option>
                                        ))}

                                    </select>
                                </div>


                                

                                <div className="form-group-register">

                                    <label htmlFor="idInstrumento" className="form-label">Instrumento</label>
                                    <select
                                        id="tipo"
                                        name="idInstrumento"
                                        value={formRegister.idInstrumento}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">-- Selecciona un tipo --</option>
                                        
                                        {listaInstrumentos.map((isntrumentoData) => (
                                        <option key={isntrumentoData.idInstrumento} value={isntrumentoData.idInstrumento}>
                                            {`${isntrumentoData.nombreInstrumento}`}
                                        </option>
                                        ))}

                                    </select>
                                </div>

                                <div className="btn-wrapper-register">
                                    <button type="submit" className="btn-submit">
                                        Agregar Clase
                                    </button>
                                </div>
                            </div>


                        </form>
                        <br></br>
                    </>)}

                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowTable(!showTable)}  className="titulo-principal">
                        Clases Registrados {showTable ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showTable && (<>


                        <div className="p-4">
                            <div className="overflow-x-auto">
                                <table className="tabla-clases">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th className="px-4 py-2 border">Id</th>
                                            <th className="px-4 py-2 border">Asignatura</th>
                                            <th className="px-4 py-2 border">Profesor</th>
                                            <th className="px-4 py-2 border">Instrumento</th>
                                            <th className="px-4 py-2 border">Registro</th>
                                            <th className="px-4 py-2 border">Actualización</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clases.map((alumno, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="px-4 py-2 border">{alumno.idClase}</td>
                                                <td className="px-4 py-2 border">{alumno.idAsignatura}</td>
                                                <td className="px-4 py-2 border">{alumno.idProfesor}</td>
                                                <td className="px-4 py-2 border">{alumno.idInstrumento}</td>
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