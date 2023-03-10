const router = require('express').Router();
const { Product, User, Category, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all products and JOIN with user data
    const productData = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const products = productData.map((product) => product.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      products, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/review', async(req,res) => {
  try{
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    })

    const review = reviewData.map((review) => review.get({ plain: true }));

    res.render('review', {
      review,
      logged_in: req.session.logged_in
    })
  } catch(err){
    res.status(500).json(err)
  }
})

router.get('/product/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const product = productData.get({ plain: true });

    res.render('product', {
      ...product,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// Collects the category for the jewellery products
router.get('/category/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Product }],
    });

    const category = categoryData.get({ plain: true });

    res.render('post', {
      ...category,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/review/:id', async(req, res) => {
  try{
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ],
    })

    const review = reviewData.get({plain: true});

    res.render('review', {
      ...review,
      logged_in: res.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;