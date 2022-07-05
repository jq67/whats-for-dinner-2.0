const sequelize = require('sequelize');
const recipeScraper = require('recipe-scraper');

const { Recipe } = require('../models');

const mealFuncObj = require('../seeds/mealData');
const mealData = mealFuncObj.mealData;

// function to call npm recipe-scraper package on all urls in mealData seed
const recipeSeeding = () => {
  const { response } = require('express');
  for (let i = 0; i < 11; i++) {
    // console.log(i + mealData[i].link);
   let recipeURL = mealData[i].link;
   recipeScraper(`${recipeURL}`).then(data => {
     console.log(data);
     const strInst = data.instructions.join(' ');
     const ingreds = data.ingredients.toString();
     const instrs = strInst.toString();

     const recipe = Recipe.create({ 
      name: data.name,
      description: data.description,
      ingredients: ingreds,
      instructions: instrs,
      image: data.image,
      link: recipeURL,
     })
    // return recipe;
  }).catch(error => {
    // console.log('===============================================================================================================================');
    console.log('No recipe data exists!')
  }); 
  }
}

// manual seeding 10 recipes due to scraper unreliablility;
const recipes = 
[
  {
    'name': 'Easy Slow Cooker White Chicken Chili',
    'description': 'The slow cooker does all the work with this easy, flavorful, and healthy white chicken chili. This "dump and go" dinner will become a family favorite!',
    'ingredients': '1 yellow onion, 2 cloves garlic, 1 jalapeño (optional), 1 boneless skinless chicken breast (about 3/4 lb.), 1 16oz. jar salsa verde, 2  15oz. cans cannellini beans, 1 15oz. can pinto beans, 1 Tbsp ground cumin, 1 tsp dried oregano, ¼ tsp cayenne pepper, ¼ tsp freshly ground black pepper, 2 cups chicken broth, 4 oz. Monterey Jack cheese shredded',
    'instructions': 'Dice the onion and mince the garlic. Slice the jalapeńo lengthwise, scrape out the seeds with a spoon, then dice. Place the onion, garlic, jalapeño, and chicken breast in the bottom of a slow cooker. Drain and rinse the cannellini beans and pinto beans, then add them to the slow cooker, along with the cumin, oregano, cayenne, and freshly ground black pepper. Pour the salsa over top. Pour two cups of chicken broth over the contents in the cooker and then give everything a brief stir. Place the lid on the slow cooker and cook on high for four hours, or on low for eight hours. After four hours on high, or eight hours on low, carefully remove the chicken breast from the slow cooker and use two forks to shred the meat. Return the meat to the slow cooker. Stir the chili, slightly mashing the beans with the back of the spoon as you stir. The mashed beans will help thicken the chili. Serve the chili topped with shredded Monterey Jack cheese. Other optional toppings include fresh cilantro, diced avocado, freshly squeeze lime, or tortilla chips.',
    'image': 'https://www.budgetbytes.com/wp-content/uploads/2015/01/Slow-Cooker-White-Chicken-Chili-above-spoon.jpg',
    'link': 'https://www.budgetbytes.com/slow-cooker-white-chicken-chili/'
  },
  {
    'name': 'Vegan Curried Pumpkin Lentil Soup',
    'description': 'Vegan pumpkin lentil soup made with coconut milk, delicious spices and plenty of pumpkin flavor. The perfect protein-packed lunch or dinner!',
    'ingredients': '½ tablespoon olive oil, 1 white onion, diced, 1 large carrot, sliced, 3 cloves garlic, minced, ½ tablespoon fresh grated ginger, 1 tablespoon mild yellow curry powder, Optional: ¼ teaspoon cayenne (only if you like a little heat), 3 cups water or vegetarian broth, 1 cup green or brown lentils, sorted and rinsed, 1 (15 ounce) can light coconut milk (reserve 2 tablespoons for drizzling on top of soup), 1 (15 ounce) can pumpkin puree, 1/2 teaspoon salt, plus more to taste, Freshly ground black pepper. To garnish: Extra fresh diced cilantro, Greek yogurt, Salsa (it\'s so good!), Pita or naan bread for dipping',
    'instructions': '  Add olive oil in a large pot and place over medium high heat. Once oil is hot, add in onion, carrot and garlic. Sauté until onions are translucent, about 3-5 minutes. Bring heat to medium low and add in ginger, curry powder and cayenne, stir together for 30 seconds.  Next stir in water/broth, coconut milk, lentils and pumpkin puree. If you\'d like, you can reserve 2 tablespoons of coconut milk for drizzling on top once the soup is done. Season the soup with salt and freshly ground black pepper. Bring soup to boil, then reduce heat and simmer over medium low for 30 minutes or until lentils are soft and tender. The soup should thicken up. (If it gets too thick for your liking, then feel free to add an extra ½ cup-1 cup water or broth.) Taste and adjust seasonings as necessary, adding additional salt and pepper if needed. Serve soup immediately and drizzle in a circle with leftover coconut milk. Garnish with cilantro, yogurt and salsa if you\'d like. I love to serve mine with naan or pita bread for dipping. Serves 4.',
    'image': 'https://www.ambitiouskitchen.com/wp-content/uploads/2021/09/Vegan-Curried-Pumpkin-Lentil-Soup-Horizontal.png',
    'link': 'https://www.ambitiouskitchen.com/pumpkin-lentil-soup/'
  },
  {
    'name': 'Caramelized Onion, Fig & Goat Cheese Pizza with Arugula',
    'description': 'Amazing fig and goat cheese pizza with caramelized onion, goat cheese and an easy homemade 100% whole wheat pizza dough. Everyone loves this recipe!',
    'ingredients': 'For the whole wheat pizza dough: ¾ cup warm Unsweetened Original Almond Breeze Almondmilk, 110-115 degrees F, ½ tablespoon honey, 1 tablespoon olive oil, 2 1/4 teaspoons instant yeast (1 packet), 2 cups whole wheat pastry flour, 1/2 tablespoon yellow cornmeal, plus extra for dusting, 1 teaspoon salt, Olive oil, for the crust, For the pizza toppings: 2 teaspoons olive oil, 1 yellow onion, sliced, 12 dried mission figs, stems trimmed, cut into quarters, 5 ounce package soft fresh goat cheese, coarsely crumbled, 1-2 cups fresh arugula, Balsamic reduction: 1/2 cup good-quality balsamic vinegar',
    'instructions': 'First start by making the crust: In a large bowl of an electric mixer, mix almond milk, yeast, honey and olive oil together. Let it sit for a few minutes; you will know your yeast has activated if it begins to foam and bubble after a few minutes. If it doesn\'t start to foam or bubble, start over as this is critical to making good dough. After just a few minutes, mix in whole wheat pastry flour, cornmeal and salt with a wooden spoon. Place dough hook on mixer and knead dough on medium speed for 8 minutes. Dough should form into a nice ball and be slightly sticky. (If you don\'t want to use an electric mixer, you can use your hands to knead the dough for 8-10 minutes.) Next place dough in a medium bowl lightly oiled with olive oil. Cover with plastic wrap and a towel and let rise for 1 hour or until dough has doubled in size. It\'s better if it\'s in a slightly warm place. While the dough is rising, you can make the caramelized onions: place olive oil a small saucepan over medium heat, add onion slices, spread the onions evenly out in the pan and cook, stirring occasionally. Check onions every 10-15 minutes until they have completely caramelized and turned golden in color. This usually takes 20-30 minutes total. After dough has doubled, preheat oven to 450 degrees F. Add parchment paper to a large baking sheet, or grease with nonstick cooking spray. Grease 11x9 or 8x12 inch baking sheet generously with olive oil or nonstick cooking spray. Sprinkle with a little cornmeal. Dump dough into an oil rimmed baking sheet, and stretch dough out towards the edges. Cover with plastic wrap and let it sit for another 20 minutes. It\'s okay if it doesn\'t stretch all the way to the edges right way, it just needs a little time to rest. Make the balsamic reduction: Add balsamic vinegar to a small pot and place over low heat. Allow it to simmer for 10-15 minutes until reduced by half, then set aside until you are ready to enjoy on the pizza. After dough rests, pull again towards the edges of the pan so that it forms a nice small crust. Brush crust with a little olive oil. Bake for 10-15 minutes, until pizza is slightly golden brown on the crust and bottom. Brush dough or drizzle with just a little bit of olive oil, spread caramelized onions over the pizza, along with the figs and goat cheese. Bake for 5 more minutes or until onions and figs are warmed through. Remove pizza from oven and top with arugula and drizzle with balsamic reduction. Cut into 10-12 squares and enjoy!',
    'image': 'https://www.ambitiouskitchen.com/wp-content/uploads/2017/04/Monique-Fig-Goat-Cheese-Pizza-4.jpg',
    'link': 'https://www.ambitiouskitchen.com/caramelized-onion-fig-goat-cheese-pizza-arugula-video/'
  },
  {
    'name': 'Cilantro Pesto Pasta with Roasted Pumpkin & Honey',
    'description': 'Cilantro pesto pasta with roasted pumpkin, honey & red chili flakes. This vegetarian pumpkin pesto pasta recipe is the best main dish or side!',
    'ingredients': 'For the honey roasted pumpkin: 3-4 cups cubed pumpkin, 1 tablespoon olive oil, 1 tablespoon honey, ½ teaspoon chili powder, 1/4 teaspoon garlic powder, ¼ teaspoon cayenne pepper, Freshly ground salt and pepper. For the pesto: 1 heaping handful cilantro (about 1 small bunch cilantro), 2 cups spinach, 1/2 cup roasted pistachios (unsalted is best), 2 tablespoons roasted pumpkin seeds (pepitas), 1 small garlic clove, 2-3 tablespoons olive oil, 2 tablespoons water to thin the pesto, 1 tablespoon fresh lime juice (from ½ lime), 1/4 teaspoon salt, plus more to taste, Freshly ground black pepper. For the pasta: 10 ounces cavatappi pasta (or pasta of choice). To garnish: 1-2 tablespoons honey, Roasted pumpkin seeds (pepitas), ½ teaspoon red chili flakes (add ½ teaspoon more if you like it a little more spicy!), Freshly ground salt and pepper',
    'instructions': 'Preheat the oven to 375 degrees F. Line a large baking sheet with parchment paper. Place pumpkin cubes on the prepared pan. If you don\'t know how to cube a pumpkin, refer to this tutorial. Drizzle with olive oil and sprinkle with honey, chilli powder, garlic powder, cayenne pepper and salt and pepper. Use tongs or clean hands to toss the pumpkin with the spices and honey so that it\'s evenly coated. Roast for 30-35 minutes or until pumpkin cubes are fork tender, flipping halfway through to ensure even cooking.  While the pumpkin is roasting, you can make the pesto: add the spinach, cilantro, pistachios, pepitas, garlic, olive oil, water, lime juice, salt and pepper to a food processor and process until smooth, scraping down the sides and processing again, as necessary. Next cook your pasta according to the directions on the package. When done, drain and add to a large bowl and stir in the pesto so that all the noodles are coated. Finally add in the roasted pumpkin. Drizzle with honey and garnish with roasted pepitas and red chili flakes. Taste and add salt and pepper as necessary. Give it a small toss again and then enjoy. This recipe is fabulous with grilled chicken or bacon tossed in, or with salmon. Serves 4 as a main or 6 as a side. Enjoy!',
    'image': 'https://www.ambitiouskitchen.com/wp-content/uploads/2021/10/Pasta-FB.png',
    'link': 'https://www.ambitiouskitchen.com/cilantro-pesto-pasta-with-roasted-pumpkin/'
  },
  {
    'name': 'Healing Ginger Coconut Chicken Brown Rice Soup',
    'description': 'Healing ginger chicken soup simmered with fresh ginger, turmeric, creamy coconut milk & hearty brown rice. The perfect meal for winter!',
    'ingredients': '1 tablespoon toasted sesame oil (or olive oil), ½ cup diced green onion, 2 medium carrots, sliced, 1 tablespoon fresh grated ginger, 1 tablespoon fresh grated turmeric, 6 cloves garlic, minced, 6 cups low sodium chicken broth (or 8 if you like it broth-y), 1 (15 ounce) can light coconut milk, ¼ cup low sodium soy sauce, 1 tablespoon red chili paste (if you like a little heat), 1 pound boneless skinless chicken thighs, ¾ cup jasmine brown rice (or sub jasmine white rice), 1-2 teaspoons fish sauce, 1 lime juiced. To garnish: ⅓ cup diced green scallions, ⅓ cup chopped cilantro, ¼ cup torn mint, ¼ cup torn basil, 3-4 tablespoons chopped roasted peanuts.',
    'instructions': 'Add 1 tablespoon sesame oil to a large dutch oven or pot and place over medium high heat. Add in the green onion, carrots, ginger and turmeric; sauté for 3-5 minutes. During the last 30 seconds-1 minute of cooking, add in the garlic and sauté until fragrant. Slowly add in the chicken broth, coconut milk, soy sauce and red chili paste until well combined. Add in the chicken thighs, brown rice and stir, making sure the chicken is covered with the broth. Bring to a boil, then reduce heat and simmer for 25-30 minutes, stirring occasionally so the rice doesn\'t stick to the bottom of the pan at any point. After 25-30 minutes, use a slotted spoon to remove chicken from the pot and transfer to a cutting board, but keep the heat in the pot as the rice will need to continue cooking. Use two forks to shred chicken then add back to the pot. If you like a brothier soup, now is the time to add more chicken broth. Cover soup with lid, continuing to simmer on low for 10-15 minutes until rice is tender. Finally to finish, add fish sauce and lime juice and simmer for just a few more minutes. Taste and adjust seasonings as necessary. Pour into bowls, then garnish with a little of each of the following: scallions, cilantro, mint, basil and peanuts. Serves 4-6. Enjoy.',
    'image': 'https://www.ambitiouskitchen.com/wp-content/uploads/2022/01/Soup-FB.png',
    'link': 'https://www.ambitiouskitchen.com/ginger-chicken-soup/'
  },
  {
    'name': 'Easy Slow Cooker White Chicken Chili',
    'description': 'The slow cooker does all the work with this easy, flavorful, and healthy white chicken chili. This "dump and go" dinner will become a family favorite!',
    'ingredients': '1 yellow onion, 2 cloves garlic, 1 jalapeño (optional), 1 boneless skinless chicken breast (about 3/4 lb.), 1 16oz. jar salsa verde, 2  15oz. cans cannellini beans, 1 15oz. can pinto beans, 1 Tbsp ground cumin, 1 tsp dried oregano, ¼ tsp cayenne pepper, ¼ tsp freshly ground black pepper, 2 cups chicken broth, 4 oz. Monterey Jack cheese, shredded',
    'instructions': 'Dice the onion and mince the garlic. Slice the jalapeńo lengthwise, scrape out the seeds with a spoon, then dice. Place the onion, garlic, jalapeño, and chicken breast in the bottom of a slow cooker. Drain and rinse the cannellini beans and pinto beans, then add them to the slow cooker, along with the cumin, oregano, cayenne, and freshly ground black pepper. Pour the salsa over top. Pour two cups of chicken broth over the contents in the cooker and then give everything a brief stir. Place the lid on the slow cooker and cook on high for four hours, or on low for eight hours. After four hours on high, or eight hours on low, carefully remove the chicken breast from the slow cooker and use two forks to shred the meat. Return the meat to the slow cooker. Stir the chili, slightly mashing the beans with the back of the spoon as you stir. The mashed beans will help thicken the chili. Serve the chili topped with shredded Monterey Jack cheese. Other optional toppings include fresh cilantro, diced avocado, freshly squeeze lime, or tortilla chips.',
    'image': 'https://www.budgetbytes.com/wp-content/uploads/2015/01/Slow-Cooker-White-Chicken-Chili-above-spoon.jpg',
    'link': 'https://www.budgetbytes.com/slow-cooker-white-chicken-chili/'
  },
  {
    'name': 'Butternut Squash, Chickpea & Lentil Moroccan Stew',
    'description': 'Vegan Moroccan stew with tender butternut squash and protein-packed chickpeas & lentils. A wonderful plant-based dinner for the whole family!',
    'ingredients': '1 tablespoon olive or coconut oil, 1 medium white or yellow onion, chopped, 6 cloves of garlic, minced, 2 teaspoons cumin, 1 teaspoon cinnamon, 1 teaspoon ground turmeric, 1/4 teaspoon cayenne pepper, 1 (28 ounce) can crushed tomatoes, 2 1/2 cups organic low sodium vegetable broth, 1 (15 ounce) can chickpeas, rinsed and drained, 4 cups cubed butternut squash (from about 2 pounds butternut squash), 1 cup green lentils, rinsed well, 1/2 teaspoon salt, Freshly ground black pepper, fresh juice of 1/2 a lemon, 1/3 cup chopped cilantro, Optional: a few basil leaves, chopped',
    'instructions': 'Heat the oil in a large pot over medium-high heat. Add the onion and garlic; cook a few minutes or until the onion becomes softened. Next stir in cumin, cinnamon, turmeric, cayenne; cook for 30 seconds to a minute until spices are fragrant. Add tomatoes, broth, chickpeas, butternut squash, lentils, and salt and pepper. Bring to a boil, then cover, reduce heat to low and simmer for about 20 minutes or until butternut squash is tender and lentils are fully cooked. Stir in lemon juice and sprinkle with cilantro and basil, if desired. Serve with a dollop of yogurt if you aren\'t vegan. Makes 4 servings - about 2 cups each.',
    'image': 'https://www.ambitiouskitchen.com/wp-content/uploads/2020/10/Butternut-Squash-Chickpea-Lentil-Moroccan-Stew-5.jpg',
    'link': 'https://www.ambitiouskitchen.com/butternut-squash-chickpea-lentil-moroccan-stew/'
  },
  {
    'name': 'Crispy Broccoli Sweet and Spicy Sesame Tahini Noodles',
    'description': 'Sweet and spicy vegan tahini noodles take just 30 minutes to make for the perfect weeknight dinner! Enjoy as-is or with your fav proteins.',
    'ingredients': 'For the sweet and spicy sauce: 3 tablespoons low sodium soy sauce, 1/3 cup tahini (we use Soom), 2-3 tablespoons brown sugar (or sub coconut sugar or honey), 1/2 tablespoon rice vinegar, 1 tablespoon fresh grated ginger, 2 cloves garlic, minced, 1-2 tablespoons hot chili paste (such as sambal oelek), 2-4 tablespoons water, to thin the sauce. For the broccoli: 1 tablespoon sesame oil (preferably toasted sesame oil), 1 large head of broccoli, chopped into florets (about 4-5 cups broccoli florets), Freshly ground salt and pepper. For the noodles: 10 ounce rice noodles (or sub spaghetti or linguine). For serving: Red pepper flakes, if you want it extra spicy, Toasted sesame seeds',
    'instructions': 'First make your sweet and spicy sauce: in a medium bowl, whisk together the soy sauce, tahini, brown sugar, rice vinegar, ginger, garlic, hot chili paste and water together. You want the sauce to be pourable and fairly thin, like a salad dressing, it will thicken as it sits a bit. Set aside. Add 1 tablespoon sesame oil to a large pot and place over medium heat. Add in broccoli florets, season with a little salt and pepper and cook, stirring frequently, for 6-8 minutes or until broccoli is slightly tender but still has a bite. The broccoli should get somewhat charred and slightly golden and crispy in places. While the broccoli is cooking you can make your rice noodles according to the directions on the package. Then drain and set aside. Once the broccoli is done cooking, you can add in your rice noodles and the tahini sauce. Toss well to combine and coat the noodles and broccoli with the sauce. Garnish with sesame seeds and extra red pepper flakes if you want it a little spicier. Serves 4.',
    'image': '',
    'link': 'https://www.ambitiouskitchen.com/vegan-tahini-noodles/'
  },
  {
    'name': 'Cozy Roasted Vegetable Butternut Squash Lasagna',
    'description': 'Cozy roasted vegetable butternut squash lasagna packed with veggies, warming spices and layers of melted cheese. Comfort food at its finest!',
    'ingredients': 'For the roasted veggies: 1 red bell pepper, julienned or cut into chunks, 1 yellow or orange bell pepper, julienned or cut into chunks, 1 red onion, thinly sliced, 8 ounces baby bella mushrooms, sliced, 2 medium zucchini, sliced and quartered, ½ teaspoon garlic powder, Freshly ground salt and pepper, 2 tablespoons olive oil. For the butternut squash layer: 1 large butternut squash (at least 3 pounds), 2/3 cup milk (I like unsweetened almond milk, but any milk will work), 1 tablespoon brown sugar or coconut sugar (or pure maple syrup), ¼ teaspoon cinnamon, ¼ teaspoon nutmeg, ¼ teaspoon ginger, ¼ teaspoon allspice, 1/2 teaspoon salt, Freshly ground black pepper. For the noodles: 10 lasagna noodles. For the ricotta mixture: 1 (15 ounce) container ricotta, 1 egg, 1/2 teaspoon salt, Freshly ground black pepper. For the layers: 3 cups shredded mozzarella cheese, divided (approximately 12 ounces), 1/2 cup grated parmesan cheese, divided. To garnish: Fresh chopped parsley',
    'instructions': 'Preheat the oven to 400 degrees F. Add all of the veggies for roasting to a large baking sheet lined with parchment paper. Drizzle with 2 tablespoons of olive oil and sprinkle with garlic powder, salt and pepper. Use your hands to toss the veggies together then spread them out in an even layer. Set aside while you prep your butternut squash. Use a sharp knife to cut off both ends of a butternut squash, you\'ll cut about ¼-½ inch off each end. Next cut the butternut squash in half vertically. Place the butternut squash upright or vertically on a wooden cutting board that\'s very secured to your counter. We don\'t want the cutting board or squash to wobble as you cut it. Use your knife to cut the butternut squash vertically down the middle. Use a spoon to scoop out the seeds of the cut butternut squash. Place the butternut squash halves flesh side down on a separate medium baking sheet lined with parchment paper. Place both veggies and squash in the oven on two different racks. Roast the veggies for 30 minutes or until they are slightly golden then remove to cool down. The butternut squash will take slightly longer; about 1 hour total or until the squash is very fork tender. Set aside to cool for a little bit before scooping out the flesh. Keep heat in the oven. Make the butternut squash sauce: transfer the flesh of the butternut squash to a high powered blender or bowl of a food processor. Add in milk, brown or coconut sugar, cinnamon, nutmeg, ginger, allspice and salt and pepper. Blend until smooth and set aside. Do this step while the veggies and squash roast: Bring a large pot of water to a boil. Cook the lasagna noodles for 5-6 minutes, then drain. Immediately lay the noodles flat on an oiled baking sheet or cutting board so you can easily assemble the lasagna when ready. Another option is to soak the lasagna noodles in very warm (hot) water for 20-30 minutes if you do not want to boil them. (Note: you can also use no-cook lasagna noodles, but they aren\'t my favorite!). In the small bowl, add the ricotta, egg, salt and pepper. Mix until well combined. Set aside. To assemble the lasagna, spread 3/4 cup of butternut squash mixture over the bottom of a 9x13 inch baking dish. Place 5 of the cooked lasagna noodles on top, laying 4 vertically and 1 horizontally. Spread half of the ricotta cheese mixture on top of the noodles, followed by half of the roasted veggies, then top with ¾ cup shredded mozzarella. Next, add 1 heaping cup of the butternut squash mixture on top of the mozzarella and then sprinkle with 1/4 cup of parmesan cheese. Repeat layers once more: adding remaining noodles (4 vertically & 1 horizontally), the rest of the ricotta cheese mixture, remaining roasted veggies, ¾ cup shredded mozzarella, then top with any remaining butternut squash sauce and 1/4 cup parmesan cheese. Finally, top with remaining 1 ½ cups shredded mozzarella cheese. Cover with foil and bake for 25 minutes. Remove foil and bake another 15-20 minutes until cheese starts to brown just a bit. Garnish with extra parmesan and either chopped basil or parsley. Cool for 15-20 minutes before cutting and serving. Serves 12.',
    'image': 'https://www.ambitiouskitchen.com/wp-content/uploads/2021/11/Cozy-Roasted-Vegetable-Butternut-Squash-Lasagna-5long.jpg',
    'link': 'https://www.ambitiouskitchen.com/roasted-vegetable-butternut-squash-lasagna/'
  },
  {
    'name': 'Slow Cooker Hamburger Stew',
    'description': 'This super easy Slow Cooker Hamburger Stew is simple, comforting food at its best. And the leftovers are even better the next day!',
    'ingredients': '2 lbs. russet potatoes, 1/2 lb. carrots (about 4 carrots), 1 yellow onion, 2 cloves garlic, ½  tsp dried rosemary, ½  tsp dried thyme, 1/4 tsp freshly cracked black pepper, 1 lb. ground beef, 1 15oz. can stewed tomatoes, 2 cups beef broth, 2 Tbsp Worcestershire sauce, 1 Tbsp soy sauce, 1 cup frozen peas',
    'instructions': 'Peel and dice the potatoes into 1-inch cubes. Peel and slice the carrots. Dice the onion and mince the garlic. Add the potatoes, carrots, onion, garlic, rosemary, thyme, and pepper to a slow cooker (4 quarts or larger). Brown the ground beef in a skillet, then drain off the excess fat. Add the browned and drained beef to the slow cooker along with the can of stewed tomatoes (with juices). Finally, add the beef broth, Worcestershire sauce, and soy sauce to the slow cooker. Give the contents of the slow cooker a brief stir to make sure everything is evenly combined (the broth may not fully cover the other ingredients). Place the lid on the slow cooker and cook on high for four hours, or low for eight hours. After cooking on high for four hours or low for eight hours, remove the lid and stir the stew. Use the back of a spoon to slightly mash some of the potatoes, which will help thicken the stew. Add the frozen peas (no need to thaw) and stir to combine into the stew. Taste the stew and add extra salt if needed (I did not add any, this will depend on the salt content of your beef broth). Serve hot with bread for dipping!',
    'image': 'https://www.budgetbytes.com/wp-content/uploads/2020/09/Slow-Cooker-Hamburger-Stew-ladle.jpg',
    'link': 'https://www.budgetbytes.com/slow-cooker-hamburger-stew/'
  }
]

// seed alt recipe data;
const altrecipeSeed = () => {
  for (let m = 0; m < recipes.length; m++) {
    let recName = recipes[m].name;
    let recDesc = recipes[m].description;
    let recIngr = recipes[m].ingredients;
    let recInstr = recipes[m].instructions;
    let recImg = recipes[m].image;
    let recURL = recipes[m].link;
    // creating new class for every name in the mealData array;
    const recipe = Recipe.create({ 
      name: recName,
      description: recDesc,
      ingredients: recIngr,
      instructions: recInstr,
      image: recImg,
      link: recURL,
    });
    // console.log(recipe);
  }
}

module.exports = {
  // recipeSeeding,
  altrecipeSeed,
};