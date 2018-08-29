const express = require('express'); // CommonJS modules
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
// the same as import express from 'express'; // ES2015 modules

const db = require('./data/db.js'); // <============================= this
const server = express();

// configure middleware for the server
server.use(express.json()); // this teaches express how to parse JSON information from req.body
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

// configure routing (routing is also a form of middleware)
server.post('/users', async (req, res) => {
  // http message = headers + body(data)
  const user = req.body; // this requires the express.json() middleware

  // check the password in the body is correct and if not, bounce them with a 401 http code.
  // if (req.body.password === 'secret') {
  //   // go ahead
  // } else {
  //   // bounced
  // }

  if (user.name && user.bio) {
    try {
      const response = await db.insert(user);
      res.status(201).json({ message: 'User created successfully' });
      // 200-299:success, 300-399:redirection, 400-499:client error, 500+:server error
    } catch (err) {
      // handle error
      res.status(500).json({
        title: 'Error adding the user',
        description: 'what happened',
        recoveryInstructions: 'this is what you can do to recover',
      });
    }
  } else {
    res.status(422).json({ message: 'A user needs both a name and bio' });
  }

  // db.insert(user)
  //   .then(response => response.status(201).json(response))
  //   .catch(err => res.status(500).json(err));
});

server.get('/', (req, res) => {
  res.send('Hello FSW12');
});

// using query string: http://localhost:9000/users ? sort=asc & field=name
server.get('/users', (req, res) => {
  const { sort, field } = req.query;

  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error('error', err);

      res.status(500).json({ message: 'Error getting the data' });
    });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params; // the same as: const id = req.params.id;

  db.remove(id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'No user with this id was found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.put('/users/:id', (req, res) => {
  db.update(req.params.id, req.body)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ message: 'update failed' }));
});

// start the server
server.listen(9000, () => console.log('\n== API on port 9k ==\n'));