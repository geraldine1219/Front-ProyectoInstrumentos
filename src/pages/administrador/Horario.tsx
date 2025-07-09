import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
// const apiUrl = import.meta.env.VITE_API_URL;
import Sidebar from "../../components/Sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import "../../styles/administrador/horario.css";

const apiUrl = import.meta.env.VITE_API_URL;

type horario = {
    idHorario: string;
    idClase: string;
    idAula: string;
    dia: string;
    hour: string;
    fechaRegistro: string;
    fechaActualizacion: string;
};

type typeListaClase = {
    idClase: string,
    idAsignatura: string
}

type typeListaAula = {
    idAula: string,
    nombre: string
}

type typeListaHorario = {
    idHorario: string,
    idClase: string,
    idAula: string,
    dia: string,
    hour: string, 
}

type typeListaAlumno  = {
    idAlumno: string,
    nombre: string
    apellido: string
}

export default function Admin() {

    const [collapsed, setCollapsed] = useState(false);

    const [showRegister, setShowRegister] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [showAddAlumnoHorario, setShowAddAlumnoHorario] = useState(false);
    const [horarios, sethorarios] = useState<horario[]>([]);

    const [formRegister, setFormRegister] = useState({
        idClase: "",
        idAula: "",
        dias: [""],
        hour: "",
    });

    const [formRegisterAlumnoHorario, setFormRegisterAlumnoHorario] = useState({
        idAlumno: "",
        idHorario: ""
    });

    const [listaClase, setListaClase] = useState<typeListaClase[]>([{
        idClase: "",
        idAsignatura: "",
    }]);

    const [listaAula, setListaAula] = useState<typeListaAula[]>([{
        idAula: "",
        nombre: "",
    }]);

    const [listaHorario, setListaHorario] = useState<typeListaHorario[]>([{
        idHorario: "",
        idClase: "",
        idAula: "",
        dia: "",
        hour: "",       
    }]);

    const [listaAlumno, setListaAlumno] = useState<typeListaAlumno[]>([{
            idAlumno: "",
            nombre: "",
            apellido: ""
        }]);

    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    const [formRegisterDias, setFormRegisterDias] = useState({
        dias: [] as string[],
    });

    const handleChangeRegister = (e: any) => {
        setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
    };

    const handleChangeRegisterAlumnoHorario = (e: any) => {
        setFormRegisterAlumnoHorario({ ...formRegisterAlumnoHorario, [e.target.name]: e.target.value });
    };

    const handleSubmitRegister = async (e: any) => {

        const options = {
            method: 'POST',
            url: `${apiUrl}/api/horario/add`,
            headers: { 'Content-Type': 'application/json' },
            data: {
                ...formRegister,
                dias: formRegisterDias.dias
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });

    }

    const handleSubmitRegisterAlumnoHorario = async (e: any) => {

        const options = {
            method: 'POST',
            url: `${apiUrl}/api/alumnoHorario/add`,
            headers: { 'Content-Type': 'application/json' },
            data: {
                ...formRegisterAlumnoHorario,
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });

    }

    const handleCheckDia = (dia: string) => {
        setFormRegisterDias(prev => {
            const yaSeleccionado = prev.dias.includes(dia);
            return {
                ...prev,
                dias: yaSeleccionado
                    ? prev.dias.filter(d => d !== dia) // lo desmarca
                    : [...prev.dias, dia]              // lo marca
            };
        });
    };

    useEffect(() => {
        axios.get(`${apiUrl}/api/horario/list`)
            .then(res => {
                sethorarios(res.data.horario);
            })
            .catch(err => {
                console.error("Error al obtener horarios:", err);
            });

        axios.get(`${apiUrl}/api/clase/listNameId`)
            .then(res => {
                setListaClase(res.data.clase);
            })
            .catch(err => {
                console.error("Error al obtener pensuls:", err);
            });
        axios.get(`${apiUrl}/api/aula/listNameId`)
            .then(res => {
                setListaAula(res.data.aula);
            })
            .catch(err => {
                console.error("Error al obtener pensuls:", err);
            });
        axios.get(`${apiUrl}/api/alumno/listNameId`)
            .then(res => {
                setListaAlumno(res.data.alumno);
            })
            .catch(err => {
                console.error("Error al obtener pensuls:", err);
            });
        axios.get(`${apiUrl}/api/horario/listNameId`)
            .then(res => {
                setListaHorario(res.data.horario);
            })
            .catch(err => {
                console.error("Error al obtener pensuls:", err);
            });
        
    }, []);

    return (
        <>
            <div style={{ display: "flex" }}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedIconPage="Horario" selectedSidebarNav="Administrador" />
                <div className="content-sidebear" style={{ width: collapsed ? "90vw" : "80vw" }}>
                    <h1 className="titulo-principal">Horarios</h1>
                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowRegister(!showRegister)} className="titulo-principal">
                        Registrar horario {showRegister ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showRegister && (<>
                        <form onSubmit={handleSubmitRegister} className="space-y-5">

                            <div className="space-y-5 form-grid-container-data">

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
                                                {claseData.idAsignatura}
                                            </option>
                                        ))}

                                    </select>
                                </div>

                                <div className="form-group-register">

                                    <label htmlFor="idAula" className="form-label">Aula</label>
                                    <select
                                        id="tipo"
                                        name="idAula"
                                        value={formRegister.idAula}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">-- Selecciona un tipo --</option>

                                        {listaAula.map((aulaData) => (
                                            <option key={aulaData.idAula} value={aulaData.idAula}>
                                                {aulaData.nombre}
                                            </option>
                                        ))}

                                    </select>
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="hour" className="form-label">Hora</label>
                                    <input
                                        type="time"
                                        id="hour"
                                        name="hour"
                                        value={formRegister.hour}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-hora"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label className="form-label">Días de clase</label>
                                    <div className="checklist-dias">
                                        {diasSemana.map((dia) => (
                                            <label key={dia} className="checkbox-card">
                                                <input
                                                    type="checkbox"
                                                    value={dia}
                                                    checked={formRegisterDias.dias.includes(dia)}
                                                    onChange={() => handleCheckDia(dia)}
                                                />
                                                <span>{dia}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>



                                <div className="btn-wrapper-register">
                                    <button type="submit" className="btn-submit">
                                        Agregar Horario
                                    </button>
                                </div>
                            </div>


                        </form>
                        <br></br>
                    </>)}

                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowTable(!showTable)} className="titulo-principal">
                        Horarios Registrados {showTable ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showTable && (<>


                        <div className="p-4">
                            <div className="overflow-x-auto">
                                <table className="tabla-horarios">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th className="px-4 py-2 border">Id</th>
                                            <th className="px-4 py-2 border">Clase</th>
                                            <th className="px-4 py-2 border">Aula</th>
                                            <th className="px-4 py-2 border">Dia</th>
                                            <th className="px-4 py-2 border">Hora</th>
                                            <th className="px-4 py-2 border">Fecha de Registro</th>
                                            <th className="px-4 py-2 border">Fecha de Actualización</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {horarios.map((horario, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="px-4 py-2 border">
                                                    {horario.idHorario}</td>
                                                <td className="px-4 py-2 border">
                                                    {horario.idClase}</td>
                                                <td className="px-4 py-2 border">
                                                    {horario.idAula}</td>
                                                <td className="px-4 py-2 border">
                                                    {horario.dia}</td>
                                                <td className="px-4 py-2 border">
                                                    {horario.hour}</td>
                                                <td className="px-4 py-2 border">
                                                    {horario.fechaRegistro}</td>
                                                <td className="px-4 py-2 border">
                                                    {horario.fechaActualizacion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </>)}

                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowAddAlumnoHorario(!showAddAlumnoHorario)} className="titulo-principal">
                        Registrar Alumno a un Horario {showAddAlumnoHorario ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showAddAlumnoHorario && (<>

                        <form onSubmit={handleSubmitRegisterAlumnoHorario} className="space-y-5">

                            <div className="space-y-5 form-grid-container-data">

                                <div className="form-group-register">
                                    <label htmlFor="idAlumno" className="form-label">Alumno</label>
                                    <select
                                        id="tipo"
                                        name="idAlumno"
                                        value={formRegisterAlumnoHorario.idAlumno}
                                        onChange={handleChangeRegisterAlumnoHorario}
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

                                    <label htmlFor="idHorario" className="form-label">Horario</label>
                                    <select
                                        id="tipo"
                                        name="idHorario"
                                        value={formRegisterAlumnoHorario.idHorario}
                                        onChange={handleChangeRegisterAlumnoHorario}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">-- Selecciona un tipo --</option>

                                        {listaHorario.map((aulaData) => (
                                            <option key={aulaData.idHorario} value={aulaData.idHorario}>
                                                {`${aulaData.idClase} - ${aulaData.hour} - ${aulaData.dia}`}
                                            </option>
                                        ))}

                                    </select>
                                </div>

                                <div className="btn-wrapper-register">
                                    <button type="submit" className="btn-submit">
                                        Agregar Horario
                                    </button>
                                </div>
                            </div>

                        </form>

                    </>)}


                </div>
            </div>
        </>

    );
}