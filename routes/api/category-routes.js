const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');
const { findAll } = require('../../models/Category');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
 // find all categories
  // be sure to include its associated Products
  Category.findAll({
    
    include:[Product],  
})
  //.then(CategoryData => res.json(CategoryData))
  .then(Category => res.json(Category))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where:{
      id:req.params.id,
    },
   include: [Product],
  })
  .then(CategoryData=> res.json(CategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.categoryName
  })
  //.then(categoryAdd => res.json(categoryAdd))
  .then (Category => res.json(Category))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(categoryAdd => {
    if (!categoryAdd){
      res.status(404).json({ message: 'No Category found with this id'});
      return;
    }
    res.json(categoryAdd)
  })
  .catch(err => {
    
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(CatogeryDelete => {
    if (!Category){
      res.status(404).json ({ message: 'No Category found by that id.'});
      return;
     }
     res.json(CatogeryDelete)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
