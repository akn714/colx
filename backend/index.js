const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.urlencoded())


// getting lost found
app.get('/get_lost_found', (req, res)=>{
    let data = fs.readFileSync(__dirname + '/views/lost_found.json', 'utf-8');

    res.send(data);
})
app.get('/getLF', (req, res)=>{
    let data = fs.readFileSync(__dirname + '/views/lost_found.json', 'utf-8');

    res.send(JSON.stringify(data));
})
// adding a post to lost_found.json
app.post('/add_to_lost_found', (req, res)=>{
    
    // getting post details
    let author = req.body.author;
    let newdata = req.body.data;

    // generating unique id
    let get_unique_id = () => {
        uniqueId = Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
        return uniqueId
    }
    
    // reading from lost_found.json
    let data = fs.readFileSync(__dirname + '/views/lost_found.json', 'utf-8');
    let json = JSON.parse(data);
    
    // adding new entry to json
    json[get_unique_id()] = {
        "author" : author,
        "data" : newdata
    }

    // writing to lost_found.json
    fs.writeFileSync(__dirname + '/views/lost_found.json', JSON.stringify(json));
    
    // redirecting to home
    res.redirect('/');
});

// deleting a post from lost_found.json
app.post('/delete_from_lost_found', (req, res)=>{
    // getting id to delete
    let id = req.body.id;
    
    // reading from lost_found.json
    let data = fs.readFileSync(__dirname + '/views/lost_found.json', 'utf-8');
    let json = JSON.parse(data);
    
    // deleting a post having id = req.body.id
    delete json[id];
    
    // writing to lost_found.json
    fs.writeFileSync(__dirname + '/views/lost_found.json', JSON.stringify(json));
    
    // redirecting to home
    res.redirect('/');
});

// getting all complaints
app.get('/get_complaints', (req, res)=>{
    let data = fs.readFileSync(__dirname + '/views/complaints.json', 'utf-8');
    
    res.send(data);
})

// adding a new post to complaints.json
app.post('/add_to_complaints', (req, res)=>{
    
    // getting post details
    let author = req.body.author;
    let newdata = req.body.data;
    
    // generating unique id
    let get_unique_id = () => {
        uniqueId = Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
        return uniqueId
    }
    
    // reading from complaints.json
    let data = fs.readFileSync(__dirname + '/views/complaints.json', 'utf-8');
    let json = JSON.parse(data);
    
    // adding new entry to json
    json[get_unique_id()] = {
        "author" : author,
        "data" : newdata
    }

    // writing to complaints.json
    fs.writeFileSync(__dirname + '/views/complaints.json', JSON.stringify(json));
    
    // redirecting to home
    res.redirect('/');
});

// deleting a post from complaints.json
app.post('/delete_from_complaints', (req, res)=>{
    // getting id to delete
    let id = req.body.id;
    
    // reading from complaints.json
    let data = fs.readFileSync(__dirname + '/views/complaints.json', 'utf-8');
    let json = JSON.parse(data);
    
    // deleting a post having id = req.body.id
    delete json[id];
    
    // writing to complaints.json
    fs.writeFileSync(__dirname + '/views/complaints.json', JSON.stringify(json));
    
    // redirecting to home
    res.redirect('/');
});




// static middleware
app.use(express.static('views'));

// root router
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/index.html');
})

// listening the server
app.listen('3000', ()=>{
    console.log('server is running on port 3000...');
})