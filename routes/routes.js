const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readFile("db/db.json", "utf8", (err, data) => {

        if (err) throw err; 

        let notes = JSON.parse(data);

        app.get("/api/notes", function(req, res){
            res.json(notes);
        });

        app.post("/api/notes", function (req, res){
            let newestNote = req.body;
            notes.push(newestNote);
            updateDbjson();
            return console.log("New note added:" + newestNote.title);
        });

        app.get("/api/notes:id", function(req, res){
            res.json(notes[req.params.id]);
        });

        app.delete("/api/notes:id", function(req, res){
            notes.splice(req.params.id, 1);
            updateDbjson();
            console.log("Note deleted with designated id" + req.params.id);
        });

        app.get('/notes', function(req,res){
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        app.get('*', function(req,res){
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        function updateDbjson(){
            fs.writeFile("db.db.json", JSON.stringify(notes), err =>{
                if (err) throw err;
                return true;
            });
        }
    });
}