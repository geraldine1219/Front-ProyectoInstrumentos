export interface Cell {
  day: string;
  hour: string;
}

export interface HorarioAlumno {
  "idHorario": string;
  "dia": string;
  "hour": string;
  "nombreAsignatura": string;
  "horasRequeridas": number,
  "nombreProfesor": string;
  "apellidoProfesor": string;
  "emailProfesor": string;
  "telefonoContactoProfesor": string;
  "especialidadProfesor": string;
  "direccion": string;
  "disponibilidadOrdenador":boolean,
  "nombreAula":string,
  "tipo": string
}
export interface HorarioProfesor {
  "idProfesor": string;
  "dia": string;
  "hour": string;
  "nombreAsignatura": string;
  "horasRequeridas": number,
  "nombreProfesor": string;
  "apellidoProfesor": string;
  "emailProfesor": string;
  "telefonoContactoProfesor": string;
  "especialidadProfesor": string;
  "direccion": string;
  "disponibilidadOrdenador":boolean,
  "nombreAula":string,
  "tipo": string
}