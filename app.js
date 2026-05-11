
const toggleThemeBtn = document.getElementById('toggleThemeBtn');
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// --- Clase Usuario ---
class Usuario {
    constructor(rut, nombre, clave) {
        this._rut = rut;
        this._nombre = null;
        this._clave = null;

        this.nombre = nombre;
        this.clave = clave;
    }

    get rut() {
        return this._rut;
    }

    set rut(nuevoRut) {
        this._rut = nuevoRut;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(nuevoNombre) {
        if (nuevoNombre && typeof nuevoNombre === 'string' && nuevoNombre.trim().length > 0) {
            this._nombre = nuevoNombre.trim();
        } else {
            this._nombre = null;
            // console.error("ERROR: El nombre no debe estar vacío."); // Lo manejaremos en la interfaz
        }
    }

    get clave() {
        return this._clave;
    }

    set clave(nuevaClave) {
        if (nuevaClave && typeof nuevaClave === 'string' && nuevaClave.length === 4) {
            const soloDigitos = /^\d{4}$/.test(nuevaClave);
            if (soloDigitos) {
                this._clave = nuevaClave;
            } else {
                throw new Error("La clave debe contener solo números.");
                // console.error("ERROR: La clave debe contener solo números.");
            }
        } else {
            throw new Error("La clave debe ser de cuatro dígitos.");
            // console.error("ERROR: La clave debe tener exactamente cuatro dígitos.");
        }
    }

    //validar(rutIngresado, claveIngresada) {
      //  return this._rut === rutIngresado && this._clave === claveIngresada;
    //}

    toString() {
        return `Usuario{rut=${this._rut}, nombre=${this._nombre}`;
    }
}

// --- Clase Cuenta ---
class Cuenta {
    constructor(id, saldo, tipo, empresa, usuario) {
        this._id = id;
        this._saldo = saldo;
        this._tipo = null;
        this._empresa = empresa;
        this._usuario = null;

        this.tipo = tipo;
        this.usuario = usuario;
    }

    get id() {
        return this._id;
    }

    set id(nuevoId) {
        this._id = nuevoId;
    }

    get saldo() {
        return this._saldo;
    }

    set saldo(nuevoSaldo) {
        if (typeof nuevoSaldo === 'number' && nuevoSaldo >= 0) {
            this._saldo = nuevoSaldo;
        } else {
            this._saldo = 0;
            // console.error("ERROR: El saldo debe ser un número no negativo.");
        }
    }

    get tipo() {
        return this._tipo;
    }

    set tipo(nuevoTipo) {
        const tipoUpper = String(nuevoTipo).toUpperCase();
        if (tipoUpper === 'C' || tipoUpper === 'V') {
            this._tipo = tipoUpper;
        } else {
            throw new Error("Tipo de cuenta inválido. Debe ser 'C' o 'V'.");
            // console.warn(`ADVERTENCIA: Tipo de cuenta solo C/V. Asignado por defecto: ${this._tipo}`);
        }
    }

    get empresa() {
        return this._empresa;
    }

    set empresa(esEmpresa) {
        this._empresa = Boolean(esEmpresa);
    }

    get usuario() {
        return this._usuario;
    }

    set usuario(usuarioObj) {
        if (usuarioObj instanceof Usuario) {
            this._usuario = usuarioObj;
        } else {
            this._usuario = null;
            // console.error("ERROR: Se debe asignar un objeto Usuario válido a la cuenta.");
        }
    }

    listarDatos() {
        let tipoDisplay = "";
        if (this._tipo === 'V') {
            tipoDisplay = "CUENTA VISTA";
        } else if (this._tipo === 'C') {
            tipoDisplay = "CUENTA CORRIENTE";
        } else {
            tipoDisplay = "TIPO DESCONOCIDO";
        }

        const nombreUsuario = this._usuario ? this._usuario.nombre : "N/A";
        const rutUsuario = this._usuario ? this._usuario.rut : "N/A";

        return `
            DATOS CUENTA
            ------------------------------------
            ${nombreUsuario} ${rutUsuario} Saldo: ${this._saldo} Tipo: ${tipoDisplay}
            ##################################################
        `;
    }

