CREATE TABLE iF NOT EXISTS sample_table (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL,
  job_title TEXT NOT NULL
);