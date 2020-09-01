// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

// drop tables in correct order:
await client.query(`
DROP TABLE IF EXISTS taglinks;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS links;`);

// build tables in correct order:
await client.query(`
CREATE TABLE links(
  id SERIAL PRIMARY KEY,
  link_url VARCHAR(255) UNIQUE NOT NULL,
  click_count INTEGER NOT NULL,
  comment VARCHAR(255) NOT NULL,
  date_shared DATE NOT NULL DEFAULT CURRENT_DATE
);
CREATE TABLE tags(
  id SERIAL PRIMARY KEY,
  tag_name VARCHAR(255) NOT NULL
);
CREATE TABLE link_tags(
  "linkId" REFERENCES links(id),
  "tagId" REFERENCES tags(id),
  UNIQUE ("linkId", "tagId")
);
`);
console.log("Finished Dropping and Building Tables..!");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());