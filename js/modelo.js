/*
	var masterMind = function(){
		let coloresAleatorios = [];
		let iniciarJuego = function(){
			coloresAleatorios = [];
			for(let i = 0; i < 4; i++){
				//coloresAleatorios.push(arrayColores[Math.floor(Math.random() * (8))])
				//coloresAleatorios = ["amarillo", "marron", "azul", "azul"];
				coloresAleatorios = ["marron", "amarillo", "amarillo", "blanco"];
			}
		}
		let mostrar = function(){
			console.log(coloresAleatorios);
		}
		//cambiar mañana.
		let comprobarCoincidencia = function(){
			let negras = 0;
			let blancas = 0;
			let coloresAleatoriosCopia = coloresAleatorios.slice();
			//comprobar negras
			arrayCirculos.forEach(function(elemento, index){
				if(coloresAleatoriosCopia[index] === elemento){
					coloresAleatoriosCopia[index] = undefined;
					arrayCirculos[index] = "n";
					negras++;
				}
			});

			for(let i=0; i < 4; i++){
				if(coloresAleatoriosCopia.indexOf(arrayCirculos[i])!=-1){
					//sacamos la posicion del color. Tenía un bug en el que pasaba la i y no se incorporaba bien.
					let posicion = coloresAleatoriosCopia.indexOf(arrayCirculos[i]);
					coloresAleatoriosCopia[posicion] = undefined;
					blancas++;
				}
			}
			//guarda el valor total de las bolas negras que hay.
			return colocarPuntuacion(negras, blancas);
		}


		let comprobarJuego = function(index){
			if(arrayCirculos.indexOf(undefined) === -1){
				//comprueba si hay menos de 4 coincidencias
				if(comprobarCoincidencia() < 4){
					arrayCirculos = [undefined, undefined, undefined, undefined];
					bloquearFila();
					crearHijo();
				}else{//termina el juego
					terminado = true;
					return true;
				}
				return false;
			}
		}
		let reiniciarPartida = function(capaGris, ventanaModal){
			removeAllElements();
			init();
		}
		let init = function(){
			//creamos el primer hijo.
			crearHijo();
			//reiniciamos valores
			arrayCirculos = [undefined, undefined, undefined, undefined];
			terminado = false;
			return iniciarJuego();
		}
		return {
			init : init,
			comprobarJuego : comprobarJuego,
			reiniciarPartida : reiniciarPartida,
			mostrar : mostrar
		}
	}();
	//están los on ahí para separarlos de la vista. el closure es el modelo.
	let init = function(){
		tablero = $('#principalTablero');
		masterMind.init();
		$(".botonesColores").on("click", function(){
			dibujarCirculo($(this).attr("id"), $(this).attr("src"));
		});
		$("#compruebaPartida").on("click", function(){
			if(masterMind.comprobarJuego()){
				mostrarMsgVictoria();
			}
		});
	}
	$(init);
*/