function makeFoldersArray() {
  return [
    {
      id: 1,
      name: 'Work',
    },
    {
      id: 2,
      name: 'Personal',
    },
    {
      id: 3,
      name: 'School',
    }
  ];
}

function makeNotesArray() {
  return [
    {
      id: 1,
      name: 'Work Note 1',
      content: 'This is a note',
      folder_id: 1,
      modified: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Work Note 2',
      content: 'This is a note',
      folder_id: 1,
      modified: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Personal Note 1',
      content: 'This is a note',
      folder_id: 2,
      modified: new Date().toISOString()
    },
    {
      id: 4,
      name: 'Personal Note 2',
      content: 'This is a note',
      folder_id: 2,
      modified: new Date().toISOString()
    },
    {
      id: 5,
      name: 'School Note 1',
      content: 'This is a note',
      folder_id: 3,
      modified: new Date().toISOString()
    },
    {
      id: 6,
      name: 'School Note 2',
      content: 'This is a note',
      folder_id: 3,
      modified: new Date().toISOString()
    }
  ];
}

function randomFolder() {
  const index = Math.floor(Math.random() * makeFoldersArray().length);
  return makeFoldersArray()[index];
}

function randomNote() {
  const index = Math.floor(Math.random() * makeNotesArray().length);
  return makeNotesArray()[index];
}

module.exports = {
  makeFoldersArray,
  makeNotesArray,
  randomFolder,
  randomNote
};