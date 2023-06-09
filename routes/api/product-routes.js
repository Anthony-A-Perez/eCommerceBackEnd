const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const products = await Product.findAll({
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag
        }
      ]
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag
        }
      ]
    });
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// create new product
// router.post('/', async (req, res) => {
//   try {
//     // Create a new product with the request body
//     const product = await Product.create(req.body);

//     // Send the newly created product as JSON response
//     res.status(201).json(product);
// } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
// }
//req.body should look like this...
 

router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there are product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds && req.body.tagIds.length > 0) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        // Bulk create the product tags
        return ProductTag.bulkCreate(productTagIdArr)
          .then(() => {
            // Send success response
            res.status(200).json(product);
          });
      }
      // If no product tags, just respond
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
})
// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});



router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    // Find the product by its id
    const product = await Product.findByPk(req.params.id);

    // If product not found, send error response
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product
    await product.destroy();

    // Send success response
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
