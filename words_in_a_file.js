// const sys = require('sys');
const fs = require('fs')

function filterEverything(word) {
	const filteredWord = ['one', 'only', 'should', 'can', 'would', 'what', 'why', 'how', 'about', 'but', 'there', 'such', 'might', 'the', 'and', 'with', 'that', 'his', 'him', 'her', 'she', 'ref', 'for', 'was', 'are', 'its', 'who', 'may', 'has', 'had', 'have', 'most', 'this', 'from', 'which', 'were', 'also', 'their', 'between', 'other', 'our', 'been', 'own', 'within', 'these', 'more', 'they', 'into', 'when', 'not', 'some', 'then', 'any', 'than', 'yet', 'could', 'them', 'where', 'must', 'will', 'whom', 'however', 'did', 'very', 'thus', 'too', 'until', ' ', '', 'of', 'in', 'to', 'a', 'at', 'is', 'as', 'by', 's', 'or', 'p', 'pp', 'r', 'an', 'in', 'on', 'he', 'do',];
	return filteredWord.indexOf(word) === -1 && word.length > 2;
}

function formatFile(inputFilePath) {
	const input = fs.readFileSync(inputFilePath).toString();
	const formatted = input
						.toLowerCase()
						.replace(/[^a-z A-Z]+/g, ' ')
						.split(' ')
						.filter(filterEverything);

	return formatted;
}

function classifyingByAppearance(arrayOfWords) {
	let collection = {};

	arrayOfWords.forEach(el => {
		collection[el] ? collection[el] += 1 : collection[el] = 1;
	});

	return collection;
}

function sortByHighestAppearance(collection) {
	let sortedWords = Object.keys(collection).sort((a, b) => collection[b] - collection[a]);
	return sortedWords.reduce((col, word) => {
		if (!col[word]) col[word] = collection[word];
		return col; 
	}, {});
}

function sortByLongestWord(collection) {
	let sortedWords = Object.keys(collection).sort((a, b) => b.length - a.length);
	return sortedWords.reduce((col, word) => {
		if (!col[word]) col[word] = word.length;
		return col;
	}, {});
}

// actual conversion code starts here
function words_in_a_file(filename, limit) {
	const words = formatFile(filename);
	const collection = classifyingByAppearance(words);
	const sortedCollection = sortByHighestAppearance(collection);

	let sortedWords = Object.keys(sortedCollection);
	let result = {};

	for (let i = 0; i < limit; i++) {
		result[sortedWords[i]] = sortedCollection[sortedWords[i]] + ' occurences';
	}

	return result;
}

function longestWords(filename, limit) {
	const words = formatFile(filename);
	const collection = classifyingByAppearance(words);
	const sortedCollection = sortByLongestWord(collection);

	let sortedWords = Object.keys(sortedCollection);
	let result = {}

	for (let i = 0; i < limit; i++) {
		result[sortedWords[i]] = sortedCollection[sortedWords[i]] + ' letters';
	}

	return result;
}

console.log('===========10 Most Occurences: Osiris Myth');
console.log(words_in_a_file('./source.txt', 5));
console.log('===========10 Longest Words: Osiris Myth');
console.log(longestWords('./source.txt', 5));

console.log('===========10 Most Occurences: Computing Machinary and Intelligence');
console.log(words_in_a_file('./comp_machinary_and_int.txt', 10));
console.log('===========10 Longest Words: Computing Machinary and Intelligence');
console.log(longestWords('./comp_machinary_and_int.txt', 10));

console.log('===========10 Most Occurences: Interpretative Archaelogy and Its Role');
console.log(words_in_a_file('./interpretative.txt', 10));
console.log('===========10 Longest Words: Interpretative Archaelogy and Its Role');
console.log(longestWords('./interpretative.txt', 10));

module.exports = {
  words_in_a_file: words_in_a_file
}
