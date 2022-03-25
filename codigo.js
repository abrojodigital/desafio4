/*
    clase Vehiculo
    Atributos:
        ruedas
        puertas
        carroceria : chica, mediana o grande
        modelo : moto, auto, camioneta
        marcaDestino : Ford, Fiat, BW, Audi
        velocidad : arranca en 0
        motorEncendido : false
        lucesPremdidas : false
*/
class Vehiculo {
    constructor(ruedas, puertas, carroceria, modelo, marcaDestino) {
        this.ruedas = ruedas;
        this.puertas = puertas;
        this.carroceria = carroceria;
        this.modelo = modelo;
        this.marcaDestino = marcaDestino;
        this.velocidad = 0;
        this.motorEncendido = false;
        this.lucesPrendidas = false;
        this.apto = false;
    }
    get costoPatente() {
        switch (this.carroceria) {
            case "chica":
                return 5000;
            case "mediana":
                return 85000;
            case "grande":
                return 180000;
            default:
                return 0;
        }
    }

    get costoFabricacion() {
        let costoBase = 50000
        switch (this.carroceria) {
            case "chica":
                return (costoBase * 2) + this.costoPatente;
            case "mediana":
                return (costoBase ** 2) + this.costoPatente;
            case "grande":
                return (costoBase ** 2) * 5 + this.costoPatente;
            default:
                return 0;
        }
    }

    set costoFabricacion(costoFabricacion) {
        this.costoFabricacion = costoFabricacion;
    }

    verificarApto() {
        let apto = 0;

        this.encenderMotor();
        apto += this.motorEncendido ? 1 : 0;
        this.moverAuto();
        if (this.velocidad === 50) apto += 1;
        this.accionarBocina();
        if (this.accionarBocina === "TU TUUU; TU TUUUU!") apto += 1;
        this.prenderLuces();
        apto += this.lucesPrendidas ? 1 : 0;
        this.frenarAuto();
        if (this.velocidad === 0) apto += 1;
        this.apagarLuces();
        apto += this.lucesPrendidas ? 0 : 1;
        this.apagarMotor();
        apto += this.motorEncendido ? 0 : 1;
        if (apto === 6) {
            this.apto = true;
        } else {
            this.apto = false;
        }
    }

    encenderMotor() {
        this.motorEncendido = true;
    }
    apagarMotor() {
        this.motorEncendido = false;
    }

    moverAuto() {
        if (this.motorEncendido) {
            while (this.velocidad >= 0 && this.velocidad < 50) {
                this.velocidad++;
            }
            console.log(this.velocidad);
            return true;
        } else {
            console.log("El motor no esta encendido");
            return false;
        }
    }

    frenarAuto() {
        if (this.motorEncendido) {
            while (this.velocidad > 0) {
                this.velocidad -= 1;
            }
            return true;
        } else {
            console.log("El motor no esta encendido");
            return false;
        }
    }

    prenderLuces() {
        this.lucesPrendidas = true;
    }
    apagarLuces() {
        this.lucesPrendidas = false;
    }

    accionarBocina() {
        if (this.motorEncendido) {
            console.log("Esta sonando la bocina");
            return ("TU TUUU; TU TUUUU!")
        } else {
            console.log("El motor no esta encendido");
            return "El motor no esta encendido";

        }
    }
}

/*
    clase VehiculoAltaGama
    Atributos:
        techoCorredizo
        asientosReforzados
        patente sale 70000 mas sobre patente de vehiculo grande
*/

class VehiculoAltaGama extends Vehiculo {
    constructor(ruedas, puertas, carroceria, modelo, marcaDestino) {
        super(ruedas, puertas, carroceria, modelo, marcaDestino);
        this.techoCorredizo = true;
        this.asientosReforzados = true;
    }

    get costoPatente() {
        return 180000 + 70000;
    }
    get costoFabricacion() {
        let costoBase = 50000
        return (costoBase ** 2) * 5 + this.costoPatente;
    }
}

const tabla = document.querySelector('#tabla-autos tbody');

