const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

try {
  const categoryData = await Category.findAll({
    include: { model: Product },
});
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {

  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryById) {
      res.status(200).json({message: 'No categories found'});
      return;
    };

    res.status(200).json(categoryById);

  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  
  try {
    const category = await Category.create({
      category_name: req.body.category_name,
    })
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update({
      category_name: req.body.categoryName
    },
    {
      where: {
        id: req.params.id
      }
    });
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryById) {
      res.status(200).json({message: 'No categories found'});
      return;
    };

    res.status(200).json(updateCategory);
    console.log("Category updated!");

  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {

  try {
    const deleteCategory = await Category.destroy(
      {
        where: {
          id: req.params.id,
        }
      });

      if (!deleteCategory) {
        res.status(200).json({message: 'No categories found'});
        return;
      };

      res.status(200).json(deleteCategory);
      console.log('Category deleted!');

  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
