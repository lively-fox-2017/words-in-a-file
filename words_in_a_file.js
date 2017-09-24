const fs = require('fs');

function words_in_a_file(filename, limit = 3) {

  let content = fs.readFileSync(filename)
                .toString()
                .replace(/[^a-z A-Z]+/g, ' ')
                .toLowerCase()
                .split(' ');

  let listOfConjunctions = [

    'the',
    'of',
    'in',
    'to',
    'is',
    'with',
    'that',
    'and',
    'ref',
    'pp',
    'or',
    'but',
    'nor',
    'so',
    'for',
    'yet',
    'after',
    'as',
    'because',
    'what',
    'when',
    'whether',
    'while',

  ];

  let words = [];
  let wordLength = [];
  let counters = [];

  // Mapping
  for (let i = 0; i < content.length; i++) {

    if ((listOfConjunctions.indexOf(content[i]) === -1) && (content[i].length > 1)) {

      if (words.indexOf(content[i]) === -1) {

        words.push(content[i]);
        wordLength.push(content[i].length);
        counters.push(0);

      } else {

        counters[words.indexOf(content[i])] += 1;

      }

    }

  }


  // Sorting
  for (let i = 1; i < counters.length; i++) {

    for (let j = 0; j < i - 1; j++) {

      if (counters[i] > counters[j]) {

        // Temporary variable to store counters[i] (for swapping purposes ^^)
        let tempCounter = counters[i];
        let tempWordLength = wordLength[i];
        let tempWord = words[i];

        counters[i] = counters[j];
        counters[j] = tempCounter;

        words[i] = words[j];
        words[j] = tempWord;

        wordLength[i] = wordLength[j];
        wordLength[j] = tempWordLength;

      }

    }

  }

  let output = '';

  // Generates output
  for (let i = 0; i < limit; i++) {

    output += '\'' + words[i] + '\': ' + counters[i] + ' occurences\n';

  }

  output += '\nLongest word: ' + words[wordLength.indexOf(Math.max(...wordLength))];

  return output;

}

console.log('---------------------');
console.log('source.txt, limit: 5');
console.log(words_in_a_file('source.txt', 5));
console.log('---------------------');

console.log('---------------------');
console.log('lorem-ipsum.txt, limit: 5');
console.log(words_in_a_file('lorem-ipsum.txt', 5));
console.log('---------------------');

module.exports = {
  words_in_a_file: words_in_a_file
}