    depositar(monto) {
        if (typeof monto === 'number' && monto > 0) {
            this._saldo += monto;
            return { success: true, newBalance: this._saldo, message: `Depósito exitoso. Nuevo saldo: ${this._saldo}` };
        } else {
            return { success: false, message: "El monto a depositar debe ser un número positivo." };
        }
    }

    retirar(monto) {
        if (typeof monto !== 'number' || monto <= 0) {
            return { success: false, message: "El monto a retirar debe ser un número positivo." };
        }

        const maxMontoGiro = this.maxGiro();

        if (monto > maxMontoGiro) {
            return { success: false, message: `Monto excede el límite de giro para este tipo de cuenta. Máximo permitido: ${maxMontoGiro}` };
        }

        if (monto > this._saldo) {
            return { success: false, message: `Saldo insuficiente. Saldo actual: ${this._saldo}` };
        }

        this._saldo -= monto;
        return { success: true, newBalance: this._saldo, message: `Retiro exitoso. Nuevo saldo: ${this._saldo}` };
    }

    maxGiro() {
        const limiteEmpresa = 1000000;
        const limitePersona = 200000;

        if (this._empresa) {
            return Math.min(this._saldo, limiteEmpresa);
        } else {
            return Math.min(this._saldo, limitePersona);
        }
    }

