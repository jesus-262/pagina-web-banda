var boton = [document.getElementsByClassName('control_left'),document.getElementsByClassName('control_right')];
var TAG = document.getElementsByTagName("nav");

 pagina = (getUrlVars()["pagina"])? parseInt(getUrlVars()["pagina"]) : 1;

function cargarCanciones(){

	cover = $("#audioPlayer img")[0];
	lista = $("#musicList ul");
	player = $("#audioPlayer audio")[0];

	for (var i = 0; i < contenido.canciones.length; i++) {
		if(i == 0){
			lista.append("<li class='playing' data-src='"+contenido.canciones[i].uri+"' data-cover='"+contenido.canciones[i].cover+"' onclick='playSong(this); '>"+contenido.canciones[i].titulo+"</li>");
			player.src = contenido.canciones[i].uri;
			cover.src = contenido.canciones[i].cover;
		}else{
			
			lista.append("<li data-src='"+contenido.canciones[i].uri+"' data-cover='"+contenido.canciones[i].cover+"'  onclick='playSong(this); '>"+contenido.canciones[i].titulo+"</li>");
		}
	};
}

function cargarNoticias(){
	var enchufeTV = (link == "Index")? "noticias" : "Eventos";
	var index = (contenido.noticias.length >= 5)? 5 : contenido.noticias.length;
	if(pagina > 1 && contenido.noticias.length - (pagina-1)*5 >= 5){
		index = 5;
	}else if(pagina > 1){
		index = contenido.noticias.length - (pagina-1)*5;
	}
	for (var i = 0; i < index; i++) {
		crearNoticia(contenido[enchufeTV][i].tipoN,contenido[enchufeTV][(pagina-1)*5 + i]);
	};
}
function crearNoticia(tipoN,news){

	switch(tipoN){
		case "fullW":
			var articulo = document.createElement("article");
			articulo.className ="fullW";

			var image_w = document.createElement("div");
			image_w.className ="image_w";
			var img2 = document.createElement("img");
			img2.src = news.img;

			image_w.appendChild(img2);

			var noticia_w = document.createElement("div");
			noticia_w.className ="noticia_w";
			var titulo = document.createElement("div");
			titulo.className ="titulo";
			titulo.innerText = news.titulo;
			var noticia = document.createElement("div");
			noticia.className ="noticia";
			noticia.innerText = news.contenido;

			noticia_w.appendChild(titulo);
			noticia_w.appendChild(noticia);

			articulo.appendChild(image_w);
			articulo.appendChild(noticia_w);

			latI = document.getElementById('Publicacion');
			latI.getElementsByClassName("noticias")[0].appendChild(articulo);

		break;
		default:

	}
}

$(window).resize(function() {
	if($(window).width()>800){
		TAG[0].style.display ="block";
	}else {
		TAG[0].style.display ="none";
	}
});

$(function(){
	if(link=="Videos"){
		$(".slides2").slidesjs({
		    play: {
		      active: false,
		        // [boolean] Generate the play and stop buttons.
		        // You cannot use your own buttons. Sorry.
		      effect: "slide",
		        // [string] Can be either "slide" or "fade".
		      interval: 6000,
		        // [number] Time spent on each slide in milliseconds.
		      auto: false,
		        // [boolean] Start playing the slideshow on load.
		      swap: false,
		        // [boolean] show/hide stop and play buttons
		      pauseOnHover: false,
		        // [boolean] pause a playing slideshow on hover
		      restartDelay: 2500
		        // [number] restart delay on inactive slideshow
		    }
		  });

		vid = document.getElementsByClassName('vi'); 
		$(".slidesjs-pagination, .slidesjs-next, .slidesjs-previous").click(function() { 
			vid[0].pause();
			vid[1].pause();
			vid[2].pause(); 
		});
}

if(link=="Eventos"){
	$("#adelante")[0].style.display ="none";
	$("#atras")[0].style.display ="none";
		cargarNoticias();
}
if(link=="Index"){
	cargarCanciones();
	cargarNoticias();

$(".slides").slidesjs({
    play: {
      active: true,
        // [boolean] Generate the play and stop buttons.
        // You cannot use your own buttons. Sorry.
      effect: "slide",
        // [string] Can be either "slide" or "fade".
      interval: 6000,
        // [number] Time spent on each slide in milliseconds.
      auto: true,
        // [boolean] Start playing the slideshow on load.
      swap: true,
        // [boolean] show/hide stop and play buttons
      pauseOnHover: false,
        // [boolean] pause a playing slideshow on hover
      restartDelay: 2500
        // [number] restart delay on inactive slideshow
    }
  });
}

	$("#audioPlayer img").click(function(){
		if(player.paused){
			player.play();
		}else{
			player.pause();
		}
	});
});


function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

function atras(){
	window.location=window.location.pathname+"?pagina="+(pagina-1);
	if(pagina==1 || pagina<1){
		window.location=window.location.pathname+"?pagina=1";
	}
}

function adelante(){
	window.location=window.location.pathname+"?pagina="+(pagina+1);
	if(pagina==2 || pagina>1){
		window.location=window.location.pathname+"?pagina=2";
	}
}

function entro(obj){
	boton[0][0].style.width = "20%";
	boton[1][0].style.width = "20%";
}

function salio(obj){
	boton[0][0].style.width = "0%";
	boton[1][0].style.width = "0%";
}
function botoncito(){

	if(TAG[0].style.display =="none" || TAG[0].style.display == "" ){
			TAG[0].style.display ="block";
			
	}else{
			TAG[0].style.display ="none";
	}

}

function siguiente(obj){
	var song = $(".playing");	
	if(song.index() == lista[0].children.length-1){
		playSong(lista[0].children[0]);
	}else{
		playSong(lista[0].children[song.index()+1]);
	}
}

function anterior(obj){
	var song = $(".playing");	
	if(song.index() == 0){
		playSong(lista[0].children[lista[0].children.length-1]);
	}else{
		playSong(lista[0].children[song.index()-1]);
	}
}

function playSong(obj){	
		player.src= $(obj).data("src");
		cover.src=$(obj).data("cover");
		player.play();
		$(".playing").each(function(){
			$(this).removeClass("playing");
		});
		$(obj).addClass("playing");
}


$(document).ready(function(){
 
	$('.ir-arriba').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});
 
	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.ir-arriba').slideDown(300);
		} else {
			$('.ir-arriba').slideUp(300);
		}
	});
 
});





