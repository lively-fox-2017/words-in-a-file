var sys = require('sys');
const fs = require('fs');

// actual conversion code starts here
function words_in_a_file(filename, limit) {
	let isiFile = fs.readFileSync(filename).toString().replace(/[^a-zA-Z ]+/g, " ").toLowerCase().split(" ").sort();
	
	let kataHubung = ["", "been", "by", "a", "as", "an", "and", "the", "of", "to", "was", "were", "with", "ref", "while", "when", "which", "that", "is", "in", "then", "pp", "or", "did", "from"];
	let arr = [];
	let arrJumlah = [];
	let count = 1;
	for (let i = 0; i < isiFile.length; i++){
		if(kataHubung.indexOf(isiFile[i]) === -1){
			if (arr.length === 0) {
				arr.push(isiFile[i]);
			} else if (isiFile[i] !== arr[arr.length-1]) {
				arr.push(isiFile[i]);
				arrJumlah.push(count);
				count = 1;
			} else {
				count++;
			}
		}
	}
	
	let pendekKata = arr[0].length;
	let panjangKata = arr[0].length;
	let kataTerpendek = arr[0];
	let kataTerpanjang = arr[0];
	for (let i = 0; i < arr.length; i++){
		if (arr[i].length < pendekKata && arr[i].length > 1) {
			pendekKata = arr[i].length;
			kataTerpendek = arr[i];
		}
		
		if (arr[i].length > panjangKata) {
			panjangKata = arr[i].length;
			kataTerpanjang = arr[i];
		}
	}
	console.log("Kata paling pendek adalah", kataTerpendek);
	console.log("Kata paling panjang adalah", kataTerpanjang);
	console.log("\nKata paling banyak muncul :");
	
	// Output Paling banyak muncul
	for (let i = 0; i < limit; i++) {
		let maks = arrJumlah.reduce(function(a, b) {
			return Math.max(a, b);
		});
		
		let indeks = arrJumlah.indexOf(maks);
		console.log((i+1)+". "+arr[indeks]+" : "+arrJumlah[indeks]+" Occurrences");
		arr.splice(indeks,1);
		let x = arrJumlah.splice(indeks,1);
	}
}

// words_in_a_file("source.txt", 5);
words_in_a_file("ipsum.txt", 5);

module.exports = {
  words_in_a_file: words_in_a_file
}

