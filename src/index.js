const express = require('express');
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();

app.use(cors());
app.use(express.json());

async function getConnection() {

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '3993yasmin',
  database: 'library_db',
});
  connection.connect();
  return connection;
}
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//ENDPOINTS

// Obtener todos los libros
app.get('/books', async (req, res) => {
  let query = 'SELECT * FROM books';

  const conn = await getConnection();

  const [results] = await conn.query(query);
  const numOfElements = results.length;

    res.json({
      info: { count: numOfElements }, 
      results: results,
    });
  });


// Obtener un libro por ID

app.get('/books/:id', async (req, res) => {
  const bookId = req.params.id;

 let query = 'SELECT * FROM books WHERE id = ?';
 const conn = await getConnection();

 const [results] = await conn.query(query, [bookId]);
 const numOfElements = results.length;

 if (numOfElements === 0) {
  res.json({
    success: true,
    message: "No existe el libro que buscas",
  });
  return;
}
  res.json({
    results: results[0], // listado
    });
  });


// Crear un nuevo libro

app.post('/books', async (req, res) => {
  const dataBook = req.body;
  const { title, author, genre, publication_year } = dataBook;

  let sql = 'INSERT INTO books (title, author, genre, publication_year) VALUES (?, ?, ?, ?)';

  try {
    const conn = await getConnection();

    const [results] = await conn.query(sql ,[
      title, 
      author, 
      genre, 
      publication_year 
    ]);
  
    if (results.affectedRows === 0) {
      res.json({
        success: false,
        message: "No se ha podido insertar",
      });
      return;
    }

    res.json({
      success: true,
      id: results.insertId,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Ha ocurrido un error${error}`,
    });
  }
});

// Actualizar un libro por ID

app.put('/books/:id', async (req, res) => {
  const dataBook = req.body;
  const { title, author, genre, publication_year } = dataBook;
  const bookId = req.params.id;
  
  let sql = 'UPDATE books SET title=?, author=?, genre=?, publication_year=? WHERE id=?';

  const conn = await getConnection();

    const [results]= await conn.query(sql, [
      title, 
      author, 
      genre, 
      publication_year, 
      bookId
    ]);
    res.json({
      success: true,
      message: "Actualizado correctamente",
    });
  });

// Eliminar un libro por ID
app.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;

  let sql = 'DELETE FROM books WHERE id = ?';

  const conn = await getConnection();
  
  const [results] = await conn.query(sql, [bookId]);
  res.json({
    success: true,
    message: "Eliminado correctamente",
  });
});




