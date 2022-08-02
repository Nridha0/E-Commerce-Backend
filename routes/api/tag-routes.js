const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  // find all tags
  // be sure to include its associated Product data
router.get('/', (req, res) => {
  Tag.findAll(
    {
      include:{ 
        module: Product,
        attributes:['product_name', 'price', 'stock', 'category_id']
      }
    }
    )
    .then(TagData => res.json(TagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne ({
    where:{
      id:req.params.id
    },
    include:{
      module: Product,
      //attributes:['product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(NewTag => res.json(NewTag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
  


router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    Tag_name: req.body.categoryName
  })
  .then((NewTag) => res.json(NewTag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((UpdatedTag) => res.json(UpdatedTag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id: req.params.id
    }
  })
  .then((NewTag) => {
    if (!NewTag){
      res.status(404).json ({ message: 'No post found by that id.'});
      return;
     }
     res.json(NewTag)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
