const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    // Find all tags and include associated product data
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag
        }
      ]
    });

    // Send success response
    res.status(200).json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    // Find a single tag by its `id` and include associated product data
    const tag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          through: ProductTag
        }
      ]
    });

    // Send success response
    res.status(200).json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    // Create a new tag with the data from the request body
    const tag = await Tag.create(req.body);

    // Send success response
    res.status(200).json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // Update the tag's name with the data from the request body
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    // Send success response
    res.status(200).json(updatedTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    deleteTag = await Tag.destroy(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deleteTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
