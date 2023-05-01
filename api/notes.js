const noteRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const notes = require("../db/db.json");

// GET Route for retrieving notes
// if connection is successful (status: 200), status is "Notes obtained." & obtain notes
noteRouter.get('/', (req, res) => {
    res.status(200).json(notes);
});

// POST Route for showing notes
noteRouter.post('/', (req, res) => {
    // temporarily stores new note values
    const { title, text } = req.body;

    // if the title & text are filled out, appends new note to 'db.json'
    // else, don't append anything & send error message
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4() // creates unique ID for note
        };

        // add new note to .json file
        notes.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
            err ? console.log(err) 
            : res.json(notes);
        });
    } else {
        res.json('Error: note must have both title & contents')
    }
  
});

// DELETE a note
noteRouter.delete('/:id', (req, res) => {
    const noteToDelete = req.params.id;

    // Iterate through IDs; if it matches the note the user wants to delete, delete the note
    for (let i = 0; i < notes.length; i++) {
        if (noteToDelete === notes[i].id) {
            notes.splice(i, 1);
            res.json(notes);
        }
    }
})

module.exports = noteRouter;