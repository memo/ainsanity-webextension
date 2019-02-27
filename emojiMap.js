/*
 * This file contains the Map of word --> emoji substitutions.
 */

/* exported sortedEmojiMap */

let dictionary = new Map();
dictionary.set('artificial intelligence', '📊 data-driven methods');
dictionary.set('Artificial Intelligence', '📊 Data-Driven Methods');
dictionary.set('Artificial intelligence', '📊 Data-driven methods');
dictionary.set('ARTIFICIAL INTELLIGENCE', '📊 DATA-DRIVEN METHODS');
dictionary.set('artificially intelligent', '📊 data-driven');
dictionary.set('Artificially intelligent', '📊 Data-driven');
dictionary.set('Artificially Intelligent', '📊 Data-Driven');
dictionary.set('AI', '📊 DDM');
dictionary.set('A[.]I[.]', '📊 D.D.M.');



/*
 * After all the dictionary entries have been set, sort them by length.
 *
 * Because iteration over Maps happens by insertion order, this avoids
 * scenarios where words that are substrings of other words get substituted
 * first, leading to the longer word's substitution never triggering.
 *
 * For example, the 'woman' substitution would never get triggered
 * if the 'man' substitution happens first because the input term 'woman'
 * would become 'wo👨', and the search for 'woman' would not find any matches.
 */
let tempArray = Array.from(dictionary);
tempArray.sort((pair1, pair2) => {
  // Each pair is an array with two entries: a word, and its emoji.
  // Ex: ['woman', '👩']
  const firstWord = pair1[0];
  const secondWord = pair2[0];

  if (firstWord.length > secondWord.length) {
    // The first word should come before the second word.
    return -1;
  }
  if (secondWord.length > firstWord.length) {
    // The second word should come before the first word.
    return 1;
  }

  // The words have the same length, it doesn't matter which comes first.
  return 0;
});

// Now that the entries are sorted, put them back into a Map.
let sortedEmojiMap = new Map(tempArray);
