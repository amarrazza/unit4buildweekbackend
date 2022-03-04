const router = require('express').Router();
const Plants = require('./plants-model');
const { validatePlantId, validatePlant } = require('../middleware/plants-middleware');


router.get('/', async (req, res) => {
    // RETURN AN ARRAY WITH ALL THE USERS
    try{
      let plants = await Plants.find();
      res.status(200).json(plants);
    } catch{
      res.status(500).json({
        message: 'Error retrieving plants'
      })
    }

  });

router.get('/:id', validatePlantId, (req, res) => {
// RETURN THE USER OBJECT
// this needs a middleware to verify user id
res.json(req.plant);
});

router.post('/', validatePlant, async (req, res, next) => {
    // RETURN THE NEWLY CREATED USER OBJECT
    // this needs a middleware to check that the request body is valid
    let newPlant = req.body;
    try {
      let result = await Plants.add(newPlant);
      res.status(201).json(result);
      // res.status(201).json(result)
    }
    catch(err) {
      next(err);
    }
  
  });

  router.put('/:id', validatePlantId, validatePlant, (req, res, next) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    let { id } = req.params;
    Plants.update(id, req.body)
      .then(updatedPlant => {
        res.json(updatedPlant)
      }).catch(next)
  });

  router.delete('/:id', validatePlantId, (req, res, next) => {
    // RETURN THE FRESHLY DELETED USER OBJECT
    // this needs a middleware to verify user id
    let { id } = req.params;
    Plants.remove(id)
      .then(() => {
        res.json({
          message: 'plant deleted'
        })
      }
      ).catch(next);
  });

  module.exports = router;