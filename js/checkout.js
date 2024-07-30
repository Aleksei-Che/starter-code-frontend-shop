
// Exercise 6
const isOnlyLetters = (str) => /^[a-zA-Z]+$/.test(str);

const isOnlyNumbers = (str) => /^[0-9]+$/.test(str);

const isLettersNumeros = (str) => /[a-zA-Z]/.test(str) && /[0-9]/.test(str);

function validate(event) {

	event.preventDefault(); 
	
	var error = 0;
	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");
	var fAddress = document.getElementById("fAddress");
	var fLastN = document.getElementById("fLastN");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");
	var errorAddress = document.getElementById("errorAddress");
	var errorLastN = document.getElementById("errorLastN");
	var errorPassword = document.getElementById("errorPassword");
	var errorPhone = document.getElementById("errorPhone");

	function removeError(input, errorElement) {
		input.style.border = "";
		errorElement.style.display = "none";
	}

	function createError (input, errorElement){

		input.style.border = "2px solid red";
		errorElement.style.display = 'block';
		error++;
	}

	if (fName.value.length <3 || !isOnlyLetters(fName.value)){
		createError(fName, errorName);
	}else{
		removeError(fName, errorName )
	}

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fEmail.value.length < 3 || !emailPattern.test(fEmail.value)) {
        createError(fEmail, errorEmail);
    } else {
        removeError(fEmail, errorEmail);
    }

	if (fAddress.value.length <3 ){
		createError(fAddress, errorAddress);
	} else {
		removeError(fAddress, errorAddress);
	}

	if (fLastN.value.length < 3 || !isOnlyLetters(fLastN.value)){
		createError(fLastN, errorLastN);
	} else {
		removeError(fLastN, errorLastN);
	}

	if (fPassword.value.length < 4 || fPassword.value.length > 8 || !isLettersNumeros(fPassword.value)){
		createError(fPassword, errorPassword);
	} else {
		removeError(fPassword, errorPassword);
	}

	if (fPhone.value.length !==9 || !isOnlyNumbers(fPhone.value)){
		createError(fPhone, errorPhone);
	}

	
	if(error>0){
		alert("Error");
	}else{
		alert("OK");
	}
}

document.getElementById("btn").addEventListener("click", validate);