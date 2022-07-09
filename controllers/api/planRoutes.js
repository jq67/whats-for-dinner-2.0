const router = require('express').Router();
const { Meal, User, Mealplan } = require('../../models');

// renders all posts on homepage
router.get('/meals', async (req, res) => {
    try {
        const mealData = await Meal.findAll();

        const meals = mealData.map((meal) => meal.get({ plain: true }));

        res.render('genmealplan', { meals, logged_in: req.session.logged_in, user_id : req.session.user_id });
    } catch (err) {
        res.status(500).json(err)
    }
});

// get all mealplans test
router.get('/mealtest', async (req, res) => {
    try {
        const planData = await Mealplan.findAll();

        const plans = planData.map((plan) => plan.get({ plain: true }));

        // const mealArr = plans[0].meals.split(",").map(Number);

        // const planMeals = await Meal.findAll({
        // where: {
        //     id: mealArr
        // }
        // });
        
        // const finalData = planMeals.map((meal) => meal.get({ plain: true }));
        
        // res.status(200).json(finalData)
        res.status(200).json(plans)
    } catch (err) {
        res.status(500).json(err)
    }
});

// create new mealplan
router.post('/new', async (req, res) => {
    try {
        const planData = await Mealplan.create({
            ...req.body,
        });
    
        res.status(200).json(planData)
    } catch (err) {
        res.status(500).json(err)
    }
});


// get specific mealplan
router.get('/:id', async (req, res) => {
    try {
        const planData = await Mealplan.findByPk( req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const plan = planData.get({ plain: true });

        res.status(200).json(plan);
    } catch (err) {
        res.status(500).json(err);
    };
});

// route to update mealplan

module.exports = router;