    toString() {
        return `Cuenta{id=${this._id}, saldo=${this._saldo}, tipo=${this._tipo}, empresa=${this._empresa}, usuario=${this._usuario ? this._usuario.toString() : 'N/A'}}`;
    }
}

// --- Simulación de un "Banco" para almacenar usuarios y cuentas (en memoria) ---
const banco = {
    usuarios: [],
    cuentas: [],

    agregarUsuario(usuario) {
        if (!(usuario instanceof Usuario)) {
            return { success: false, message: "Error: El objeto no es una instancia de Usuario." };
        }
        if (this.usuarios.some(u => u.rut === usuario.rut)) {
            return { success: false, message: `Error: Ya existe un usuario con el RUT: ${usuario.rut}` };
        }
        if (!usuario.nombre || !usuario.clave) {
             return { success: false, message: "Error: Usuario inválido. Verifique nombre y clave." };
        }
        this.usuarios.push(usuario);
        return { success: true, message: `Usuario "${usuario.nombre}" (${usuario.rut}) creado exitosamente.` };
    },

    agregarCuenta(cuenta) {
        if (!(cuenta instanceof Cuenta)) {
            return { success: false, message: "Error: El objeto no es una instancia de Cuenta." };
        }
        if (this.cuentas.some(c => c.id === cuenta.id)) {
            return { success: false, message: `Error: Ya existe una cuenta con el ID: ${cuenta.id}` };
        }
        if (!cuenta.usuario) {
            return { success: false, message: "Error: La cuenta debe estar asociada a un usuario válido." };
        }
        const usuarioExistente = this.usuarios.find(u => u.rut === cuenta.usuario.rut);
        if (!usuarioExistente) {
             return { success: false, message: `Error: El usuario asociado (${cuenta.usuario.rut}) no existe en el banco. Cree el usuario primero.` };
        }
        // Aseguramos que la cuenta se asocie al objeto de usuario existente en el banco
        cuenta.usuario = usuarioExistente;

        if (!cuenta.tipo || cuenta.saldo < 0) {
            return { success: false, message: "Error: Cuenta inválida. Verifique tipo y saldo." };
        }

        this.cuentas.push(cuenta);
        return { success: true, message: `Cuenta ID ${cuenta.id} creada exitosamente para ${cuenta.usuario.nombre}.` };
    },

    buscarUsuarioPorRut(rut) {
        return this.usuarios.find(u => u.rut === rut);
    },

    buscarCuentaPorId(id) {
        return this.cuentas.find(c => c.id === id);
    }
};

// --- Lógica de Interacción con la Interfaz (DOM) ---

// Función para mostrar mensajes en la interfaz
const messagesArea = document.getElementById('messages');
function displayMessage(message, type = 'info') { // type can be 'info', 'success', 'error'
    messagesArea.textContent = message;
    messagesArea.className = 'messages-area'; // Reset classes
    if (type === 'success') {
        messagesArea.classList.add('success');
    } else if (type === 'error') {
        messagesArea.classList.add('error');
    }
}

// --- Event Listeners para Usuarios ---
document.getElementById('createUserBtn').addEventListener('click', () => {
    const rut = document.getElementById('userRut').value.trim();
    const nombre = document.getElementById('userName').value.trim();
    const clave = document.getElementById('userClave').value.trim();

    const nuevoUsuario = new Usuario(rut, nombre, clave);
    const resultado = banco.agregarUsuario(nuevoUsuario);

    if (resultado.success) {
        displayMessage(resultado.message, 'success');
        // Limpiar campos
        document.getElementById('userRut').value = '';
        document.getElementById('userName').value = '';
        document.getElementById('userClave').value = '';
    } else {
        displayMessage(resultado.message, 'error');
    }
});

// --- Event Listeners para Cuentas ---
document.getElementById('createAccountBtn').addEventListener('click', () => {
    const id = parseInt(document.getElementById('cuentaId').value);
    const saldoInicial = parseInt(document.getElementById('cuentaSaldoInicial').value);
    const tipo = document.getElementById('cuentaTipo').value;
    const esEmpresa = document.getElementById('cuentaEsEmpresa').checked;
    const usuarioRut = document.getElementById('cuentaUsuarioRut').value.trim();

    // Buscar el usuario existente por RUT
    const usuarioAsociado = banco.buscarUsuarioPorRut(usuarioRut);

    if (!usuarioAsociado) {
        displayMessage(`Error: No se encontró un usuario con el RUT "${usuarioRut}". Cree el usuario primero.`, 'error');
        return;
    }

    const nuevaCuenta = new Cuenta(id, saldoInicial, tipo, esEmpresa, usuarioAsociado);
    const resultado = banco.agregarCuenta(nuevaCuenta);

    if (resultado.success) {
        displayMessage(resultado.message, 'success');
        // Limpiar campos
        document.getElementById('cuentaId').value = '';
        document.getElementById('cuentaSaldoInicial').value = '0';
        document.getElementById('cuentaUsuarioRut').value = '';
        document.getElementById('cuentaEsEmpresa').checked = false; // Desmarcar
    } else {
        displayMessage(resultado.message, 'error');
    }
});

// --- Event Listeners para Operaciones de Cuenta ---
const operacionResultadoDiv = document.getElementById('operacionResultado');

document.getElementById('depositBtn').addEventListener('click', () => {
    const idCuenta = parseInt(document.getElementById('operacionCuentaId').value);
    const monto = parseInt(document.getElementById('operacionMonto').value);

    const cuenta = banco.buscarCuentaPorId(idCuenta);
    if (!cuenta) {
        displayMessage(`Error: Cuenta ID ${idCuenta} no encontrada.`, 'error');
        return;
    }

    const resultado = cuenta.depositar(monto);
    if (resultado.success) {
        displayMessage(resultado.message, 'success');
        operacionResultadoDiv.textContent = `Saldo actual: ${cuenta.saldo}`;
    } else {
        displayMessage(resultado.message, 'error');
        operacionResultadoDiv.textContent = '';
    }
});

document.getElementById('withdrawBtn').addEventListener('click', () => {
    const idCuenta = parseInt(document.getElementById('operacionCuentaId').value);
    const monto = parseInt(document.getElementById('operacionMonto').value);

    const cuenta = banco.buscarCuentaPorId(idCuenta);
    if (!cuenta) {
        displayMessage(`Error: Cuenta ID ${idCuenta} no encontrada.`, 'error');
        return;
    }

    const resultado = cuenta.retirar(monto);
    if (resultado.success) {
        displayMessage(resultado.message, 'success');
        operacionResultadoDiv.textContent = `Saldo actual: ${cuenta.saldo}`;
    } else {
        displayMessage(resultado.message, 'error');
        operacionResultadoDiv.textContent = '';
    }
});

document.getElementById('showAccountDataBtn').addEventListener('click', () => {
    const idCuenta = parseInt(document.getElementById('operacionCuentaId').value);
    const cuenta = banco.buscarCuentaPorId(idCuenta);

    if (cuenta) {
        operacionResultadoDiv.textContent = cuenta.listarDatos();
        displayMessage(`Datos de cuenta ID ${idCuenta} mostrados.`, 'info');
    } else {
        displayMessage(`Error: Cuenta ID ${idCuenta} no encontrada.`, 'error');
        operacionResultadoDiv.textContent = '';
    }
});

document.getElementById('maxGiroBtn').addEventListener('click', () => {
    const idCuenta = parseInt(document.getElementById('operacionCuentaId').value);
    const cuenta = banco.buscarCuentaPorId(idCuenta);

    if (cuenta) {
        const maxGiro = cuenta.maxGiro();
        operacionResultadoDiv.textContent = `Máximo monto a girar para cuenta ID ${idCuenta}: $${maxGiro}`;
        displayMessage(`Máximo giro calculado para cuenta ID ${idCuenta}.`, 'info');
    } else {
        displayMessage(`Error: Cuenta ID ${idCuenta} no encontrada.`, 'error');
        operacionResultadoDiv.textContent = '';
    }
});

// --- Event Listener para Validar Usuario ---
document.getElementById('validateUser Btn').addEventListener('click', () => {
    const rut = document.getElementById('validarUser Rut').value.trim();
    const clave = document.getElementById('validarUser Clave').value.trim();

    const usuario = banco.buscarUsuarioPorRut(rut);

    if (!usuario) {
        displayMessage(`Error: Usuario con RUT "${rut}" no encontrado.`, 'error');
        return;
    }

    const esValido = usuario.clave === clave;

    if (esValido) {
        displayMessage(`Bienvenido ${usuario.nombre}.`, 'success');
    } else {
        displayMessage(`Credenciales INCORRECTAS para el usuario ${usuario.nombre}.`, 'error');
    }
});

// Opcional: Ejemplo de inicialización o precarga de datos al cargar la página
window.onload = () => {
    // Puedes precargar algunos datos para probar
    const usuDemo = new Usuario("111-1", "Alonso Cuevas", "0123");
    banco.agregarUsuario(usuDemo); // Esto mostrará un mensaje de éxito en la consola si el nombre y clave son válidos.

    const cuentaDemo1 = new Cuenta(1001, 75000, 'V', false, usuDemo); // Cuenta Vista, Persona
    banco.agregarCuenta(cuentaDemo1);

    const cuentaDemo2 = new Cuenta(20001, 250000, 'C', true, usuDemo); // Cuenta Corriente, Empresa
    banco.agregarCuenta(cuentaDemo2);

    displayMessage("Sistema cargado. ¡Bienvenido!", 'info');
    console.log("Usuarios en el banco:", banco.usuarios);
    console.log("Cuentas en el banco:", banco.cuentas);
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("menu.html")
    .then(response => response.text())
    .then(html => {
      document.getElementById("menuContainer").innerHTML = html;

      // Esperamos un poco para asegurar que los elementos del menú ya están en el DOM
      setTimeout(() => {
        const sidebar = document.getElementById("sidebar");
        const toggleBtn = document.getElementById("toggleSidebarBtn");

        if (sidebar && toggleBtn) {
          toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("expanded");
          });
        } else {
          console.error("No se encontraron los elementos necesarios.");
        }
      }, 300);
    })
    .catch(error => console.error("Error al cargar el menú: ", error));
});


