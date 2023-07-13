const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
      // be sure to include its associated Product data
    const tagData = await Tag.findAll({
      include: { model: Product}
    });

    if (!tagData) {
      res.status(200).json({ message: 'No tag matches this ID'});
      return;
    };

    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag with this ID!' });
      return;
    };

    res.status(200).json({ message: `Successfully deleted tag with ID: ${req.params.id}` })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