const crearTBody = (vehiculos) => {
    tabla.innerHTML = "";

    for (let index = 0; index < vehiculos.length; index++) {
        const fila = document.createElement('tr');
        fila.innerHTML += `
            <td>${index+1}</td>
            <td>${vehiculos[index].ruedas}</td>
            <td>${vehiculos[index].modelo}</td>
            <td>${vehiculos[index].marcaDestino}</td>
            <td>${vehiculos[index].carroceria}</td>
            <td>
                <input type="button" class="btn btn-primary col-auto" value="Testear" onclick="testearVehiculo(${index})" data-bs-toggle="modal"
                data-bs-target="#modal-test-vehiculo"></input>
            </td>
            `
        tabla.appendChild(fila);
    }
}

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Crear diez vehículos aleatorios
const crearDiezVehiculos = () => {
    let vehiculos = [];
    for (let i = 0; i < 10; i++) {
        let marcaDestino = ["Ford", "Fiat", "BW", "Audi"][randomInt(0, 3)];
        let ruedas = randomInt(2, 5);
        if (ruedas === 2) {
            let modelo = "moto";
            let puertas = 0;
            let carroceria = "chica";
            vehiculos.push(new Vehiculo(ruedas, puertas, carroceria, modelo, marcaDestino));
        } else {
            let puertas = randomInt(2, 5);
            let carroceria = ["chica", "mediana", "grande"][randomInt(0, 2)];
            let modelo = ["auto", "camioneta"][randomInt(0, 1)];
            if (randomInt(0, 1) === 0) {
                // vehículo común
                vehiculos.push(new Vehiculo(ruedas, puertas, carroceria, modelo, marcaDestino));
            } else {
                vehiculos.push(new VehiculoAltaGama(ruedas, puertas, carroceria, modelo, marcaDestino));
            }
        }
    }
    return vehiculos;
}

const testearVehiculo = (indiceVehiculo) => {
    vehiculos[indiceVehiculo].verificarApto();
    if (vehiculos[indiceVehiculo].apto) {
        alert("El vehículo es apto");
    } else {
        alert("El vehículo no es apto");
    }
}

const verificarAptoVehiculos = () => {
    if (vehiculos.length > 0) {
        const vehiculosNoAptos = vehiculos.reduce((acc, vehiculo) => {
            vehiculo.verificarApto();
            if (!vehiculo.apto) {
                acc.push(vehiculo);
            }
            return acc;
        }, []);
        if (vehiculosNoAptos.length > 0) {
            alert(`Los siguientes vehículos no son aptos: ${vehiculosNoAptos.map(vehiculo => vehiculo.modelo).join(', ')}`);
        } else {
            alert("Todos los vehículos son aptos");
        }
    } else {
        alert("No hay vehículos para verificar");
    }
}

const generarVehiculos = () => {
    vehiculos = crearDiezVehiculos();
    crearTBody(vehiculos);
}

let vehiculos = [];    // array de vehículos

// Interactuando con el DOM
const modelo = document.getElementById('modelo');
const marcaDestino = document.getElementById('marca-destino');
const carroceria = document.getElementById('carroceria');
const ruedas = document.getElementById('ruedas');
const puertas = document.getElementById('puertas');
const vehiculoAltaGama = document.getElementById('vehiculo-alta-gama');
const modalVehiculo = document.getElementById('modal-vehiculo');

// Eventos
modelo.addEventListener('change', () => {
    if (modelo.value === "moto") {
        ruedas.value = 2;
        puertas.value = 0;
        carroceria.value = "chica";
        ruedas.setAttribute('disabled', true);
        puertas.setAttribute('disabled', true);
        carroceria.setAttribute('disabled', true);
        vehiculoAltaGama.checked = false;
        vehiculoAltaGama.setAttribute('disabled', true);
    } else {
        puertas.value = randomInt(2, 5);
        ruedas.value = randomInt(4, 5);
        ruedas.removeAttribute('disabled');
        puertas.removeAttribute('disabled');
        carroceria.removeAttribute('disabled');
        vehiculoAltaGama.removeAttribute('disabled');
    }
})

vehiculoAltaGama.addEventListener('change', () => {
    if (vehiculoAltaGama.checked) {
        carroceria.value = "grande";
    } else {
        carroceria.value = "chica";
    }
})

const agregarVehiculo = () => {
    if (modelo.value === "moto") {
        vehiculos.push(new Vehiculo(ruedas.value, puertas.value, carroceria.value, modelo.value, marcaDestino.value));
    } else {
        if (vehiculoAltaGama.checked) {
            vehiculos.push(new VehiculoAltaGama(ruedas.value, puertas.value, carroceria.value, modelo.value, marcaDestino.value));
        } else {
            vehiculos.push(new Vehiculo(ruedas.value, puertas.value, carroceria.value, modelo.value, marcaDestino.value));
        }
    }
    crearTBody(vehiculos);
}
