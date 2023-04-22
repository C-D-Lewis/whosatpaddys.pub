const neatCsv = require('neat-csv');
const { readFileSync, writeFileSync } = require('fs');

/** List of recurring characters */
const CHARACTERS = [
  'Dennis',
  'Mac',
  'Charlie',
  'Dee',
  'Frank',
  'Waitress',
  'Artemis',
  'McPoyles',
  'Bill',
  'Maureen',
  'Gail',
  'Lawyer',
  'Uncle Jack',
  'Mrs Mac',
  'Mrs Kelly',
  'Barbara',
  'Luther',
  'Maniac',
  'Z',
  'Carmen',
  'Hwang',
  'Cricket',
  'Bruce',
  'Ingrid',
  'Lil\' Kev',
  'Ben',
  'Rex',
  'Jackie',
  'Waiter',
];

/**
 * Build season and episode data from CSV format.
 *
 * @param {Array<object>} rows - Loaded CSV row data.
 * @returns {Array<object>} Processed data.
 */
const buildSeasonsData = (rows) => rows.map((row) => {
  const values = Object.values(row);
  const [
    season,
    episode,
    title,
    writers,
    tags,
  ] = values;
  const charStart = 5;
  const characters = values.slice(charStart, charStart + CHARACTERS.length)
    .map((p, i) => p === 'x' && CHARACTERS[i])
    .filter((p) => !!p);
  const writerList = writers.split(',');
  const tagList = tags.split(',');

  return {
    season,
    episode,
    title,
    characters,
    tags: tagList[0].length ? tagList : [],
    writers: writerList[0].length ? writerList : [],
  };
});

/**
 * The main function.
 */
const main = async () => {
  // Read exported CSV
  const data = readFileSync(`${__dirname}/../assets/sunny_data.csv`, 'utf-8');
  const csv = await neatCsv(data);

  // Make useful
  const seasons = buildSeasonsData(csv);
  console.log(seasons);

  // Write to disk
  writeFileSync(`${__dirname}/../assets/episodes.json`, JSON.stringify(seasons, null, 2), 'utf-8');
};

main();
