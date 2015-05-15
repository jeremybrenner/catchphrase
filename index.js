var express = require("express"),
    app = express(),
    path = require("path"),
    _ = require("underscore"),
    bodyParser = require("body-parser");


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


var phrases = [

    {
        id: 0,
        word: "Parameter",
        description: "This is passed to a function as an argument"
    }, {
        id: 1,
        word: "Boolean",
        description: "A logic operator that returns true or false"
    }, {
        id: 2,
        word: "DOM",
        description: "The structure which includes a website and its associated components"
    }, {
        id: 3,
        word: "API",
        description: "The interface used for interaction"
    },

];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/public/views/home.html'));
});


app.get("/phrases", function(req, res) {
    res.send(JSON.stringify(phrases));
});

app.post("/phrases", function(req, res) {
    var newPhrase = req.body;
    newPhrase.id = phrases[phrases.length - 1].id + 1;
    phrases.push(newPhrase);
    res.send(JSON.stringify(newPhrase));
});

app.delete("/phrases/:id", function(req, res) {
    var targetId = parseInt(req.params.id, 10);
    var targetItem = _.findWhere(phrases, {
        id: targetId
    });
    var index = phrases.indexOf(targetItem);

    phrases.splice(index, 1);
    res.send(JSON.stringify(targetItem));
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log("listening on port 3000");
});