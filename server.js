const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { responseSuccess, responseError } = require("./useResponse");

const port = 3003;
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  database: "test",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET
app.get("/api/all", (req, res) => {
  const data = db.query(
    "SELECT * FROM siswa ORDER BY nama_siswa ASC",
    (err, result) => {
      if (err) responseError(err, res);
      responseSuccess("get all data siswa", result, res);
    }
  );
});

// POST
app.post("/api/add", (req, res) => {
  const { nama, kelas, nohp } = req.body;
  const sql =
    "INSERT INTO siswa (id_user, nama_siswa, kelas, no_hp) VALUES ('',?,?,?)";
  db.query(sql, [nama, kelas, nohp], (err, result) => {
    if (err) responseError("Error, nama harus beda!", res);
    responseSuccess("Data berhasil ditambahkan", result, res);
  });
});

// GET SPECIFIC USER FROM ID
app.get("/api/spesifik", (req, res) => {
  const id = req.query.id;
  const sql = "SELECT * FROM siswa WHERE id_user = ?";
  db.query(sql, [id], (err, result) => {
    if (err) responseError("Error", res);
    responseSuccess("Get spesifik data from id", result, res);
  });
});

// PUT
app.put("/api/edit", (req, res) => {
  const { nama, kelas, nohp } = req.body;
  console.log(req.body);
  const id = req.query.id;
  const sql =
    "UPDATE siswa SET nama_siswa = ?, kelas = ?, no_hp = ? WHERE id_user = ?";
  db.query(sql, [nama, kelas, nohp, id], (err, result) => {
    if (err) responseError(err, res);
    responseSuccess("Data berhasil di update", result, res);
  });
});

// DELETE
app.delete("/api/delete", (req, res) => {
  const id = req.query.id;
  const sql = "DELETE FROM siswa WHERE id_user = ?";
  db.query(sql, [id], (err, result) => {
    if (err) responseError("ERROR", res);
    responseSuccess("Hapu data berhasil", "//", res);
  });
});

app.use(express.static("../client"));

app.listen(port, () => console.log("server ready at " + port));
