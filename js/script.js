var currId;
var currRow;
var currCol;
var currVal;
var currClas;
var currBal;
var finBal;
var initBal;


//selector de colores
//selector de números

var colo1 = [["pinkBal", "yellowBal", "greenBal"],["pinkBal", "redBal", "greenBal"],["pinkBal", "redBal", "blueBal"]];
var colo2 = [["pinkBal", "yellowBal", "pinkBal"],["redBal", "blueBal", "yellowBal"],["greenBal", "redBal", "yellowBal"]];
var colo3 = [["yellowBal", "whiteBal", "blueBal"],["whiteBal", "greenBal", "redBal"],["pinkBal", "greenBal", "whiteBal"]];
var colo4 = [["whiteBal", "blueBal", "blueBal"],["redBal", "yellowBal", "whiteBal"],["blueBal", "greenBal", "whiteBal"]];

var nums1 = [[3,3,3],[2,4,5],[5,6,4]];
var nums2 = [[6,5,1],[1,5,6],[1,5,1]];
var nums3 = [[2,1,1],[2,2,2],[4,6,4]];
var nums4 = [[6,6,2],[3,4,3],[3,4,5]];

var cuadNum = [nums1,nums2,nums3,nums4];
var cuadCol = [colo1,colo2,colo3,colo4];

//Array para saber qué cuadrante se ha usado ya
var randTabl = [0,1,2,3];
var rand;
var auxN;
var auxC;
var nums;
var colors;


var totMov = 0;
var listMov = " ";
var totres = document.getElementById('totMov');
var movres = document.getElementById('seqMov');
var alerts = document.getElementById('alert');
var lista = document.getElementById("lista");
var mov = " ";



var finalCuad = new Array (4);



function enFilaColumna(currRow, queryRow, currCol, queryCol)
{
	return (currRow == queryRow || currCol == queryCol);
}

function colorNumero(currVal, queryVal, currClas, queryClas)
{
	return (currVal == queryVal || currClas == queryClas);
}


function getCuad (num) 


{
	var cuadrant = new Array(2);
	cuadrant [0] = cuadNum[num];
	cuadrant [1] = cuadCol[num];

	return cuadrant;
}



function ordenaTablero () 
{

	for (var j = 0; j < 4; j++) 
	{
		finalCuad[j] = new Array(2);
 	}

 	
for (let i = 4; i > 0; i--) {

		rand = Math.floor(Math.random()*i);		
		
		finalCuad [i-1]= getCuad(randTabl[rand]);
		if(i!=1)randTabl.splice(rand,1);
		
	}

		finalCuad [0]= getCuad(randTabl[0]);

	

	randTabl = [0,1,2,3];
}



//crea elementos del DOM

function creaTablero()
{
	//selecciona el tablero
	var tablero = document.getElementById('tablero');
	tablero.innerHTML = " ";


	for (var l = 1; l < 7; l++) 
	{
		//crea un div fila
		var fila = document.createElement('div');
		for (var m = 1; m < 7; m++) 
		{

			//para cada elemento crea una baldosa son su número
			var baldosa = document.createElement('span');
			
			baldosa.setAttribute("data-row",l);
			baldosa.setAttribute("data-col",m);
				
			//si la fila es de la parte de arriba
			if(l < 4)
			{	//y la mitad de la izquierda
				if(m<4)
				{
					num = document.createTextNode(finalCuad[0][0][l-1][m-1]);
					baldosa.classList.add(finalCuad[0][1][l-1][m-1]);
				}
				//y la mitad de la derecha
				else
				{ 
					
					num = document.createTextNode(finalCuad[1][0][l-1][m-4]);
					baldosa.classList.add(finalCuad[1][1][l-1][m-4]);
				}
				//crea los atributos y funciones
				baldosa.id = l.toString() + m.toString();
				baldosa.appendChild(num);
				baldosa.setAttribute('onclick','clicBal(this)');
				fila.appendChild(baldosa);
			}
			//si la fila es de la parte de abajo
			else

			{	//y la mitad de la izquierda
				if(m<4)
				{
					
					num = document.createTextNode(finalCuad[2][0][l-4][m-1]);
					baldosa.classList.add(finalCuad[2][1][l-4][m-1]);
				}
				//y la mitad de la derecha
				else
				{ 
					
					num = document.createTextNode(finalCuad[3][0][l-4][m-4]);
					baldosa.classList.add(finalCuad[3][1][l-4][m-4]);
				}
				//crea los atributos y funciones
				baldosa.id = l.toString() + m.toString();
				baldosa.appendChild(num);
				baldosa.setAttribute('onclick','clicBal(this)');
				fila.appendChild(baldosa);
			}
		}
		//añade cade fila según la acaba
		tablero.appendChild(fila);
	}
}


