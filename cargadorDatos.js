//https://github.com/danwrong/restler

var rest = require('restler');
var ipServer = "http://127.0.0.1:8080/ServerEnvioLibre/rest";

console.log('--------------- INICIAMOS EL CLIENTE ---------------');

function obtenerUsuarios(callback){
	// Obtengo los usuarios registrados en el sistema /////////////////
	rest.get(ipServer + '/usuarios', {
				"headers": {
					"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoibWFydGluIiwiZXhwIjoxNDgxMTUwMzIyNjQ3LCJpYXQiOjE0Nzg1NTgzMjI2NDd9.IpTOSiWneE6yUV5nZr7pBYAkv-QVxKdBgf7wF2YhBL0",
					"Accept": "application/json"
			}
		}).on('complete', function(data, response) {
			if (response.statusCode == 200){
				for(f=0;f<data.length;f++){
					callback(data);
				}
			} else {
				throw "ERROR! " + response.statusCode;
			}
		});
}

obtenerUsuarios(function(usuarios){
	usuarios.forEach(function(usuario){

	});
})

function logInUsuario(usuario,callback){
	// Obtengo los tokens de los usuarios iniciandoles la sesion /////
	rest.post(ipServer + '/autenticacion', {
	  data: { 
	  		username: usuario.nombreUsuario,
	  		password: usuario.clave 
	  	},
	  headers: {
			"Accept":"text/plain",
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).on('complete', function(data, response) {
		console.log('Respuesta inicio sesion: ' + response.statusCode);
		if (response.statusCode == 200) {
			callback(usuario);
		}else{
			throw "ERROR! " + response.statusCode;
		}
	});
}

// Genero una publicacion para un usuario con su token ///////////
var origenPub = new Object();
origenPub.latitud = 35.15;
origenPub.longitud = 35.15;
origenPub.direccion = 'Quintana 7105';

var destinoPub = new Object();
origenPub.latitud = 33.33;
origenPub.longitud = 33.33;
origenPub.direccion = 'Roldan 2345';

var publicacion = new Object();
publicacion.id = null;
publicacion.tamanio = 'chico';
publicacion.origen = origenPub;
publicacion.destino = destinoPub;
publicacion.receptor = 'tincho';
publicacion.fechaMaxEntrega = '10/12/2016';
publicacion.rangoInicio = '10';
publicacion.rangoFin = '18';
publicacion.usuario = 'juanes';
publicacion.distancia = 0;
publicacion.precioMinimo = null;
publicacion.fecha = '03/11/2016 11:11';
publicacion.comentario = 'Publicacion generada desde app JS de datos';

var stringJson = JSON.stringify(publicacion);
console.log(stringJson);

rest.post(ipServer + '/publicaciones', {
   data: stringJson,
   headers: {
 		"Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoianVhbmVzIiwiZXhwIjoxNDgxMTY2Nzc0ODUzLCJpYXQiOjE0Nzg1NzQ3NzQ4NTN9.zm9NIbOxvJVm10_BLDAqcQIi-BDqCZuiffw8yxSD88U",
 		"Content-Type": "application/json"
 	}
 }).on('complete', function(data, response) {
			console.log('Respuesta publicacion nueva: ' + response.statusCode);
  			if (response.statusCode == 201) {
  			// Obtengo el token de los usuarios
    		console.log(data);
 		 }
 		 console.log(data);
});

// Genero ofertas de transporte para una publicacion ///////////
var ofertaTrans = new Object();
ofertaTrans.publicacion = 11;
ofertaTrans.transportista = 'martin';
ofertaTrans.fecha = '05/11/2016';
ofertaTrans.medio_transporte = 'auto';
ofertaTrans.importe = 100;
ofertaTrans.nombreYApellido = 'Martin Palermo';
ofertaTrans.imagenUsuario = null;

var stringJson = JSON.stringify(ofertaTrans);
console.log(stringJson);

var nroPubli = 11;

rest.post(ipServer + '/ofertas/' + nroPubli, {
   data: stringJson,
   headers: {
 		"Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoianVhbmVzIiwiZXhwIjoxNDgxMTY2Nzc0ODUzLCJpYXQiOjE0Nzg1NzQ3NzQ4NTN9.zm9NIbOxvJVm10_BLDAqcQIi-BDqCZuiffw8yxSD88U",
 		"Content-Type": "application/json"
 	}
 }).on('complete', function(data, response) {
			console.log('Respuesta publicacion nueva: ' + response.statusCode);
  			if (response.statusCode == 201) {
  			// Obtengo el token de los usuarios
    		console.log(data);
 		 }
});

 // Obtengo los datos de customer de MP de un usuario ///////
rest.get(ipServer + '/usuarios/customerMP', {
			"headers": {
				"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoibWFydGluIiwiZXhwIjoxNDgxMTUwMzIyNjQ3LCJpYXQiOjE0Nzg1NTgzMjI2NDd9.IpTOSiWneE6yUV5nZr7pBYAkv-QVxKdBgf7wF2YhBL0",
				"Accept": "text/plain"
		}
	}).on('complete', function(data, response) {
		var usuarios = new Array();
		if (response.statusCode == 200){
			console.log(data);
			var customer = new Object();
			customer = JSON.parse(data);
			console.log(customer.id);
			} else {
			console.log(data);	
		}
	});

