const express = require("express")
const connection = require("./connection")

const ApiRoutes = express.Router()


// Route to get all flashcards (SELECT)
ApiRoutes.get('/get-cards', (req,res)=>{
    const query = 'SELECT * FROM cards';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send('Server error');
        }
        res.json(results); // Send the query results as JSON
    });
})

// Route to add a new flashcard (INSERT)
ApiRoutes.post('/add-card', (req, res) => {
    const { question, answer } = req.body; 

    if (!question || !answer) {
        return res.status(400).send('Missing question or answer');
    }

    const query = 'INSERT INTO cards (question, answer) VALUES (?, ?)';
    connection.query(query, [question, answer], (err, results) => {
        if (err) {
            console.error("Error in adding a flash card:", err);
            return res.status(500).send('Server error');
        }
        res.status(201).send('Flashcard added successfully');
    });
});

// Route to update an existing flashcard (UPDATE)
ApiRoutes.put('/update-card/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    const query = 'UPDATE cards SET question = ?, answer = ? WHERE id = ?';

    connection.query(query, [question, answer, id], (err, results) => {
        if (err) {
            console.error("Error while updating Flashcard:", err);
            return res.status(500).send('Server error');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Flashcard not found');
        }
        res.json({ message: 'Flashcard updated successfully' });
    });
});

// Route to delete a flashcard (DELETE)
ApiRoutes.delete('/delete-card/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM cards WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error in deleting flashcard:", err);
            return res.status(500).send('Server error');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Flashcard not found');
        }
        res.json({ message: 'Flashcard deleted successfully' });
    });
});

module.exports = ApiRoutes;