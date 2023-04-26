// express req (npm i express)
const express = require("express");
// BBDD connection
const { connect } = require("./db.js");
connect();

// Models
const { Book } = require("./models/Book.js");

// Express router creation:
const PORT = 3000;
const server = express();
const router = express.Router();

// Server configuration
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Routes
router.get("/", (req, res) => {
  res.send("Esta es la home de nuestra API");
});

// search functionality
router.get("/book", (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((error) => res.status(500).json(error));
});

router.get("/book/:id", (req, res) => {
  const id = req.params.id;

  Book.findById(id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({});
      }
    })
    .catch((error) => res.status(500).json(error));
});

server.use("/", router);
server.listen(PORT, () => {
  console.log(`Server levantado en el puerto ${PORT}`);
});
