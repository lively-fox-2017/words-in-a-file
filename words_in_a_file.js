const fs = require('fs')

// actual conversion code starts here
function words_in_a_file(filename, limit) {
  fs.readFile(filename, (err, data) => {
    let stopWords = [
      'a',
      'all',
      'am',
      'an',
      'and',
      'any',
      'are',
      "aren't",
      'as',
      'at',
      'be',
      'been',
      'being',
      'both',
      'but',
      'by',
      "can't",
      'cannot',
      'from',
      'in',
      'is',
      'of',
      'on',
      'or',
      'pp',
      'that',
      'the',
      'to',
      'with',
    ];

    let regexStop = new RegExp("\\b(" + stopWords.join("|") + "|'|'s)\\b", 'ig');
    if (err)
      return console.log(err);
    let words = data.toString().replace(/\r\n/g, " ").replace(regexStop, "").replace(/<ref>|<\/ref>/ig, "").replace(/[^a-zA-Z']/g, " ").split(" ");
    var counted = words.reduce(function(countedArr, word) {
      if (word !== '') {
        if (word in countedArr) {
          countedArr[word]++;
        } else {
          countedArr[word] = 1;
        }
      }
      return countedArr;
    }, {});

    var sortable = [];
    for (var word in counted) {
      sortable.push([word, counted[word]]);
    }
    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });

    let result = [];
    let limited = sortable.splice(0, limit);

    for (let i = 0; i < limited.length; i++) {
      result[limited[i][0]] = limited[i][1] + " occurences";
    }
    console.log(result);
  });
}

words_in_a_file("source.txt", 3);

module.exports = {
  words_in_a_file: words_in_a_file
}
