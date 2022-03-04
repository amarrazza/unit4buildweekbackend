const Plants = require('../plants/plants-model');

async function validatePlantId(req, res, next) {
    // DO YOUR MAGIC
    let { id } = req.params
    // let result = await Users.getById(id);
    // if(result == null){
    //   res.status(404).json({  message: 'This user could not be found'});
    // } else {
    //   req.user = result
    // }
  
    try {
      const plant = await Plants.findById(id);
      if(!plant){
        res.status(404).json({  message: 'plant not found'});
      } else {
        req.plant = plant;
        next()
      } 
    }catch(err) {
      res.status(500).json({
        message: 'Problem finding plant'
      })
    }
  
    console.log('validateUserId middleware');
  }

  function validatePlant(req, res, next){
    const { nickname, species, h20frequency } = req.body
    if (!nickname || !species || !h20frequency ){
        next({ message: 'nickname, species, and h20 frequency required', status: 422 })
    } else {
        next()
    }
}

  module.exports = {
      validatePlantId,
      validatePlant,
  }