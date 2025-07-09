import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import NotFound from "./pages/NotFound";
import React from 'react';

import './index.css'

import Login from './pages/Login'

import Admin from './pages/Admin'
import AlumnoAdmin from './pages/administrador/Alumno'
import AsignaturaAdmin from './pages/administrador/Asignatura'
import ProfesorAdmin from './pages/administrador/Profesor'
import InstrumentoAdmin from './pages/administrador/Instrumento'
import EdificioAdmin from './pages/administrador/Edificio'
import AulaAdmin from './pages/administrador/Aula'
import PensulAdmin from './pages/administrador/Pensul'
import ClaseAdmin from './pages/administrador/Clase'
import HorarioAdmin from './pages/administrador/Horario'

import Alumno from './pages/Alumno'
import PensulAlumno from './pages/alumno/Pensuls'
import HorarioAlumno from './pages/alumno/Horario'

import Profesor from './pages/Profesor'
import PensulProfesor from './pages/profesor/Pensul'
import HorarioProfesor from './pages/profesor/Horario'

function App() {



  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="/administrador" element={<Admin />} />
      <Route path="/administrador/alumno" element={<AlumnoAdmin />} />
      <Route path="/administrador/asignatura" element={<AsignaturaAdmin />} />
      <Route path="/administrador/profesor" element={<ProfesorAdmin />} />
      <Route path="/administrador/instrumento" element={<InstrumentoAdmin />} />
      <Route path="/administrador/edificio" element={<EdificioAdmin />} />
      <Route path="/administrador/aula" element={<AulaAdmin />} />
      <Route path="/administrador/pensul" element={<PensulAdmin />} />
      <Route path="/administrador/Clase" element={<ClaseAdmin />} />
      <Route path="/administrador/Horario" element={<HorarioAdmin />} />

      <Route path="/alumno" element={<Alumno />} />
      <Route path="/alumno/pensul" element={<PensulAlumno />} />
      <Route path="/alumno/horario" element={<HorarioAlumno />} />

      <Route path="/profesor" element={<Profesor />} />
      <Route path="/profesor/estudiantes" element={<PensulProfesor />} />
      <Route path="/profesor/horario" element={<HorarioProfesor />} />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
