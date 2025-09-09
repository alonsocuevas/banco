# BancoApp – Banco de la Esquina

[![Estado](https://img.shields.io/badge/estado-%20concluido-yellow)](#) [![Licencia](https://img.shields.io/badge/licencia-MIT-blue)](#LICENSE) [![Stack](https://img.shields.io/badge/stack-HTML%2C%20CSS%2C%20JS-orange)](#)

Aplicación web simulada para gestión de usuarios y cuentas bancarias. Permite crear usuarios y cuentas, validar credenciales, realizar depósitos y retiros, mostrar datos y calcular el máximo giro según tipo de cuenta.

---

##  Estado del Proyecto

-  Funcionalidad básica implementada  
-  Mejores: persistencia, tests, autenticación segura

---

## 🎯 Funcionalidades

- Crear usuarios (RUT, nombre, clave de 4 dígitos)  
- Crear cuentas (ID, saldo, tipo: Vista (V) o Corriente (C), empresa o persona)  
- Validaciones:  
  - Nombre no vacío  
  - Clave numérica de 4 dígitos (puede comenzar con 0)  
  - Tipo válido (V o C)  
- Operaciones disponibles:  
  - Depósito  
  - Retiro con límites:  
    - Empresa: hasta $1 000 000 si hay saldo  
    - Persona: hasta $200 000 si hay saldo  
  - Mostrar datos de cuenta  
  - Calcular máximo giro permitido

---

##  Demo en línea

Disponible en GitHub Pages:  
https://alonsocuevas.github.io/banco/appbanco/index.html

---

##  Instalación y Uso

1. Clona el repositorio:  
   ```bash
   git clone https://github.com/alonsocuevas/banco.git
   cd banco/appbanco

Abre index.html en un navegador o sube carpeta a GitHub Pages.

Interactúa con la interfaz:

Crear usuario

Crear cuenta

Validar usuario (ruta: RUT + clave 0123)

Depositar, retirar, mostrar datos, máximo giro

Tecnologías

HTML5

CSS3

JavaScript (ES6)

Tema claro/oscuro con CSS custom properties

Prueba incorporada

RUT: 111-1

Clave: 0123

Mejoras sugeridas

Uso de localStorage o BD para persistencia

Tests unitarios (ej. Jest)

Autenticación más segura (hashing de claves)

CI/CD y depuración en consola

Autor

Alonso Cuevas Pizarro — GitHub
