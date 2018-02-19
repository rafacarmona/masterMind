{
	//en total creo que hay 3 bucles, que son para recorrer negras y blancas.
	let arrayColores = ["rojo", "amarillo", "verde", "naranja", "azul", "blanco", "marron", "negro"];
	let tablero;
	let arrayCirculos = [undefined, undefined, undefined, undefined];
	let terminado = false;
	//funciones.
	let dibujarCirculo = function(color, img){
		if(!terminado){
			let circulo = $("#circulosARellenar:last-child")
				.children(".vacio")
					.first().effect("pulsate").attr('src', img).attr('class', 'lleno');
			arrayCirculos[circulo.index()] = color;
		}
	}

	//quitamos el circulo de color y lo eliminamos del array.
	let quitarCirculo = function(elemento){
		if(elemento.attr("class") == "lleno"){
			elemento.attr("src", 'imgs/circulo_open.svg').effect("pulsate").attr("class", "vacio");
			arrayCirculos[elemento.index()] = undefined;
		}
	}

	let crearHijo = function(){
		//scroll
		document.getElementById('principalTablero').insertAdjacentHTML('beforeend', 
			'<div id="circulosARellenar" class="rellenar">'+
			'<img src="imgs/circulo_open.svg" id="circulo" class="vacio">'+
			'<img src="imgs/circulo_open.svg" id="circulo" class="vacio">'+
			'<img src="imgs/circulo_open.svg" id="circulo" class="vacio">'+
			'<img src="imgs/circulo_open.svg" id="circulo" class="vacio">'+
			'<div id="circulosBlancosNegros" class="blancosNegros">'+
				'<img class="vacio" src="imgs/circulo_open.svg">'+
				'<img class="vacio" src="imgs/circulo_open.svg">'+
				'<img class="vacio" src="imgs/circulo_open.svg">'+
				'<img class="vacio" src="imgs/circulo_open.svg">'+
			'</div>'+
		'</div>');
		//le asignamos la funcionalidad de click
		$("#circulosARellenar:last-child").children().on("click", function(){
			quitarCirculo($(this));
		});
		tablero.animate({
        	scrollTop: $('#circulosARellenar:last-child').offset().top - 10
   		}, 400);
	}

	//este bucle lo veo necesario por contar las negras - blancas.
	let colocarPuntuacion = function(negras, blancas){
		total = negras;
		do{
			if(negras>0){
				$('#circulosARellenar:last-child').children("#circulosBlancosNegros").children(".vacio").first().attr('src', 'imgs/circulo_black.svg').attr('class', 'puntuado');
				negras--;
			}
			if(blancas>0 && negras === 0){
				$('#circulosARellenar:last-child').children("#circulosBlancosNegros").children(".vacio").first().attr('src', 'imgs/circulo_white.svg').attr('class', 'puntuado');
				blancas--;
			}
		}while(negras > 0 || blancas > 0);
		return total;	
	}

	//muestra mensaje victoria.
	let mostrarMsgVictoria = function(){
		$( "#ventanaModal" ).dialog({dialogClass: "no-close", title: "Has ganado!", buttons: [{text: "Reiniciar",
				click: function() {
					$( this ).dialog( "close" );
					masterMind.reiniciarPartida();
				}
			}, {text: "salir",
				click: function(){
					$( this ).dialog( "close" );
					window.close();
					
				}
			}]
		});
	}
	//Elimina todos los elementos. Esto está aquí aparte por que no quiero mezclar cosas del modelo con la vista.
	let removeAllElements = function(){
		tablero.empty();
	}

	//está aquí por lo mismo, no quiero mezclar modelo con vista.
	let bloquearFila = function(){
		$("#circulosARellenar:last-child").children('.lleno').attr('class', 'bloqueado');
	}

	/* Modelo. */
	var masterMind = function(){
		let coloresAleatorios = [];
		let iniciarJuego = function(){
			coloresAleatorios = [];
			for(let i = 0; i < 4; i++){
				coloresAleatorios.push(arrayColores[Math.floor(Math.random() * (8))])
			}
		}
		let mostrar = function(){
			console.log(coloresAleatorios);
		}
	
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
}