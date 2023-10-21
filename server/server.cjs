const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'harris',
        password: 'Mikedabbing01!!',
        database: 'smartbraindb'
    }
});

const { handleRegister } = require('./route-handlers/register.cjs');
const { handleSignin } = require('./route-handlers/signin.cjs');
const { getProfile } = require('./route-handlers/profile.cjs');
const { handleImage } = require('./route-handlers/image.cjs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())


app.get('/', (_req, res) => { res.send('Welcome to the magic brain app!') });
app.post('/signin', handleSignin(db, bcrypt));
app.post('/register', handleRegister(db, bcrypt));
app.get('/profile/:id', getProfile(db));
app.put('/image', handleImage(db));

app.listen(3001)