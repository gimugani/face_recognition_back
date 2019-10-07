const express= require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const database = {
    users: [
        {   
            id: '1234',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined : new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);  
});

app.post('/signin', (req, res) =>{
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    }  else {
        res.status(400).json('error logging in');
    }
});

app.post('/register', (req, res) => {
    const {name, email} = req.body;
    database.users.push({
        id: '321',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    });  
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        } 
    }); 
    if (!found) {
        res.status(404).json("no such user");
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        } 
    }); 
    if (!found) {
        res.status(404).json("no such user"); 
    }

})
app.listen(3000, () => {
    console.log('app is running');
});


/*
/signin -> post = success/fail
/register --> post =user
/profile/:id --> get =user
/image --> put --> user
*/