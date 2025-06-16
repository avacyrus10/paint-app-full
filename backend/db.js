db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL
    )
  `);


  db.run(`
    CREATE TABLE IF NOT EXISTS paintings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT,
      shapes TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

