import React from "react";
import { HorarioAlumno } from "../types/HorarioAlumno";
import "../styles/components/Popup.css"

interface PopupProps {
  data: HorarioAlumno;
  onClose: () => void;
}

const InfoRow = ({ label, value }: { label: string; value: any }) => (
  <p style={{ marginBottom: "10px" }}>
    <strong>{label}:</strong> {value || "N/A"}
  </p>
);


export function Popup({ data, onClose }: PopupProps) {
  if (!data.idHorario) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
      >
        <h2>Detalles de la Selección</h2>
        <p>Día: {data.dia}</p>
        <p>Hora: {data.hour}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    );
  } else {
    return (
      <>


        <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-columns">
          {/* 1️⃣ Información General */}
          <div className="modal-section">
            <h2>📅 Información General</h2>
            <InfoRow label="Día" value={data.dia} />
            <InfoRow label="Hora" value={data.hour} />
            <InfoRow label="Asignatura" value={data.nombreAsignatura} />
            <InfoRow label="Horas Requeridas" value={data.horasRequeridas} />
          </div>

          {/* 2️⃣ Información del Aula */}
          <div className="modal-section">
            <h2>🏫 Información del Aula</h2>
            <InfoRow label="Dirección" value={data.direccion} />
            <InfoRow label="¿Tiene ordenador?" value={data.disponibilidadOrdenador} />
            <InfoRow label="Tipo" value={data.tipo} />
            <InfoRow label="Nombre del Aula" value={data.nombreAula} />
          </div>

          {/* 3️⃣ Información del Profesor */}
          <div className="modal-section">
            <h2>👨‍🏫 Información del Profesor</h2>
            <InfoRow label="Nombre" value={data.nombreProfesor} />
            <InfoRow label="Apellido" value={data.apellidoProfesor} />
            <InfoRow label="Email" value={data.emailProfesor} />
            <InfoRow label="Teléfono" value={data.telefonoContactoProfesor} />
          </div>
        </div>

      </div>
        <button className="modal-button" onClick={onClose}>
          Cerrar
        </button>
    </div>


      </>
    );
  }
}