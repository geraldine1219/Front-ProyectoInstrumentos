import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
// const apiUrl = import.meta.env.VITE_API_URL;
import Sidebar from "../../components/Sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import "../../styles/administrador/Instrumento.css";

const apiUrl = import.meta.env.VITE_API_URL;

type instrumento = {
    nombreInstrumento: string;
    tipo: string;
    edadRecomendada: string;
    perteneceAlInstituto: string;
    fechaRegistro: string;
    fechaActualizacion: string;
};

export default function Admin() {

    const [collapsed, setCollapsed] = useState(false);

    const [showRegister, setShowRegister] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [instrumentos, setinstrumentos] = useState<instrumento[]>([]);

    const [formRegister, setFormRegister] = useState({
        nombreInstrumento: "",
        tipo: "",
        edadRecomendada: 0,
        perteneceAlInstituto: "",
    });

    const handleChangeRegister = (e: any) => {
        setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
    };


    const handleSubmitRegister = async (e: any) => {

        const options = {
            method: 'POST',
            url: `${apiUrl}/api/instrumento/add`,
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
        axios.get(`${apiUrl}/api/instrumento/list`)
            .then(res => {
                setinstrumentos(res.data.user);
            })
            .catch(err => {
                console.error("Error al obtener instrumentos:", err);
            });
    }, []);

    return (
        <>
            <div style={{ display: "flex" }}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedIconPage="Instrumento" selectedSidebarNav="Administrador"/>
                <div className="content-sidebear" style={{ width: collapsed ? "90vw" : "80vw" }}>
                    <h1 className="titulo-principal">Instrumentos</h1>
                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowRegister(!showRegister)} className="titulo-principal">
                        Registrar Instrumento {showRegister ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showRegister && (<>
                        <form onSubmit={handleSubmitRegister} className="space-y-5">

                            <div className="space-y-5 form-grid-container-data">

                                <div className="form-group-register">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        name="nombreInstrumento"
                                        value={formRegister.nombreInstrumento}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="Guitarra"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="apellido" className="form-label">Tipo</label>
                                    <input
                                        type="text"
                                        name="tipo"
                                        value={formRegister.tipo}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="Cuerda"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="edadRecomendada" className="form-label">Edad recomendada para aprender</label>
                                    <input
                                        type="number"
                                        name="edadRecomendada"
                                        value={formRegister.edadRecomendada}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="Cuerda"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="perteneceAlInstituto" className="form-label">
                                        ¿Pertenece al instituto?
                                    </label>

                                    <select
                                        name="perteneceAlInstituto"
                                        value={formRegister.perteneceAlInstituto}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">Seleccione una opción</option>
                                        <option value="1">Sí</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>

                                <div className="btn-wrapper-register">
                                    <button type="submit" className="btn-submit">
                                        Agregar Instrumento
                                    </button>
                                </div>
                            </div>


                        </form>
                        <br></br>
                    </>)}

                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowTable(!showTable)} className="titulo-principal">
                        Instrumentos Registrados {showTable ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showTable && (<>


                        <div className="p-4">
                            <div className="overflow-x-auto">
                                <table className="tabla-instrumentos">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th className="px-4 py-2 border">Nombre</th>
                                            <th className="px-4 py-2 border">Tipo</th>
                                            <th className="px-4 py-2 border">Edad</th>
                                            <th className="px-4 py-2 border">Pertenece al Instituto</th>
                                            <th className="px-4 py-2 border">Registro</th>
                                            <th className="px-4 py-2 border">Actualización</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {instrumentos.map((instrumento, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="px-4 py-2 border">{instrumento.nombreInstrumento}</td>
                                                <td className="px-4 py-2 border">{instrumento.tipo}</td>
                                                <td className="px-4 py-2 border">{instrumento.edadRecomendada}</td>
                                                <td className="px-4 py-2 border">{instrumento.perteneceAlInstituto == "1" ? "Si" : "No"}</td>
                                                <td className="px-4 py-2 border">{instrumento.fechaRegistro}</td>
                                                <td className="px-4 py-2 border">{instrumento.fechaActualizacion}</td>
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