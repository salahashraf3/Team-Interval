const express = require("express");
const route = express();
const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "salu",
  password: "password",
  database: "tasks",
  port: "3307",
});

route.post("/add-task", (req, res) => {
  try {
    const { heading, desc, priority, dateTime, file } = req.body; // Assuming these are the fields you want to insert into the database

    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          success: false,
          message: "Error connecting to the database",
        });
      } else {
        const insertQuery =
          "INSERT INTO tasklist (`heading`, `description`, `image`, `priority`, `date`) VALUES (?, ?, ?, ?, ?)";

        connection.query(
          insertQuery,
          [heading, desc, file, priority, dateTime],
          (err, result) => {
            connection.release();

            if (err) {
              console.log(err);
              res.status(500).send({
                success: false,
                message: "Error inserting data into the database",
              });
            } else {
              res
                .status(200)
                .send({ success: true, message: "Data inserted successfully" });
            }
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error on the server side" });
  }
});

route.get("/get-tasks", (req, res) => {
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          success: false,
          message: "Error connecting to the database",
        });
      } else {
        connection.query(
          "SELECT * FROM tasklist ORDER BY date ASC",
          (err, results) => {
            connection.release();

            if (err) {
              console.error("Error executing the SELECT query:", err);
              return;
            }

            res.status(200).send({
              success: true,
              message: "recieced succesfully",
              results,
            });
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error on the server side" });
  }
});

route.post("/get-task-with-id", (req, res) => {
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          success: false,
          message: "Error connecting to the database",
        });
      } else {
        connection.query(
          "SELECT * FROM tasklist WHERE id = ?",
          [req.body.id],
          (err, results) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
              console.error("Error executing the SELECT query:", err);
              return;
            }

            // 'results' contains the retrieved rows from the "tasklist" table
            res.status(200).send({
              success: true,
              message: "recieced succesfully",
              results,
            });
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error on the server side" });
  }
});

route.post("/edit-task", (req, res) => {
  try {
    const { heading, desc, priority, dateTime, file, id } = req.body; // Assuming these are the fields you want to insert into the database

    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          success: false,
          message: "Error connecting to the database",
        });
      } else {
        const updateQuery =
          "UPDATE tasklist SET heading = ?, description = ?, image = ?, priority = ?, date = ? WHERE id = ?";

        connection.query(
          updateQuery,
          [heading, desc, file, priority, dateTime, id],
          (err, result) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
              console.log(err);
              res.status(500).send({
                success: false,
                message: "Error inserting data into the database",
              });
            } else {
              res
                .status(200)
                .send({ success: true, message: "Data inserted successfully" });
            }
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error on the server side" });
  }
});

route.post("/delete-task-with-id", (req, res) => {
  try {
    const { id } = req.body; // Assuming these are the fields you want to insert into the database

    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          success: false,
          message: "Error connecting to the database",
        });
      } else {
        const deleteQuery = "DELETE FROM tasklist WHERE id = ?";

        connection.query(deleteQuery, [id], (err, result) => {
          connection.release(); // Release the connection back to the pool

          if (err) {
            console.log(err);
            res.status(500).send({
              success: false,
              message: "Error inserting data into the database",
            });
          } else {
            res
              .status(200)
              .send({ success: true, message: "Data Deleted successfully" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error on the server side" });
  }
});

module.exports = route;
