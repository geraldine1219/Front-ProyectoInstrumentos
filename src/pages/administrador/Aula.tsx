import { useEffect, useState } from "react";
import axios from "axios";

// const apiUrl = import.meta.env.VITE_API_URL;
import Sidebar from "../../components/Sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import "../../styles/administrador/Aula.css";

const apiUrl = import.meta.env.VITE_API_URL;

type aula = {
    idAula: string;
    idEdificio: string;
    nombre: string;
    tipo: string;
    capacidadAlumnos: number;
    disponibilidadOrdenador: boolean;
    fechaRegistro: string;
    fechaActualizacion: string;
};

type typeListaEdificios  = {
    idEdificio: string,
    direccion: string
}

export default function Admin() {

    const [collapsed, setCollapsed] = useState(false);

    const [showRegister, setShowRegister] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [aulas, setaulas] = useState<aula[]>([]);
    const [listaEdificios, setListaEdificios] = useState<typeListaEdificios[]>([{
        idEdificio: "",
        direccion: ""
    }]);

    const [formRegister, setFormRegister] = useState({
        idEdificio: "1",
        nombre: "Nombre Edificio",
        tipo: "Instrumental",
        capacidadAlumnos: 0,
        disponibilidadOrdenador: 1,
    });

    const handleChangeRegister = (e: any) => {
        setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
    };


    const handleSubmitRegister = async (e: any) => {

        const options = {
            method: 'POST',
            url: `${apiUrl}/api/aula/add`,
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
        axios.get(`${apiUrl}/api/aula/list`)
            .then(res => {
                setaulas(res.data.aulas);
            })
            .catch(err => {
                console.error("Error al obtener aulas:", err);
            });

        axios.get(`${apiUrl}/api/edificio/listNameId`)
            .then(res => {
                setListaEdificios(res.data.edificio);
            })
            .catch(err => {
                console.error("Error al obtener aulas:", err);
            });
    }, []);

    return (
        <>
            <div style={{ display: "flex" }}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedIconPage="Aula" selectedSidebarNav="Administrador" />
                <div className="content-sidebear" style={{ width: collapsed ? "90vw" : "80vw" }}>
                    <h1 className="titulo-principal">Aulas</h1>
                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowRegister(!showRegister)} className="titulo-principal">
                        Registrar Aula {showRegister ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showRegister && (<>
                        <form onSubmit={handleSubmitRegister} className="space-y-5">

                            <div className="space-y-5 form-grid-container-data">

                                <div className="form-group-register">
                                    <label htmlFor="idEdificio" className="form-label">Edificio</label>
                                    <select
                                        id="tipo"
                                        name="idEdificio"
                                        value={formRegister.idEdificio}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">-- Selecciona un tipo --</option>
                                        
                                        {listaEdificios.map((edificioData) => (
                                        <option key={edificioData.idEdificio} value={edificioData.idEdificio}>
                                            {edificioData.direccion}
                                        </option>
                                        ))}

                                    </select>
                                </div>

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
                                    <label htmlFor="tipo" className="form-label">Tipo de aula</label>
                                    <select
                                        id="tipo"
                                        name="tipo"
                                        value={formRegister.tipo}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">-- Selecciona un tipo --</option>
                                        <option value="Magistral">Magistral</option>
                                        <option value="Instrumental">Instrumentalo</option>

                                    </select>
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="capacidadAlumnos" className="form-label">Número de alumnos</label>
                                    <input
                                        type="number"
                                        min={0}
                                        name="capacidadAlumnos"
                                        value={formRegister.capacidadAlumnos}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="30"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="disponibilidadOrdenador" className="form-label">
                                        ¿Hay un ordenador en la sala?
                                    </label>
                                    <select
                                        id="activo"
                                        name="disponibilidadOrdenador"
                                        value={String(formRegister.disponibilidadOrdenador)}         // convertimos boolean a string
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">-- Selecciona --</option>
                                        <option value="true">Sí</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>


                                <div className="btn-wrapper-register">
                                    <button type="submit" className="btn-submit">
                                        Agregar Aula
                                    </button>
                                </div>
                            </div>


                        </form>
                        <br></br>
                    </>)}

                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowTable(!showTable)} className="titulo-principal">
                        Aulas Registrados {showTable ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showTable && (<>


                        <div className="p-4">
                            <div className="overflow-x-auto">
                                <table className="tabla-aulas">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th className="px-4 py-2 border">Id</th>
                                            <th className="px-4 py-2 border">Edificio</th>
                                            <th className="px-4 py-2 border">Nombre</th>
                                            <th className="px-4 py-2 border">Tipo</th>
                                            <th className="px-4 py-2 border">Capacidad de Alumnos</th>
                                            <th className="px-4 py-2 border">Disponibilidad de Ordenador</th>
                                            <th className="px-4 py-2 border">Fecha de Registro</th>
                                            <th className="px-4 py-2 border">Fecha de Actualziación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {aulas.map((aula, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="px-4 py-2 border">{aula.idAula}</td>
                                                <td className="px-4 py-2 border">{aula.idEdificio}</td>
                                                <td className="px-4 py-2 border">{aula.nombre}</td>
                                                <td className="px-4 py-2 border">{aula.tipo}</td>
                                                <td className="px-4 py-2 border">{aula.capacidadAlumnos}</td>
                                                <td className="px-4 py-2 border">{aula.disponibilidadOrdenador ? "Si":"No"}</td>
                                                <td className="px-4 py-2 border">{aula.fechaRegistro}</td>
                                                <td className="px-4 py-2 border">{aula.fechaActualizacion}</td>
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