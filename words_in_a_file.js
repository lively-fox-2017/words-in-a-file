var sys = require('sys');
const fs = require('fs')

// actual conversion code starts here
function words_in_a_file(filename, limit) {
  fs.readFile(filename,'utf8',(err,data)=>{
    if (!err){
      // split string dan ambil yang kata yang mengandung alphabet
      let words=data.replace(/[0-9]/g, '').match(/[\w]+/g);
      // siapkan kata yang akan di filter
      let wordsFilter=['a','and','the','of','is','it','its','in','to','on','at','by','ref','that']
      //siapkan varibel penampung untuk kata
      let wordsOutput=[];
      //siapkan varibel penampung untuk jumlah kata
      let wordsCounts=[];

      //lakukan perulangan sebanyak limit
      for(var i = 0; i < limit; i++){
        //cek jika words[i] bukan merupakan kata yang difilter
        if (wordsFilter.indexOf(words[i].toLowerCase())==-1) {
          //ambil index dari kata yang terdapat pada wordsOutput
          let index=wordsOutput.indexOf(words[i]);
          //cek jika index -1 berarti kata merupakan kata baru
          if (index==-1) { //console.log(words[i]);
            //push wordsOutput dan wordsCounts dengan kata dan angka baru
            wordsOutput.push(words[i]);
            wordsCounts.push(1);
          } else {
            // let temp=wordsCounts[index];
            //jika tidak tambahkan wordsCounts index ke index
            wordsCounts[index]++;
          }
        }
      }
      //lakukan perulangan sebnayak panjang wordsOutput
      for (var i = 0; i < wordsOutput.length; i++) {
        //gabungkan wordsOutput dengan wordsCounts dengan memberi tanda pemisah
        wordsOutput[i]=wordsCounts[i]+' - '+wordsOutput[i];
      }
      //lakukan sorting dengan cara ascending
      wordsOutput.sort(function(a, b) {
        return parseInt(b) - parseInt(a);
      });
      //tampilkan hasil 3 terbesar
      console.log([wordsOutput[0],wordsOutput[1],wordsOutput[2]]);
      // console.log([wordsOutput]);
    }
  })
}
words_in_a_file('source.txt',2550);
module.exports = {
  words_in_a_file: words_in_a_file
}
