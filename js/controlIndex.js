{
	//Rafael Carmona Arrabal. JS de control MasterMind.
	let jugar = function(){
		window.close();
		window.open("masterMind.html");
	}

	let salir = function(){
		window.close();
	}

	let init = function(){
		botonJugar = document.getElementById("jugar");
		botonSalir = document.getElementById("salir");		
		//iniciamos el juego
		botonJugar.addEventListener("click", jugar);
		botonSalir.addEventListener("click", salir);
	}
	window.onload = init;
}
