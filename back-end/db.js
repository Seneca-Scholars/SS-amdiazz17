



export let profile_db = new sqlite3.Database("./database/Profile.db", (err) => {
    ErrorCheckDB(err, "Profile", "Profile Database Connection error");
    console.log("Connected To the Profile SQLite db");
    profile_db.run(
      `CREATE TABLE IF NOT EXISTS Profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bio TEXT,
      age INTEGER
      )`,
      (err) => {
        ErrorCheckDB(err, "Profile", "Error creating table");
        profile_db.get("SELECT COUNT(*) AS count FROM Profile", (err, row) => {
          ErrorCheckDB(err, "User", "Error checking table count");
          if (row.count === 0) {
            console.log("Profile Table is ready. Inserting initial data.");
            let insert = "INSERT INTO Profile (bio, age) VALUES (?, ?)";
            profile_db.run(insert, ["This is that and not that", 30]);
            profile_db.run(insert, ["That is that and also this", 24]);
            return;
          }
        });
      }
    );
  });