INSERT INTO folders (id, name)
VALUES
  (1, 'Work'),
  (2, 'Personal'),
  (3, 'School');

INSERT INTO notes (title, content, folder)
VALUES
  ('Work Note 1', 'This is a note', 1),
  ('Work Note 2', 'This is a note', 1)
  ('Personal Note 1', 'This is a note', 2),
  ('Personal Note 2', 'This is a note', 2),
  ('School Note 1', 'This is a note', 3),
  ('School Note 2', 'This is a note', 3);