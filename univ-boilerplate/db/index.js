// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'change-this-name'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

//create/get links:
async function createLink({ link_url, click_count, comment }){
  try {
    const {rows: [link]} = await client.query(`
    INERT INTO links(link_url, click_count, comment)
    VALUES($1, $2, $3)
    ON CONFLICT (link_url) DO NOTHING
    RETURNING *;
    `, [link_url, click_count, comment]);

    return link;

  } catch (error) {
    console.error(error);
  }
}

async function getAllLinks(){
  try {
    const { rows } = await client.query(`
    SELECT * FROM links;
    `);

    return rows;

  } catch (error) {
    console.error(error);
  }
}
// export
module.exports = {
  client,
  createLink,
  getAllLinks,
  // db methods
}