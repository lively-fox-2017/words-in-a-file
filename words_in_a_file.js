var sys = require('sys');
const fs = require('fs')

// actual conversion code starts here
function words_in_a_file(filename, limit) {
  var data = fs.readFileSync(filename);
  var counterWords = {}
  //console.log(data.toString().split(' '));
  var stringForm = data.toString();
  var stringFormNoTandaBaca=stringForm.replace(/[^0-9 a-z A-Z]/g, " ");
  var stringFormCleanWS = stringFormNoTandaBaca.replace(/\s\s+/g, ' ');
  var arrCleanStr = stringFormCleanWS.split(' ');
  for (var i of arrCleanStr) {
    //kalo belum ada di counter add property
    if(counterWords[i]==undefined){
      counterWords[i]=1;
    }
    //kalo udah ada tambah 1
    else{
      counterWords[i]+=1;
    }
  }
  //sort dari yang tertinggi
  var arrPenampungJumlahCounter=[];
  for (var i in counterWords){
    arrPenampungJumlahCounter.push(counterWords[i]);
  }
  arrPenampungJumlahCounter.sort(function(a,b){return a-b});
  for(var j=0; j<limit; j++){
    for (var i in counterWords) {
      if (counterWords[i]==arrPenampungJumlahCounter[arrPenampungJumlahCounter.length-1]) {
        console.log(i);
      }
    }
    console.log(arrPenampungJumlahCounter.pop());
  }

  //console.log(counterWordsarrPenampungJumlahCounter);
  //hapus semua tanda baca dan ganti dengan whitespace
  //setelah semua tanda baca hilang lakukan perhitungan jumlah kata
  //return n teratas hasil perhitungan
}
console.log(words_in_a_file('source.txt', 3));
module.exports = {
  words_in_a_file: words_in_a_file
}
