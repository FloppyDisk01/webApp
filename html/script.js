function switchLight() {
  var image = document.getElementById("myImage");
  var bouton = document.getElementById("bouton");
  if(bouton.textContent == "Turn on the light "){
  	image.src = "pic_bulbon.gif";
  	bouton.textContent = "Turn off the light ";
  } else {
  	image.src = "pic_bulboff.gif";
  	bouton.textContent = "Turn on the light ";
  }
}

function validateForm(e) {
	var isOk = true;
	var x = document.getElementsByClassName("checkable");
	var y = document.getElementsByClassName("checkableParticulier");
	for(i=0;i < x.length; i++){
		if(x[i].id == "password"){
			if(x[i].value.length < 6){
				isOk = false;
				console.log("mots de passe trop court");
				e.preventDefault();
			}
		}
		if(x[i].id == "Cpassword"){
			if(x[i-1].value != x[i].value){
				isOk = false;
				console.log("mots de passe différents");
				e.preventDefault();
			}
		}
		else if(x[i].value.length <= 3){
			isOk = false;
			console.log("champs incomplets : " + x[i].id);
			e.preventDefault();
		}
	}
	for(i=0;i < y.length; i++){
		if(y[i].id == "age"){
			if(isNaN(y[i].value) || y[i].value < 18){
				isOk = false;
				console.log("age entré invalide");
				e.preventDefault();
			}
		}
		if(y[i].id == "female"){
			if(!y[i].checked && !y[i-1].checked){
				isOk = false;
				console.log("selectionnez un genre");
				e.preventDefault();
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", function(event){
	var form = document.getElementById("info");
	info.addEventListener('submit', function(e){
		validateForm(e);
	}) ;
});