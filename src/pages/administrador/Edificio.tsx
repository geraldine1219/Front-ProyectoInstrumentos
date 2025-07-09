import { useEffect, useState } from "react";
import axios from "axios";

// const apiUrl = import.meta.env.VITE_API_URL;
import Sidebar from "../../components/Sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import "../../styles/administrador/edificio.css";

const apiUrl = import.meta.env.VITE_API_URL;

type edificio = {
    direccion: string;
    fechaRegistro: string;
    fechaActualizacion: string;
};

export default function Admin() {

    const [collapsed, setCollapsed] = useState(false);

    const [showRegister, setShowRegister] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [edificios, setedificios] = useState<edificio[]>([]);

    const [formRegister, setFormRegister] = useState({
        calle: "",
        numero: 0,
    });

    const handleChangeRegister = (e: any) => {
        setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
    };


    const handleSubmitRegister = async (e: any) => {

        const options = {
            method: 'POST',
            url: `${apiUrl}/api/edificio/add`,
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
        axios.get(`${apiUrl}/api/edificio/list`)
            .then(res => {
                setedificios(res.data.user);
            })
            .catch(err => {
                console.error("Error al obtener edificios:", err);
            });
    }, []);

    return (
        <>
            <div style={{ display: "flex" }}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedIconPage="Edificio" selectedSidebarNav="Administrador"/>
                <div className="content-sidebear" style={{ width: collapsed ? "90vw" : "80vw" }}>
                    <h1 className="titulo-principal">Edificios</h1>
                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowRegister(!showRegister)} className="titulo-principal">
                        Registrar edificio {showRegister ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showRegister && (<>
                        <form onSubmit={handleSubmitRegister} className="space-y-5">

                            <div className="space-y-5 form-grid-container-data">

                                <div className="form-group-register">
                                    <label htmlFor="calle" className="form-label">Calle</label>
                                    <input
                                        type="text"
                                        name="calle"
                                        value={formRegister.calle}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="Nikola"
                                    />
                                </div>

                                <div className="form-group-register">
                                    <label htmlFor="numero" className="form-label">Número</label>
                                    <input
                                        type="number"
                                        name="numero"
                                        value={formRegister.numero}
                                        onChange={handleChangeRegister}
                                        required
                                        className="input-field"
                                        placeholder="328-759-8759"
                                    />
                                </div>

                                <div className="btn-wrapper-register">
                                    <button type="submit" className="btn-submit">
                                        Agregar Edificio
                                    </button>
                                </div>
                            </div>


                        </form>
                        <br></br>
                    </>)}

                    <hr className="linea-azul"></hr>

                    <h2 onClick={() => setShowTable(!showTable)}  className="titulo-principal">
                        Edificios Registrados {showTable ? <ChevronDown size={25} /> : <ChevronRight size={25} />}
                    </h2>

                    {showTable && (<>


                        <div className="p-4">
                            <div className="overflow-x-auto">
                                <table className="tabla-edificios">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th className="px-4 py-2 border">Direccion</th>
                                            <th className="px-4 py-2 border">Registro</th>
                                            <th className="px-4 py-2 border">Actualización</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {edificios.map((edificio, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="px-4 py-2 border">{edificio.direccion}</td>
                                                <td className="px-4 py-2 border">{edificio.fechaRegistro}</td>
                                                <td className="px-4 py-2 border">{edificio.fechaActualizacion}</td>
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