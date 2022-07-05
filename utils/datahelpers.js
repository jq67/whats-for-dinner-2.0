const recipeScraper = require('recipe-scraper');
const fs = require('fs');
const mealFuncObj = require('../seeds/mealData');

const mealData = mealFuncObj.mealData;

//declaring accumulators to be used elsewhere;
const mealURLs = [];
const mealNames = [];

// function to call npm recipe-scraper package on all urls in mealData seed
const scrapeRecipes = async () => {
  const { response } = require('express');
  // console.log(mealData);
  for (let i = 0; i < mealData.length; i++) {
  // console.log(mealData[i].recipe_url);
    mealURLs.push(mealData[i].recipe_url);
    mealNames.push(mealData[i].name);
  }
  // console.log(recipes);
  for (let r = 0; r < mealURLs.length; r++) {
    // console.log(mealURLs[r]);
    let recipeURL = mealURLs[r];
    recipeScraper(`${recipeURL}`).then(data => {
      // console.log('this function is being read');
      // console.log(data);
      return data;
    }).catch(error => {
      console.log(error);
      console.log('The scraper is not working!');
    });
  }
  // console.log(mealNames);
  // console.log(mealURLs);
}

// picks one random meal from list and outputs meal name in string;
const generateRandomMeal = () => {
  let meal = mealNames[Math.floor(Math.random()*mealNames.length)];
  return meal;
}

// generates an array of 7 strings of meal names;
const sevenDayMeals = () => {
  let mealplan = [];
  for (let d = 0; d < 7; d++) {
    let meal = generateRandomMeal();
    mealplan.push(meal);
  }
  return mealplan;
}

// function calls for testing individual functions;
// scrapeRecipes();
// generateRandomMeal();
// sevenDayMeals();

// listing all exports req'd to be used elsewhere;
module.exports = {
  scrapeRecipes, 
  generateRandomMeal,
  sevenDayMeals,
};
