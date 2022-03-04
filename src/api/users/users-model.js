const req = require('express/lib/request');
const db = require('../../../data/dbConfig');

function find(){
    return db('users')
}

function findBy(filter){
    return db('users').where(filter)
}

function findById(id){
    return db('users')
        .where('id', id).first()
}

async function add(user){
    const [id] = await db('users').insert(user)
    return findById(id)
}

async function update(id, changes) {
    const updatedUser = await db('users')
      .where({ id })
      .update(changes)
      .then(() => {
        return findById(id);
      });
    return updatedUser;
  }

module.exports = {
    find,
    findBy,
    findById,
    update,
    add
}