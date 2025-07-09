// import { useState } from "react";
import {
    User, Menu, LogOut, ClipboardPen, Drum, Building,
    School, Shapes, CalendarDays, BookText, GraduationCap, House, CalendarRange
} from "lucide-react";
import "../styles/components/Sidebar.css"
import { useNavigate } from "react-router-dom";
import React from 'react';

type SidebarProps = {
    collapsed: boolean;
    setCollapsed: (val: boolean) => void;
    selectedIconPage?: string;
    selectedSidebarNav: string;
};

const navItemsAdmin = [
    { label: "Home", icon: <House size={20} />, path: "/administrador" },
    { label: "Alumno", icon: <User size={20} />, path: "/administrador/alumno" },
    { label: "Profesor", icon: <GraduationCap size={20} />, path: "/administrador/profesor" },
    { label: "Asignatura", icon: <ClipboardPen size={20} />, path: "/administrador/asignatura" },
    { label: "Instrumento", icon: <Drum size={20} />, path: "/administrador/instrumento" },
    { label: "Edificio", icon: <Building size={20} />, path: "/administrador/edificio" },
    { label: "Aula", icon: <School size={20} />, path: "/administrador/aula" },
    { label: "Clase", icon: <BookText size={20} />, path: "/administrador/clase" },
    { label: "Pensul", icon: <Shapes size={20} />, path: "/administrador/pensul" },
    { label: "Horario", icon: <CalendarDays size={20} />, path: "/administrador/horario" },
    { label: "Salir", icon: <LogOut size={20} />, path: "/login" },
];

const navItemsAlumno = [
    { label: "Home", icon: <House size={20} />, path: "/alumno" },
    { label: "Pensul", icon: <User size={20} />, path: "/alumno/pensul" }, 
    { label: "Horario", icon: <CalendarRange size={20} />, path: "/alumno/horario" },
    { label: "Salir", icon: <LogOut size={20} />, path: "/login" },  
];

const navItemsProfesor = [
    { label: "Home", icon: <House size={20} />, path: "/profesor" },
    { label: "Estudiantes", icon: <User size={20} />, path: "/profesor/estudiantes" }, 
    { label: "Horario", icon: <CalendarRange size={20} />, path: "/profesor/horario" },
    { label: "Salir", icon: <LogOut size={20} />, path: "/login" },  
];

const optionsNav = {
    "Administrador": navItemsAdmin,
    "Alumno": navItemsAlumno,
    "Profesor": navItemsProfesor
}

const Sidebar = ({ collapsed, setCollapsed, selectedIconPage, selectedSidebarNav }: SidebarProps) => {

    const navigate = useNavigate();

    return (
        <>
            <img
                src="/logo-sena-negro.png"
                alt="Logo"
                className="sidebar-logo"
            />

            <div className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}>

                <div className="sidebar-header">
                    <button className="hamburguer-button" onClick={() => setCollapsed(!collapsed)}>
                        {!collapsed && <span>Menú</span>}
                        <Menu size={20} />
                    </button>
                </div>

                <div className="sidebar-nav">
                    {optionsNav[selectedSidebarNav].map((item) => (
                        <div key={item.label} className={`sidebar-item ${selectedIconPage == item.label && "selectedSection"}`}
                            onClick={() => navigate(item.path)}
                            style={{ cursor: "pointer" }}>
                            {item.icon}
                            {!collapsed && <span className="sidebar-label">{item.label}</span>}
                        </div>
                    ))}
                </div>


                <div className="">
                    {/* <div className="geometric-shape shape-bar-1"></div> */}
                    <div className={`geometric-shape ${collapsed ? "shape-bar-2-expanded" : "shape-bar-2"}`}></div>
                    <div className={`geometric-shape ${collapsed ? "shape-bar-3-expanded" : "shape-bar-3"}`}></div>
                    <div className={`geometric-shape ${collapsed ? "shape-bar-4-expanded" : "shape-bar-4"}`}></div>
                </div>


            </div>
        </>
    );
};

export default Sidebar;
