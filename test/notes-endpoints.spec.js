const knex = require('knex');
const app = require('../src/app');
const { TEST_DB_URL } = require('../src/config');

const { makeFoldersArray, makeNotesArray, randomNote } = require('./app.fixtures');

describe('Notes endpoints', () => {
  let db;

  before('set up db instance', () => {
    db = knex({
      client: 'pg',
      connection: TEST_DB_URL
    });

    app.set('db', db);
  });

  const cleanData = () => db.raw('TRUNCATE folders, notes RESTART IDENTITY CASCADE');
  before('clean the table', cleanData);
  afterEach('clean the table', cleanData);

  after('disconnect from db', () => db.destroy());


  // POST requests (CREATE)
  describe('POST /notes', () => {
    const testNote = randomNote();
    const testFolder = makeFoldersArray().find(folder => folder.id === testNote.folder_id);

    before('insert test folder', () => {
      return db
        .into('folders')
        .insert(testFolder);
    });

    context('Given correct data', () => {
      it('responds with 201 and adds note to the table', () => {       
        return supertest(app)
          .post('/notes')
          .send(testNote)
          .expect(201, testNote);
      });
    });
    
    context('Given incorrect data', () => {
      const requiredFields = ['name', 'content', 'folder_id'];
      requiredFields.forEach(field => {
        it(`responds with 400 when required field '${field}' is omitted`, () => {
          const testNoteEdited = {...testNote};
          delete testNoteEdited[field];
          return supertest(app)
            .post('/notes')
            .send(testNoteEdited)
            .expect(400, `'${field}' is required`);
        });
      });
    });

  });


  // GET requests (READ)
  describe('GET /notes', () => {
    context('Given there are notes in the database', () => {
      const testFolders = makeFoldersArray();
      const testNotes = makeNotesArray();
  
      beforeEach(() => {
        return db
          .into('folders')
          .insert(testFolders);
      });
  
      beforeEach(() => {
        return db
          .into('notes')
          .insert(testNotes);
      });
  
      it('responds with 200 with an array of notes', () => {
        return supertest(app)
          .get('/notes')
          .expect(200, testNotes);
      });
  
      it('GET /notes/:id responds with 200 with the specified note', () => {
        const id = 2;
        const expectedNote = testNotes[id - 1];
        return supertest(app)
          .get(`/notes/${id}`)
          .expect(200, expectedNote);
      });
  
    });
  
    context('Given no notes in the database', () => {
      it('responds with 200 with an empty array', () => {
        return supertest(app)
          .get('/notes')
          .expect(200, []);
      });
  
      it('GET /notes/:id responds with 404', () => {
        const id = 2;
        return supertest(app)
          .get(`/notes/${id}`)
          .expect(404, 'Note not found');
      });
    });

  });

  describe('GET /notes/:id', () => {
    context('Given there are notes in the database', () => {
      const testFolders = makeFoldersArray();
      const testNotes = makeNotesArray();
  
      beforeEach(() => {
        return db
          .into('folders')
          .insert(testFolders);
      });
  
      beforeEach(() => {
        return db
          .into('notes')
          .insert(testNotes);
      });
  
      it('responds with 200 with the specified note', () => {
        const id = 2;
        const expectedNote = testNotes[id - 1];
        return supertest(app)
          .get(`/notes/${id}`)
          .expect(200, expectedNote);
      });
  
    });
  
    context('Given no notes in the database', () => {
      it('responds with 404', () => {
        const id = 2;
        return supertest(app)
          .get(`/notes/${id}`)
          .expect(404, 'Note not found');
      });
    });
  });


  // DELETE requests (DELETE)
  describe('DELETE /notes/:id', () => {
    context('Given there are notes in the database', () => {
      const testFolders = makeFoldersArray();
      const testNotes = makeNotesArray();
  
      beforeEach(() => {
        return db
          .into('folders')
          .insert(testFolders);
      });
  
      beforeEach(() => {
        return db
          .into('notes')
          .insert(testNotes);
      });
  
      it('responds with 204 and removes the note', () => {
        const id = 2;
        return supertest(app)
          .delete(`/notes/${id}`)
          .expect(204)
          .then(() => {
            return supertest(app)
              .get(`/notes/${id}`)
              .expect(404, 'Note not found');
          });
      });
  
    });
  
    context('Given no notes in the database', () => {
      it('responds with 404', () => {
        const id = 2;
        return supertest(app)
          .delete(`/notes/${id}`)
          .expect(404, 'Note not found');
      });
    });
  });
  
});