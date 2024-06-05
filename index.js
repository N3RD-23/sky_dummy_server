const express = require("express");
const app = express();
const mysql = require("mysql"); // https://github.com/mysqljs/mysql npm install mysqljs/mysql
const cors = require("cors"); //https://www.npmjs.com/package/cors npm i cors

// const port = 3001

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "player_registeration",
});

app.get("/", (req, res) => {
  res.send("Whatchu lookin at bro?");
});

app.post("/create", (req, res) => {
  const team_name = req.body.team_name;
  const f_name = req.body.f_name;
  const viber_number = req.body.viber_number;
  const email = req.body.email;
  const nid = req.body.nid;
  const p1_fullname = req.body.p1_fullname;
  const p1_nid = req.body.p1_nid;
  const p1_ign = req.body.p1_ign;
  const p1_igid = req.body.p1_igid;
  const p2_fullname = req.body.p2_fullname;
  const p2_nid = req.body.p2_nid;
  const p2_ign = req.body.p2_ign;
  const p2_igid = req.body.p2_igid;
  const p3_fullname = req.body.p3_fullname;
  const p3_nid = req.body.p3_nid;
  const p3_ign = req.body.p3_ign;
  const p3_igid = req.body.p3_igid;
  const p4_fullname = req.body.p4_fullname;
  const p4_nid = req.body.p4_nid;
  const p4_ign = req.body.p4_ign;
  const p4_igid = req.body.p4_igid;

  db.query(
    "INSERT INTO players (team_name,f_name,viber_number,email,nid,p1_fullname,p1_nid,p1_ign,p1_igid,p2_fullname,p2_nid,p2_ign,p2_igid,p3_fullname,p3_nid,p3_ign,p3_igid,p4_fullname,p4_nid,p4_ign,p4_igid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [team_name,f_name,viber_number,email,nid,p1_fullname,p1_nid,p1_ign,p1_igid,p2_fullname,p2_nid,p2_ign,p2_igid,p3_fullname,p3_nid,p3_ign,p3_igid,p4_fullname,p4_nid,p4_ign,p4_igid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // res.send("You have registered successfully!");
        console.log("Registered New Team")
      }
    }
  );
});

app.get("/players", (req, res) => {
  db.query("SELECT * FROM players", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/players/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM players WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.team_name;
  db.query(
    "UPDATE players SET team_name = ? WHERE id = ?",
    [name, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM players WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//app.listen(port, () => {
//  console.log(`Example app listening on port ${port}`)
//})

app.listen(3001, () => {
  console.log("Server is Running on Port 3001");
});