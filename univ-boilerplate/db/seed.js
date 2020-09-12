// code to build and initialize DB goes here
const {
  client,
  createLink,
  updateLink,
  getAllLinks,
  deleteLink,
  createTags,
  deleteTag,
  getTagsByLink,
  removeTagLink,
  addTagLink
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
CREATE TABLE taglinks(
  "linkId" INTEGER REFERENCES links(id),
  "tagId" INTEGER REFERENCES tags(id),
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
    console.log("Starting dummy data.......");
    //create starter links:
    await createLink({
      link_url: 'www.facebook.com',
      click_count: 0,
      comment: "MySpace knockoff"
    });
    await createLink({
      link_url: 'www.google.com',
      click_count: 0,
      comment: "searchy enginey"
    });
    //create tags:
    await createTags("Business");
    await createTags("Education");
    await createTags("Entertainment");
    await createTags("Finance");
    await createTags("Food & Drink");
    await createTags("Kids");
    await createTags("Health & Fitness");
    await createTags("Graphics & Design");
    await createTags("Lifestyle");
    await createTags("News");
    await createTags("Medical");
    await createTags("Music");
    await createTags("Navigation");
    await createTags("Photo & Video");
    await createTags("Productivity");
    await createTags("Reference");
    await createTags("Shopping");
    await createTags("Social Networking");
    await createTags("Sports");
    await createTags("Travel");
    await createTags("Utilities");
    await createTags("Weather");
    //put some tags on some links:
    await addTagLink({
      tagId: 18,
      linkId: 1
    });
    await addTagLink({
      tagId: 16,
      linkId: 2
    });
    await addTagLink({
      linkId: 2,
      tagId: 2
    });

  } catch (error) {
    throw error;
  }
}

async function testDB(){
  try {
    const result = await updateLink({
      linkId: 2,
      link_url: "www.facebook.com",
      comment: "fuck off"
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}



buildTables()
  .then(populateInitialData)
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());