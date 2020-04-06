const knex = require('knex');
const app = require('../src/app');
const { TEST_DB_URL } = require('../src/config');

const { makeFoldersArray } = require('./folders.fixtures');

describe('Folder endpoints', () => {
  let db;

  before('set up db instance', () => {
    db = knex({
      client: 'pg',
      connection: TEST_DB_URL
    });

    app.set('db', db);
  });

  const cleanFolders = () => db.raw('TRUNCATE folders, notes RESTART IDENTITY CASCADE')
  before('clean the table', cleanFolders);
  afterEach('clean the table', cleanFolders);

  after('disconnect from db', () => db.destroy());

  // GET requests (READ)
  context('Given there are folders in the database', () => {
    const testFolders = makeFoldersArray();

    beforeEach(() => {
      return db
        .into('folders')
        .insert(testFolders);
    });

    it('GET /folders responds with 200 with an array of folders', () => {
      return supertest(app)
        .get('/folders')
        .expect(200, testFolders);
    });

    it('GET /folders/:id responds with 200 with the specified folder', () => {
      const id = 2;
      const expectedFolder = testFolders[id - 1];
      return supertest(app)
        .get(`/folders/${id}`)
        .expect(200, expectedFolder);
    });

  });

  context('Given no folders in the database', () => {
    it('GET /folders responds with 200 with an empty array', () => {
      return supertest(app)
        .get('/folders')
        .expect(200, []);
    });

    it('GET /folders/:id responds with 404', () => {
      const id = 2;
      return supertest(app)
        .get(`/folders/${id}`)
        .expect(404, 'Folder not found');
    });
  });
  
});