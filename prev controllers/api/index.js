const router = require('express').Router();
const UserRoutes = require('./UserRoutes');
const MealRoutes = require('./MealRoutes');

router.use('/users', UserRoutes);
router.use('/meals', MealRoutes);

module.exports = router;