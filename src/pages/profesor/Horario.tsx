import React, { useState, useEffect } from "react";
import { PopupProfesor } from "../../components/Popup";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import "../../styles/components/HorarioSemanal.css"

import { getUserFromLocalStorage } from "../../utils/auth";
import { Cell, HorarioProfesor } from "../../types/HorarioProfesor";
import { constantHorarioProfesor } from "../../utils/constants";

const apiUrl = import.meta.env.VITE_API_URL2;


const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const HOURS = Array.from({ length: 18 }, (_, i) => `${(i + 6).toString().padStart(2, "0")}:00`);

export default function Calendar() {

  const user = getUserFromLocalStorage();

  const [collapsed, setCollapsed] = useState(false);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [horario, setHorario] = useState<HorarioProfesor[]>([]);
  const [selectedHorario, setSelectedHorario] = useState<HorarioProfesor>({
        ...constantHorarioProfesor
      });

  const handleCellClick = (day: string, hour: string) => {
    const resultado = horario.find(
      (item) => item.dia === day && item.hour === hour
    );
    if (resultado) {
      setSelectedHorario(resultado)
    }else{
      setSelectedHorario({
        ...constantHorarioProfesor,
        "dia": day,
        "hour": hour,
      })
    }
    setSelectedCell({ day, hour });
  };

  const tieneClase = (dia: string, hour: string): boolean => {
  if (!horario || !Array.isArray(horario)) return false;

  return horario.some(c => c.dia === dia && c.hour === hour);
};

  useEffect(() => {
    axios.get(`${apiUrl}/api/alumnoHorario/horario/profesor/${user?.idProfesor}`)
      .then(res => {
          setHorario(res.data.profesorHorario)
      })
      .catch(err => {
          console.error("Error al obtener horarios:", err);
      });
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} selectedIconPage="Horario" selectedSidebarNav="Profesor" />
        <div className="content-sidebear" style={{ width: collapsed ? "90vw" : "80vw" }}>
          <h1 className="titulo-principal">Calendario Semanal</h1>
          <hr className="linea-azul"></hr>
          <br></br>
          <div style={{ width: "100%", height: "35vw", overflowY: "auto" }}>
            <table className="tableHorario">
              <thead className="encabezado-tabla">
                <tr>
                  <th>Hora</th>
                  {DAYS.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HOURS.map((hour) => (
                  <tr key={hour}>
                    <td>{hour}</td>
                    {DAYS.map((day) => {
                      const isSelected = selectedCell?.day === day && selectedCell.hour === hour;
                      const isClase = tieneClase(day, hour);

                      let className = "defaultCell";
                      if (isClase) className = "cellWithClass";
                      if (isSelected) className = "selectedCell";

                      return (
                        <td
                          key={`${day}-${hour}`}
                          onClick={() => handleCellClick(day, hour)}
                          className={className}
                        >
                          {isClase && !isSelected && <div className="dot"></div>}
                          {isSelected && <strong></strong>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Popup */}
      {selectedCell && (
        <PopupProfesor
          data={selectedHorario}
          onClose={() => setSelectedCell(null)}
        />
      )}
    </div>
  );
}