function giraCuad (cuad) 
{

	
	nums = finalCuad[cuad][0];
	colors = finalCuad[cuad][1];	

	nums = nums.reverse();
	colors = colors.reverse();

		for (var ext = 0; ext < nums.length; ext++) 
		{
			for (var intr = 0; intr < ext; intr++)
			{	

				var temp = nums[ext][intr];			
				nums[ext][intr] = nums[intr][ext];
				nums[intr][ext] = temp;

				var temp = colors[ext][intr];			
				colors[ext][intr] = colors[intr][ext];
				colors[intr][ext] = temp;

			}
		}
 		
		
			


	finalCuad[cuad][0] = nums;
	finalCuad[cuad][1] = colors;	


	creaTablero();
	startEnd();
	reset();
}



function startEnd()
{	
	if (currBal != undefined) currBal.classList.remove("init");
	if (finBal != undefined) finBal.classList.remove("end");

	//dentro de las filas y columnas posibles (1-6) elige una de cada para poner el inicio y el fin
	var start = [Math.floor(Math.random() * (7-1)+1) , Math.floor(Math.random() * (7-1)+1)];
	var end = [Math.floor(Math.random() * (7-1)+1) , Math.floor(Math.random() * (7-1)+1)];

	// crea el id con el formato FilaColumna
	idStart = start[0].toString() + start[1].toString();
	idEnd = end[0].toString() + end[1].toString();

	//elige el elemento con el id en el DOM
	var startBal = document.getElementById(idStart);
	var endBal = document.getElementById(idEnd);

	//añade las clases que le ponen los bordes a las baldosas
	startBal.classList.add("init");
	endBal.classList.add("end");

	//inicializa las variables necesarias para saber dónde se empieza
	currId = idStart;
	currRow = start[0];
	currCol = start[1];
	currVal = document.getElementById(currId).innerHTML;
	currClas = document.getElementById(currId).classList[0];
	currBal = document.getElementById(currId);


	//es necesario guardar la baldosa inicial en caso de que se desee reiniciar en el mismo tablero
	iniRow = currRow;
	iniCol = currCol;
	iniVal = currVal;
	iniClas = currClas;
	iniBal = currBal;

	finBal = endBal;
	initBal = currBal;
}

//reinicia los mensajes al usuario y devuelve la posición a la baldosa inicial
function reset()
{
	listMov = " ";
	totMov = 0;
	mov = " ";
	totres.innerText = "0";
	movres.innerText = "Ningún movimiento realizado";
	currBal.classList.remove("init");
	initBal.classList.add("init");
	alerts.innerText = "Mensajes";
	
	currRow = iniRow;
	currCol = iniCol;
	currVal = iniVal;
	currClas = iniClas;
	currBal = iniBal;
}

function guardaJug()
{
	var jugada = "";
	var jug = document.getElementById("jug").value;
	
	jugada = jug + ": " + totres.innerText;

	jug = document.createElement("span");
	jug.classList.add("jugada");
	jug.innerHTML = jugada;


	lista.appendChild(jug);

	document.getElementById("jug").value = "";

	reset();
}

//inicializa el juego para empezar (matrices de cuadrantes, tablero y posición de inicio y final)
function init ()
{	
	
	ordenaTablero();
	creaTablero();
	startEnd();
	reset();
}

//crea un nuevo inicio y final en el mismo tablero
function initPos ()
{	
	reset();
	startEnd();
}



//AQUI SI CLICAN DIRECTAMENTE EN LA BALDOSA
//función para ratón (mismo código pero el valor de la casilla se coge con clic)


function clicBal (bal) 
{	
	var queryBal = document.getElementById(bal.id);
	var queryId = bal.id;
	var queryRow = bal.dataset.row;
	var queryCol = bal.dataset.col;
	var queryVal = bal.innerText;
	var queryClas = bal.classList [0];

	console.log(queryId);
	alerts.innerText = "Mensajes";
	if(movres.innerHTML == "Ningún movimiento realizado") movres.innerHTML = "";

	
	var esend = queryBal.classList[1] == "end";
	var esval = currVal == queryVal;
	var esclas = currClas == queryClas;

	if(enFilaColumna(currRow, queryRow, currCol, queryCol))
	{
		if(colorNumero(currVal, queryVal, currClas, queryClas))
		{	


			if (queryBal.classList[1] == "end" )
			{	
				var span = document.createElement("span");
				span.innerHTML =  queryRow + "," + queryCol;
				span.classList.add("movi");
				totMov++;
				totres.innerText = totMov;
				alerts.innerText = "Has ganado!";
				movres.appendChild(span);
			}

			else
			{

				initBal.classList.remove("init");

				var span = document.createElement("span");
				span.innerHTML =  queryRow + "," + queryCol;
				span.classList.add("movi");
				totMov++;

				currid = queryId;
				currRow = queryRow;
				currCol = queryCol;
	 			currVal = queryVal;
 				currClas = queryClas;

 				currBal.classList.remove("init");
 				queryBal.classList.add("init");

 				currBal = queryBal;

 				totres.innerText = totMov;
 				movres.appendChild(span);
 				
 	
 			}
		}

		else
		{
			alerts.innerText = "La casilla no es válida, debe tener el mimso número o color";
		}
	}

	else {if( currVal != queryVal ||  currClas != queryClas) alerts.innerText = "La casilla no es válida, debe estar en la misma fila o columna";}
}



document.addEventListener('DOMContentLoaded', init());