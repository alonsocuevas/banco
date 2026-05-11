# 🏦 BancoApp — Banco de la Esquina

Aplicación web desarrollada para simular la gestión de usuarios y cuentas bancarias de un banco ficticio. El sistema permite registrar usuarios, crear cuentas bancarias, validar credenciales y realizar operaciones financieras básicas como depósitos y retiros, aplicando reglas de negocio específicas según el tipo de cliente.

# 📸 Vista General

BancoApp replica operaciones esenciales de una plataforma bancaria básica utilizando programación orientada a objetos con JavaScript.

El proyecto implementa:

- Gestión de usuarios y cuentas
- Validaciones de seguridad y datos
- Operaciones bancarias
- Lógica de negocio personalizada
- Interfaz moderna con modo oscuro/claro
- Diseño responsive
---
# 🚀 Demo en Línea

Disponible en GitHub Pages:

🔗 https://alonsocuevas.github.io/banco/
---

# 🎯 Funcionalidades
👤 Gestión de Usuarios
- Registro de usuarios mediante:
    - RUT
    - Nombre
    - Clave numérica de 4 dígitos
- Validaciones:
    - Nombre obligatorio
    - Clave solo numérica
    - Clave exactamente de 4 dígitos
    - Permite claves que comienzan con cero
---
# 💳 Gestión de Cuentas
- Creación de cuentas bancarias con:
    - ID único
    - Saldo inicial
    - Tipo de cuenta:
        - Cuenta Vista
        - Cuenta Corriente
    - Cuenta Empresa o Persona
    - Asociación a usuario existente
- Validación automática de:
    - Tipo de cuenta válido
    - Usuario asociado existente
    - IDs duplicados
---
# 💰 Operaciones Bancarias
### Depósitos
- Incremento de saldo
- Validación de montos positivos
- Actualización inmediata del balance

### Retiros
Aplicación de límites según tipo de cuenta:
|Tipo de Cuenta|Limite Maximo
|---|---|
|Persona|$200.000|
|Empresa|$1.000.000|

Además:

- Verifica saldo suficiente
- Bloquea montos inválidos
- Muestra mensajes dinámicos
---
# 🔐 Validación de Usuarios

Sistema de autenticación simple mediante:

- RUT
- Clave de 4 dígitos

Usuario de prueba incluido:
```txt
RUT: 111-1
Clave: 0123
```
---
# 🌗 Interfaz Moderna
- Tema oscuro/claro dinámico
- Diseño responsive
- Cards organizadas
- Mensajes visuales de éxito/error
- Fondo personalizado
- Integración de menú lateral dinámico
- Botón directo al portafolio y GitHub
---
# 🧠 Reglas de Negocio Implementadas

El sistema aplica las siguientes reglas:

- El nombre del usuario no puede estar vacío
- El tipo de cuenta solo puede ser:
    - Corriente (C)
    - Vista (V)
- La clave debe:
    - Ser numérica
    - Tener exactamente 4 dígitos
- Validación de existencia de usuario antes de crear cuenta
- Restricción de retiros:
    - Empresas → hasta $1.000.000
    - Personas → hasta $200.000
- No permite giros mayores al saldo disponible
---
# 🛠️ Tecnologías Utilizadas
- HTML5
- CSS3
- JavaScript ES6
- Programación Orientada a Objetos (POO)
- DOM Manipulation
- CSS Variables
- Responsive Design
---
# 📂 Estructura del Proyecto
```txt
banco/
├── img/
├── app.js
├── app2.js
├── index.html
├── README.md
└── style.css
```
---
# ⚙️ Instalación y Uso
### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/alonsocuevas/banco.git
```
### 2️⃣ Entrar al proyecto
```bash
cd banco/appbanco
```
### 3️⃣ Ejecutar
Abrir index.html en cualquier navegador moderno.

---
# 🧪 Funcionalidades Disponibles
### Crear Usuario

Permite registrar nuevos usuarios con validación automática.

### Crear Cuenta

Asocia cuentas bancarias a usuarios existentes.

### Validar Usuario

Comprueba credenciales mediante RUT y clave.

### Depositar

Añade dinero a una cuenta existente.

### Retirar

Permite realizar giros aplicando restricciones de negocio.

### Mostrar Datos

Visualiza información completa de la cuenta.

### Máximo Giro

Calcula automáticamente el monto máximo permitido según:

- saldo disponible
- tipo de cliente
---
# 🧩 Arquitectura del Proyecto

El sistema utiliza:

### Clase Usuario
Gestiona:
- RUT
- nombre
- clave
- validaciones

### Clase Cuenta
Gestiona:
- saldo
- tipo de cuenta
- operaciones financieras
- límites de giro

### Objeto banco
Actúa como almacenamiento temporal en memoria para:
- usuarios
- cuentas
- búsquedas
- validaciones
---
# 📱 Responsive Design

La aplicación se adapta a:

- Computadores
- Tablets
- Smartphones
---
# 🔒 Validaciones Implementadas

✔ Nombre obligatorio

✔ Clave numérica válida

✔ Clave de 4 dígitos

✔ Tipo de cuenta válido

✔ Saldo no negativo

✔ Usuario existente antes de asociar cuenta

✔ Restricción de retiros según perfil

---

# 📈 Posibles Mejoras Futuras
- Persistencia con LocalStorage
- Base de datos real
- Backend con Node.js o Java
- Hashing de contraseñas
- JWT/Auth real
- Historial de transacciones
- Transferencias entre cuentas
- Dashboard administrativo
- Tests automatizados
- API REST
- Deploy fullstack
---
# 👨‍💻 Autor
### Alonso Cuevas Pizarro

# 📄 Licencia

Este proyecto está bajo licencia MIT. Puedes utilizarlo, modificarlo y distribuirlo libremente.