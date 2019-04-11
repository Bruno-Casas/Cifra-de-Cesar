//global functions

function get(param) {
	return document.querySelector(param)
}

//List events
get("#cifrar").addEventListener('click', () => {
	let result = encoder(get("#text").value,parseInt(get("#key").value))
	get("#result").innerHTML = result
})

get("#decifrar").addEventListener('click', () => {
	let result = encoder(get("#text").value,parseInt(get("#key").value),true)
	get("#result").innerHTML  = result
})

function encoder(text, key, reverse = false) {
	let result = "";

	if (key < 1) {
		console.log("Aviso: Não são permitidos números inferiores a 1.");
		return 1;
	} else if (key > 25) {
		if (key % 26 == 0) {
			console.log("Aviso: A chave informada não promove uma criptografia eficiente.");
			return 1;
		}
		key = key - 26 * (Math.trunc(key / 26));
		console.log("Observação: Numero da chave é superior ao máximo recomendado (25)." +
			"Pois é equivalente a: " + key);
	}

	if (reverse) {
		key *= -1;
	}

	for (let i = 0; i < text.length; i++) {
		let asciiCode = text.charCodeAt(i);
		if (asciiCode == 32) {
			result += String.fromCharCode(35);
			asciiCode += key;
		} else {
			if (asciiCode == 35 && reverse) {
				asciiCode = text.charCodeAt(++i);
				asciiCode += key;
			} else if ((asciiCode >= 65 && asciiCode <= 90) || (asciiCode >= 97 && asciiCode <= 122)) {
				if (asciiCode > 90) {
					asciiCode += key;
					if (asciiCode > 122) {
						asciiCode -= 26;
					} else if (asciiCode < 97) {
						asciiCode += 26;
					}
				} else {
					asciiCode += key;
					if (asciiCode > 90) {
						asciiCode -= 26;
					} else if (asciiCode < 65) {
						asciiCode += 26;
					}
				}
			} else {
				asciiCode += key;
				result += String.fromCharCode(35);
			}
		}
		result += String.fromCharCode(asciiCode);
	}
	return result;
}