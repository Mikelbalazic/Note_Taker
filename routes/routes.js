const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {

        if (err) throw err; 

        let notes = JSON.parse(data);
        console.log(notes)
        app.get("/api/notes", function(req, res){
            res.json(notes);
        });

        app.post("/api/notes", function (req, res){
            let newestNote = req.body;
            let currentId = notes.length + 1;
            notes.push({id: currentId, title: newestNote.title, text: newestNote.text});
            updateDbjson();
            res.send("New note added!");
            return console.log("New note added:" + newestNote.title);
        });

        app.get("/api/notes/:id", function(req, res){
            res.json(notes[req.params.id]);
        });

        app.delete("/api/notes/:id", function(req, res){
            let correctId = 0;
            for(let i = 0; i < notes.length; i++){
                if(notes[i].id === Number(req.params.id)){
                    correctId = i; 
                }
            }
            notes.splice(correctId, 1);
            updateDbjson();
            res.send("Note deleted!");
            console.log("Note deleted with designated id" + req.params.id);
        });

        app.get('/notes', function(req,res){
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        app.get('*', function(req,res){
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        function updateDbjson(){
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), err =>{
                if (err) throw err;
                return true;
            });
        }
    });
}