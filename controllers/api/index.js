const router = require('express').Router();
const userRoutes = require('./userRoutes')

const productRoutes = require('./productRoutes')

const categoryRoutes = require('./categoryRoutes')

const reviewRoutes = require('./reviewRoutes')

router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)
router.use('/review', reviewRoutes)

module.exports = router;