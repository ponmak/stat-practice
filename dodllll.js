const fs = require('fs');
const { dolls } = require('girlsfrontline-core');

// Helper function to generate values in fixed steps
const getFixedValue = (index, max, step) => Math.min(max, (index % (max / step + 1)) * step);

// Map dolls to a Titanic-like structure with fixed level and favor values
const dollData = dolls.map((doll, index) => ({
  DollId: index + 1,
  Survived: Math.random() > 0.5 ? 1 : 0, // Random survival status
  Class: doll.rarity || 'Unknown', // Rarity as "Class"
  Type: doll.type || 'Unknown', // Add the doll's type (e.g., AR, SMG)
  Name: doll.codename,
  Sex: 'Female', // Assume all dolls are female
  Level: getFixedValue(index, 100, 10), // Fixed level: 1, 10, ..., 100
  Links: getRandomInt(1, 5), // Random dummy link between 1 and 5
  Favor: getFixedValue(index, 100, 10), // Fixed favor: 0, 10, ..., 100
  Stats: `${doll.stats?.hp || 0}/${doll.stats?.pow || 0}/${doll.stats?.hit || 0}`, // Format key stats
  SkillLevel: getRandomInt(1, 10), // Random skill level between 1 and 10
  Embarked: 'Factory' // Placeholder
}));

// Convert to CSV
const headers = [
  'DollId',
  'Survived',
  'Class',
  'Type',
  'Name',
  'Sex',
  'Level',
  'Links',
  'Favor',
  'Stats',
  'SkillLevel',
  'Embarked'
];
const csvRows = [
  headers.join(','), // Header row
  ...dollData.map(row =>
    headers.map(field => row[field]).join(',') // Map each row to CSV format
  )
];

// Write to file
fs.writeFileSync('t_dolls.csv', csvRows.join('\n'), 'utf-8');
console.log('CSV file "t_dolls.csv" created successfully.');

// Helper function to generate random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
