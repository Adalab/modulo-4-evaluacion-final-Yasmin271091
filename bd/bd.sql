CREATE DATABASE library_db;

USE library_db;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    publication_year INT
);

INSERT INTO books (title, author, genre, publication_year) VALUES
('El Gran Gatsby', 'F. Scott Fitzgerald', 'Ficción', 1925),
('Matar a un Ruiseñor', 'Harper Lee', 'Ficción', 1960),
('1984', 'George Orwell', 'Distópico', 1949),
('El Hobbit', 'J.R.R. Tolkien', 'Fantasía', 1937),
('Orgullo y Prejuicio', 'Jane Austen', 'Romance', 1813),
('El Guardián entre el Centeno', 'J.D. Salinger', 'Ficción', 1951);




