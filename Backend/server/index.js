const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'smartscan'
});


pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Database connected successfully'); 
  connection.release(); 
});

app.post('/invoices', (req, res) => {
  const { customer_name, amount, date } = req.body;
  pool.query('INSERT INTO invoices (customer_name, amount, date) VALUES (?, ?, ?)', [customer_name, amount, date], (error, results) => {
    if (error) {
      console.error('Error creating invoice:', error);
      res.status(500).json({ error: 'Error creating invoice' });
      return;
    }
    res.status(201).json({ message: 'Invoice created successfully', id: results.insertId });
  });
});


app.get('/invoices', (req, res) => {
  pool.query('SELECT * FROM invoices', (error, results) => {
    if (error) {
      console.error('Error retrieving invoices:', error);
      res.status(500).json({ error: 'Error retrieving invoices from the database' });
      return;
    }
    res.json(results);
  });
});

app.get('/invoices/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM invoices WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error retrieving invoice:', error);
      res.status(500).json({ error: 'Error retrieving invoice from the database' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Invoice not found' });
      return;
    }
    res.json(results[0]);
  });
});


app.put('/invoices/:id', (req, res) => {
  const id = req.params.id;
  const { customer_name, amount, date } = req.body;
  pool.query('UPDATE invoices SET customer_name = ?, amount = ?, date = ? WHERE id = ?', [customer_name, amount, date, id], (error) => {
    if (error) {
      console.error('Error updating invoice:', error);
      res.status(500).json({ error: 'Error updating invoice' });
      return;
    }
    res.json({ message: 'Invoice updated successfully' });
  });
});

app.delete('/invoices/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM invoices WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error deleting invoice:', error);
      res.status(500).json({ error: 'Error deleting invoice' });
      return;
    }
    res.json({ message: 'Invoice deleted successfully' });
  });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
