const express = require("express");
const app = express();
const mysql = require("mysql"); // https://github.com/mysqljs/mysql npm install mysqljs/mysql
const cors = require("cors"); //https://www.npmjs.com/package/cors npm i cors

// const port = 3001

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user:"shunnu",
  host:"localhost",
  password: "ASqw21@!",
  database: "player_registration",
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.get("/", (req, res) => {
  res.send("Whatchu lookin at bro?");
});

app.post("/create", (req, res) => {
  const {
    team_name, f_name, viber_number, email, nid,
    p1_fullname, p1_nid, p1_ign, p1_igid,
    p2_fullname, p2_nid, p2_ign, p2_igid,
    p3_fullname, p3_nid, p3_ign, p3_igid,
    p4_fullname, p4_nid, p4_ign, p4_igid
  } = req.body;

  const query = `
    INSERT INTO players (
      team_name, f_name, viber_number, email, nid,
      p1_fullname, p1_nid, p1_ign, p1_igid,
      p2_fullname, p2_nid, p2_ign, p2_igid,
      p3_fullname, p3_nid, p3_ign, p3_igid,
      p4_fullname, p4_nid, p4_ign, p4_igid
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      team_name, f_name, viber_number, email, nid,
      p1_fullname, p1_nid, p1_ign, p1_igid,
      p2_fullname, p2_nid, p2_ign, p2_igid,
      p3_fullname, p3_nid, p3_ign, p3_igid,
      p4_fullname, p4_nid, p4_ign, p4_igid
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error registering team');
      } else {
        console.log("Registered New Team");
        res.status(201).send('Team registered successfully');
      }
    }
  );
});

app.get("/players", (req, res) => {
  db.query("SELECT * FROM players", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving players');
    } else {
      res.send(result);
    }
  });
});

app.get("/players/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM players WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving player');
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const { id, team_name } = req.body;
  db.query(
    "UPDATE players SET team_name = ? WHERE id = ?",
    [team_name, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating player');
      } else {
        res.send('Player updated successfully');
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM players WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting player');
    } else {
      res.send('Player deleted successfully');
    }
  });
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

app.listen(3001, () => {
  console.log("Server is Running on Port 3001");
});
