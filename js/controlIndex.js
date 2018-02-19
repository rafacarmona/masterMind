{
	//Rafael Carmona Arrabal. JS de control MasterMind.
	let jugar = function(){
		window.open("masterMind.html");
		this.close();
	}

	let salir = function(){
		this.close();
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
