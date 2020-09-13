// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkerator'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);

// database methods

//create/get links:
async function createLink({ link_url, click_count, comment }){
  try {
    const {rows: [link]} = await client.query(`
    INSERT INTO links(link_url, click_count, comment)
    VALUES($1, $2, $3)
    ON CONFLICT (link_url) DO NOTHING
    RETURNING *;
    `, [link_url, click_count, comment]);

    return link;

  } catch (error) {
    throw error;
  }
}

async function getLinkById(linkId){
  try {
    const { rows: [link] } = client.query(`
    SELECT * FROM links
    WHERE id=$1;
    `,[linkId]);
  } catch (error) {
    throw error;
  }
}

async function updateLink({linkId, link_url, comment}){
  try {
    const {rows: [link]} = await client.query(`
    UPDATE links
    SET link_url=$2,
        comment=$3
    WHERE id=$1;
    `,[linkId, link_url, comment]);
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
    throw error;
  }
}

async function deleteLink(id){
  try {
    await client.query(`
    DELETE FROM taglinks
    WHERE "linkId"=$1
    `,[id]);

    await client.query(`
    DELETE FROM links
    WHERE id=$1;
    `,[id]);

    console.log("Deleted Link.");
  } catch (error) {
    throw error;
  }
}

//may need updateLinks.

//tag funcz:
async function createTags(tag_name){
  try {
    const {rows: [tag]} = await client.query(`
    INSERT INTO tags(tag_name)
    VALUES ($1)
    RETURNING *;
    `,[tag_name]);

    return tag;

  } catch (error) {
    throw error;
  }
}

async function getTags(){
  try{
    const { rows } = await client.query(`
    SELECT * FROM tags;
    `);

    return rows;

  }catch (error){
    throw error;
  }
}

async function deleteTag(id){
  try {
    await client.query(`
    DELETE FROM taglinks
    WHERE "tagId"=$1;
    `,[id]);

    await client.query(`
    DELETE FROM tags
    WHERE id=$1;
    `,[id]);
  } catch (error) {
    throw error;
  }
}

//taglinks:
async function getTagsByLink(linkId){
  //this is totally not optimal:
  //not too sharp on join tables, could we go over them in class?
  try {
    const { rows: tagIds } = await client.query(`
    SELECT "tagId" FROM taglinks
    WHERE "linkId"=$1;
    `,[linkId]);

    const getTagIds = tagIds.map(tag =>{
      return tag.tagId;
    });

    const {rows: tags} = await client.query(`
    SELECT * FROM tags
    WHERE id= ANY($1);
    `, [getTagIds]);

    return tags;

  } catch (error) {
    throw error;
  }
}

async function removeTagLink({tagId, linkId}){
  try {
    await client.query(`
    DELETE from taglinks
    WHERE "tagId"=$1
    AND "linkId"=$2;
    `,[tagId, linkId]);

  } catch (error) {
    throw error;
  }
}

async function addTagLink({tagId, linkId}){
  try {
    const {rows: [taglink]} = await client.query(`
    INSERT INTO taglinks("tagId", "linkId")
    VALUES ($1, $2)
    RETURNING *;
    `,[tagId, linkId]);

    return taglink;

  } catch (error) {
    throw error;
  }
}


// export
module.exports = {
  client,
  createLink,
  updateLink,
  getAllLinks,
  deleteLink,
  createTags,
  getTags,
  deleteTag,
  getTagsByLink,
  removeTagLink,
  getLinkById,
  addTagLink,
  // db methods
}