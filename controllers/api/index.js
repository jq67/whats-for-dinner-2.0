const router = require('express').Router();
const planRoutes = require('./planRoutes');
const userRoutes = require('./userRoutes');
const testRoutes = require('./testRoutes');

router.use('/users', userRoutes);
router.use('/plan', planRoutes);
router.use('/test', testRoutes)

module.exports = router;