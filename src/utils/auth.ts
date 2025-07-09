// src/utils/auth.ts
import { User } from "../types/Usuario";

// Guardar el usuario en localStorage
export function saveUserToLocalStorage(user: User) {
  localStorage.setItem("usuario", JSON.stringify(user));
}

// Obtener el usuario desde localStorage
export function getUserFromLocalStorage() {
  const user = localStorage.getItem("usuario");
  return user ? JSON.parse(user) : null;
}

// Eliminar el usuario de localStorage
export function removeUserFromLocalStorage() {
  localStorage.removeItem("usuario");
}