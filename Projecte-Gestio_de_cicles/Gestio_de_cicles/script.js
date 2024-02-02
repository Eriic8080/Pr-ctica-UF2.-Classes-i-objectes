let llistatCicles = [];

document.getElementById("btnAfegirCicle").addEventListener("click", afegirCicle);
document.getElementById("btnAfegirModul").addEventListener("click", afegirModul);


class Cicle {
    constructor(nom, categoria, numAlumnes, abreviatura) {
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.numEdicions = 0;  
        this.ultimaEdicio = null;
        this.modulos = [];
    }

    // Aqui creo un metodo para poder incrementar numEdicion
    setNumEdicions() {
        this.numEdicions += 1;
    }
    //Aqui creo un metodo que me guarda la fecha de la ultima edicion
    actualitzarUltimaEdicio() {
        this.ultimaEdicio = new Date(); 
    }
    afegirModul(modul) {
        this.modulos.push(modul);
    }

}
class Modul {
    constructor( cicle,nom, num, hores) {
        this.cicle = cicle;
        this.nom = nom;
        this.num = num;
        this.hores = hores;
    }
}


function calculHores(index) {
    const cicle = llistatCicles[index];
    if (cicle.modulos && cicle.modulos.length > 0) {
        let contadorHoras = 0;
        cicle.modulos.forEach(item => {
            contadorHoras += parseInt(item.hores);
        });

        alert(contadorHoras+" Hores");
    } else {
        console.log("El ciclo no tiene módulos.");
    }
}


function afegirCicle(){
    let nom = document.getElementById("cicle_nom").value;
    let categoria = document.getElementById("cicle_categoria").value;
    let numAlumnes = document.getElementById("cicle_alumnes").value;
    let abreviatura = document.getElementById("cicle_abr").value;

    //Si el valor de editCicle es -1 entra en el if y crea un ciclo nuevo
    if(document.getElementById("editCicle").value === "-1"){
        let cicle = new Cicle(nom, categoria, numAlumnes, abreviatura);
        console.log(cicle);
        //Afegim el cicle al llistat
        llistatCicles.push(cicle);

    }else{
        //Si el valor de editCicle no es igual a -1 entra en el else
        
        //Creo una variable para guardar el valor que tiene la id de editCicle
        let editar = document.getElementById("editCicle").value;
        //Aqui convierto el valor a un numero ya que viene un String
        let cicle = parseInt(editar);
                    
        // Edito cada propiedad llistatCicles con las del objeto de posicion de ciclo recibido de la funcion editCicle()
        llistatCicles[cicle].nom = nom;
        llistatCicles[cicle].categoria = categoria;
        llistatCicles[cicle].numAlumnes = numAlumnes;
        llistatCicles[cicle].abreviatura = abreviatura

        //Aqui llamo al metodo setNumEdicions para que me incremente 1 en el ciclo editado
        llistatCicles[cicle].setNumEdicions()

        //Aqui llamo al metodo actualitzarUltimaEdicio para que me guarde la fecha actual de la ultima edicion del ciclo editado
        llistatCicles[cicle].actualitzarUltimaEdicio();

        console.log(llistatCicles[cicle]);


    }
    
    //Actualitzem el selector
    actualitzarSelector();

    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();

    //Vuelvo a poner el valor de editCicle en -1
    document.getElementById("editCicle").value=-1;
}

function afegirModul(){
    let cicleIndex = document.getElementById("modul_cicle").value; 
    let cicle = llistatCicles[cicleIndex]; 

    let modul_nom = document.getElementById("modul_nom").value;
    let modul_num = document.getElementById("modul_num").value;
    let modul_hores = document.getElementById("modul_hores").value;

    let modul = new Modul(cicle, modul_nom,modul_num, modul_hores);
    cicle.modulos.push(modul)

    console.log(modul);


    //Printem la llista
    printLlistat(llistatCicles);
    actualitzarSelector();


    //Netegem els formularis
    netejarFormularis();
}

//Funció per llistar els cicles
function printLlistat(llistat) {
    let str = "";
    llistat.forEach(function (element, index) {
        str += `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${element.abreviatura.toUpperCase()}. ${element.nom}</h5>
                    <h6 class="text-gray-700">${element.categoria}</h6>
                    <p class="font-normal text-gray-700">Num d'alumnes: ${element.numAlumnes}</p>

                    <button id="btnEliminar_${index}" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
                    <button id="btnEditar_${index}" type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                    <button id="btnCalculHores_${index}" type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>
                </div>`;
    });

    document.getElementById("llistat").innerHTML = str;

    // Aqui voy agregando eventos a los botones anteriormente creados pasando-les sus identificadores unicos
    llistat.forEach(function (element, index) {
        document.getElementById(`btnEliminar_${index}`).addEventListener('click', function () {
            removeCicle(index);
        });

        document.getElementById(`btnEditar_${index}`).addEventListener('click', function () {
            editCicle(index);
        });

        document.getElementById(`btnCalculHores_${index}`).addEventListener('click', function () {
            calculHores(index);
        });
    });
}


//Funció per actualitzar el selector de cicles cada vegada que afegim un cicle
function actualitzarSelector(){
    let select = document.getElementById('modul_cicle');
    select.innerHTML = "";
    llistatCicles.forEach(function(element, index){
        let opt = document.createElement('option');
        opt.value = index;
        opt.text = element.nom;
        select.appendChild(opt);
    });
}

// Función para eliminar un cicle
function removeCicle(i) {
    // Con el findIndex voy buscando por todas las posiciones del array para buscar el que se ha clicado para borrar-lo
    const eliminar = llistatCicles.findIndex((element, index) => index === i);

    //Si NO se encuentra findIndex devuelve -1 pero si la encuentra entran en el if 
    if (eliminar !== -1) {
        // Aqui con el splice indico que del array llistatCicles se tiene que eliminiar 1 elemento de la posicion eliminar
        llistatCicles.splice(eliminar, 1);
    }

    // Vuelvo a mostrar los ciclos con los cambios realizados
    printLlistat(llistatCicles);
}


//Funció per editar un cicle
function editCicle(i){
    document.getElementById("cicle_nom").value = llistatCicles[i].nom;
    document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
    document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
    document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;

    document.getElementById("editCicle").value=i;
}

//Funció per netejar els formularis
function netejarFormularis(){
    var inputs = document.getElementsByTagName("input");
    for (let i=0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    var selects = document.getElementsByTagName("select");
    for (let i=0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}