var sys = require('util');
const fs = require('fs')

// actual conversion code starts here
function words_in_a_file(filename, limit) {
  var isiFile = fs.readFileSync(filename).toString();
  isiFile = isiFile.replace(/[^a-zA-Z0-9 ]/g, "");
  var data = isiFile.split(" ");
  var arrayWords = [];
  var arrayCounter = [];
  var uncountedWords = ['and','of','the','a','','in','to','is','as','with'];
  for(var i=0;i<data.length;i++){
    if(uncountedWords.indexOf(data[i].toLowerCase()) > -1){
      continue;
    }
    if(arrayWords.indexOf(data[i].toLowerCase()) !== -1){
      arrayCounter[arrayWords.indexOf(data[i].toLowerCase())][1]++;
    }
    else{
      arrayWords.push(data[i].toLowerCase());
      arrayCounter.push([data[i].toLowerCase(),1]);
    }
  }
  arrayCounter = bubbleSort(arrayCounter);
  var returnResult = "";
  for(var i =0;i<limit;i++){
    returnResult+="'" + arrayCounter[i][0] + "'" + ": "+ arrayCounter[i][1] + " occurrences \n";
  }
  return returnResult;
}

function bubbleSort(items) {
  for(let i=0;i<items.length;i++){
    for(let j=i;j<items.length;j++){
      if(items[i][1]<items[j][1]){
        let temp = items[j];
        items[j] = items[i];
        items[i] = temp;
      }
    }
  }
  return items;
}

console.log(words_in_a_file('source.txt',10));
console.log(words_in_a_file('lorem.txt',10));

module.exports = {
  words_in_a_file: words_in_a_file
}
