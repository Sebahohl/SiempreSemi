

let nombre = prompt ("Ingresa tu nombre ")
alert("Bienvenida/o a siempre semi "+nombre );
alert("Siempre semi es mi emprendimiento, es mi pasión hacer uñas y espero que te gusten mis servicios :D");



let unias = prompt ("Ingrese el tipo de uñas que desea realizarse (Kapping - Esculpidas - Esmaltado semipermanente)");

if ((unias == "Kapping")||(unias== "kapping")){
    alert("El precio de las uñas kapping es $800");
}else if((unias == "Esculpidas")|| (unias== "esculpidas")){
    alert("El precio de las Esculpidas es de $1200");
}else if ((unias == "Esmaltado Semipermanente")|| (unias== "esmaltado semipermanente")){
    alert("El precio de las esmaltado semipermanente es de $700");
    unias=prompt("Ingresa el tipo de uñas que desea (s para salir)");
}


