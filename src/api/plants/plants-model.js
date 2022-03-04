const db = require('../../../data/dbConfig');

function find(){
    return db('plants')
}

function findBy(filter){
    return db('plants').where(filter)
}

function findById(id){
    return db('plants')
        .where('id', id).first()
}

async function add(plant){
    const [id] = await db('plants').insert(plant)
    return findById(id)
}

function update(id, changes) {
  return db('plants')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

async function remove(id) {
  const deleted = await db('plants')
    .where('id', id)
    .del();
  return deleted
}

module.exports = {
    find,
    findBy,
    findById,
    update,
    remove,
    add
}