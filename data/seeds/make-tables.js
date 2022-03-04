const users = [
  { username: 'austin',
    phoneNumber: 9083070978,
    password: '1234',
  },
  { username: 'ben',
    phoneNumber: 9083230178,
    password: '1234',
  },
]

const plants = [
  { nickname: 'sunflower',
    species: 'lorem ipsum',
    h20frequency: 'daily'
  },
  { nickname: 'rose',
    species: 'lorem thistle',
    h20frequency: 'daily'
},
]

exports.seed = async function (knex) {
  await knex('users').insert(users)
  await knex('plants').insert(plants)

  
};
