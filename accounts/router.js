const express = require('express');
const db = require('../data/dbConfig.js');

const router = express.Router();

// api/accounts
router.get('/', (req, res)=> {
    // SELECT * FROM accounts;
    db.select('*')
    .from('accounts')
    .then((accountsArray) => res.status(200).json({data: accountsArray }))
    .catch((err) => console.log(err));
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    //SELECT * FROM accounts WHERE id = id;
    db('accounts')
        .where('id', id)
        .then((account) => res.status(200).json({data: account }))
        .catch((err) => console.log(err));
})

router.post('/', (req, res) => {
    const accountDate = req.body;
    // INSERT INTO accouts (fields...) VALUES (values..)
    db('accounts')
        .insert(accountDate)
        .then((id) => res.status(201).json({data: id[0] }))
        .catch((err) => console.log(err));
})

router.put('/:id', (req,res) => {
    const { id } = req.params;
    const changes = req.body;
    // UPDATE accounts SET field = "new value" Where id = id;
    db('accounts')
    .where( { id } )
    .update(changes)
    .then(count => {
        if (count) {
            res.status(200).json({ update: count });
        } else {
            res.status(404).json({ message: 'invalid id' });
        }
    })
        
    .catch();
})

router.delete('/:id', (req,res) => {
    const { id } = req.params;

    db('accounts')
    .where('id', id)
    .del()
    .then((count) => {
        if (count > 0) {
            res.status(200).json({data: count });
        } else {
            res.status(404).json({ message: 'There was no record to delete'});
        }
    })
    .catch()
})

module.exports = router;