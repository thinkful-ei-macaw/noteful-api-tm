const FoldersService = {
  getFolders(db) {
    return db
      .from('folders')
      .select();
  },

  getFolderById(db, id) {
    return db
      .from('folders')
      .select()
      .where({ id })
      .first();
  },

  addFolder(db, folder) {
    return db
      .into('folders')
      .insert(folder)
      .returning('*')
      .then(rows => rows[0]);
  },

  updateFolder(db, id, data) {
    return db
      .from('folders')
      .where({ id })
      .update(data);
  },

  deleteFolder(db, id) {
    return db
      .from('folders')
      .where({ id })
      .delete();
  }
};

module.exports = FoldersService;