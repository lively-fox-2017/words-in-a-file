'use strict'
function main(filename,limit) {
  let fs = require('fs')

  fs.readFile(filename, (err, data) => {

    if (err)
      return console.log(err)

    let items = data.toString()
      .split(" ")

    console.log(filename)
    console.log("--------")
    console.log(foo(items,limit))
  })
}
main('source.txt',9)

function foo(arr,limit) {
    var item = [], jumlah = [], prev;
    var hasil = [];
    var m = arr.indexOf("the");
    arr[m] = "";
    for(var k = 0; k < arr.length; k++) {
      arr[k] = arr[k].replace(/[^a-zA-Z ]/g, "").replace(/\band|the|of|to|in|as|that|with|or\b/, "").replace(/\ba\b/, "").replace(/\bis\b/, "")
    }
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            item.push(arr[i]);
            jumlah.push(1);
        } else {
            jumlah[jumlah.length-1]++;
        }
        prev = arr[i];
    }
    for(var l = 0; l < jumlah.length; l++) {
      var object = {
        word: item[l],
        jumlah: jumlah[l]
      }
      hasil.push(object)
    }

    // for(var j = 0; j < limit; j++) {
    //   hasil.push(`${jumlah[j]} ${item[j]}`);
    // }
    var temp = hasil.sort(function(a,b) {
      return a.jumlah - b.jumlah
    }).reverse()

    return temp.slice(1,limit)
}
