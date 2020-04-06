const NotesService = {
  getNotes(db) {
    return db
      .from('notes')
      .select();
  },

  getNoteById(db, id) {
    return db
      .from('notes')
      .select()
      .where({ id })
      .first();
  },

  addNote(db, note) {
    return db
      .into('notes')
      .insert(note)
      .returning('*')
      .then(rows => rows[0]);
  },

  updateNote(db, id, data) {
    return db
      .from('notes')
      .where({ id })
      .update(data);
  },

  deleteNote(db, id) {
    return db
      .from('notes')
      .where({ id })
      .delete();
  }
};

module.exports = NotesService;