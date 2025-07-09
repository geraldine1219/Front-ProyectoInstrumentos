import { useState } from "react";
import "../styles/Login1.css";
import axios from "axios";
import { useEffect } from "react";
import React from 'react';

import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "alumno",
  });

  const [selectRegister, setselectRegister] = useState("alumno")

  const [formRegisterAlumno, setFormRegisterAlumno] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    fechaNacimientoAlumno: "",
    telefonoContacto: "",
    dni: "",
    edad: 0
  });

  const [formRegisterProfesor, setFormRegisterProfesor] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    fechaNacimientoProfesor: "",
    telefonoContacto: "",
    dni: "",
    edad: 0
  });

  const [visibleRegister, setVisibleRegister] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleChangeRegisterAlumno = (e) => {
    setFormRegisterAlumno({ ...formRegisterAlumno, [e.target.name]: e.target.value });
  };

  const handleChangeRegisterProfesor = (e) => {
    setFormRegisterProfesor({ ...formRegisterProfesor, [e.target.name]: e.target.value });
  };

  const showRegister = () => {
    setVisibleRegister(!visibleRegister)
  };

  const handleSubmitRegister = async (e) => {

    const options = {
      method: 'POST',
      url: `${apiUrl}/api/${selectRegister}/add`,
      headers: {'Content-Type': 'application/json'},
      data: selectRegister === "alumno" ? formRegisterAlumno : formRegisterProfesor
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const options = {
        method: 'POST',
        url: `${apiUrl}/api/${form.role}/login`,
        headers: { 'Content-Type': 'application/json' },
        data: {
          "email": form.email,
          "contraseña": form.password,
        }
      };

      axios.request(options).then(function (response) {

        // alert(response.data.text)
        localStorage.setItem("usuario", JSON.stringify(response.data.data));
        localStorage.setItem("tipoUsuario", form.role);
        navigate(`/${form.role}`);

      }).catch(function (error) {
        console.error(error);
      });


    } catch (error) {
      console.error("Error al hacer login:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="login-wrapper">

      <div className="animated-bg">
        <div className="geometric-shape shape-1"></div>
        <div className="geometric-shape shape-2"></div>
        <div className="geometric-shape shape-3"></div>
        <div className="geometric-shape shape-4"></div>
      </div>

      <div className="form-container">

        {!visibleRegister ? (<>

          <h1 className="form-title">Iniciar Sesión</h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <div className="role-selector">
                {["alumno", "profesor", "administrador"].map((role) => (
                  <div
                    key={role}
                    className={`role-option ${form.role === role ? "selected" : ""}`}
                    onClick={() => setForm({ ...form, role })}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <div className="btn-wrapper">
              <button type="submit" className="btn-submit">
                Iniciar Sesión
              </button>
              {form.role !== "administrador" && (
                <>
                  <button type="submit" className="btn-submit" onClick={() => showRegister()}>
                    Registrate
                  </button>
                </>
              )}
            </div>
          </form>

        </>) : (<>

          <h1 className="form-title">Registrarse</h1>

          <div>
            <div className="role-selector">
              {["alumno", "profesor"].map((role) => (
                <div
                  key={role}
                  className={`role-option ${selectRegister === role ? "selected" : ""}`}
                  onClick={() => setselectRegister(role)}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmitRegister} className="space-y-5">
            {selectRegister === "alumno" ? (<>


              <div className="space-y-5 form-grid-container-alumno">

                <div className="form-group-register">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formRegisterAlumno.nombre}
                    onChange={handleChangeRegisterAlumno}
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
                    value={formRegisterAlumno.apellido}
                    onChange={handleChangeRegisterAlumno}
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
                    value={formRegisterAlumno.email}
                    onChange={handleChangeRegisterAlumno}
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
                    value={formRegisterAlumno.contraseña}
                    onChange={handleChangeRegisterAlumno}
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
                    value={formRegisterAlumno.fechaNacimientoAlumno}
                    onChange={handleChangeRegisterAlumno}
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
                    value={formRegisterAlumno.telefonoContacto}
                    onChange={handleChangeRegisterAlumno}
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
                    value={formRegisterAlumno.dni}
                    onChange={handleChangeRegisterAlumno}
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
                    value={formRegisterAlumno.edad}
                    onChange={handleChangeRegisterAlumno}
                    required
                    className="input-field"
                    placeholder="25"
                  />
                </div>

              </div>

            </>) : (<>

              <div className="space-y-5 form-grid-container-alumno">

                <div className="form-group-register">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formRegisterProfesor.nombre}
                    onChange={handleChangeRegisterProfesor}
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
                    value={formRegisterProfesor.apellido}
                    onChange={handleChangeRegisterProfesor}
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
                    value={formRegisterProfesor.email}
                    onChange={handleChangeRegisterProfesor}
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
                    value={formRegisterProfesor.contraseña}
                    onChange={handleChangeRegisterProfesor}
                    required
                    className="input-field"
                    placeholder="••••••••"
                  />
                </div>

                <div className="form-group-register">
                  <label htmlFor="fechaNacimientoAlumno" className="form-label">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    name="fechaNacimientoProfesor"
                    value={formRegisterProfesor.fechaNacimientoProfesor}
                    onChange={handleChangeRegisterProfesor}
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
                    value={formRegisterProfesor.telefonoContacto}
                    onChange={handleChangeRegisterProfesor}
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
                    value={formRegisterProfesor.dni}
                    onChange={handleChangeRegisterProfesor}
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
                    value={formRegisterProfesor.edad}
                    onChange={handleChangeRegisterProfesor}
                    required
                    className="input-field"
                    placeholder="25"
                  />
                </div>

              </div>
            </>)}

            <div className="btn-wrapper">
              <button type="submit" className="btn-submit" onClick={() => showRegister()}>
                ¿Ya estas registrado?
              </button>
              {form.role !== "administrador" && (
                <>
                  <button type="submit" className="btn-submit">
                    Registrarse
                  </button>
                </>
              )}
            </div>

          </form>

        </>)}



      </div>
    </div>
  );
}