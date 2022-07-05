const { del } = require("express/lib/application");

const addMealHandler = async (event) => {
    event.preventDefault();
    
    const response = await fetch('/api/meals', { 
      method: 'POST',
      body: JSON.stringify({ dinner }), // need to change dinner to proper term
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/mealplan');
    } else {
      alert('Failed to create Meal');
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch('/api/projects/${id}', {
            method: 'DELETE' ,
        });

        if (response.ok) {
            document.location.replace('/mealplan');
        } else {
            alert ('Failed to delete meal plean');
        }
    }
};

document
    .querySelector('#addMeal')
    .addEventListener('click', addMealHandler);

document
    .querySelector('.mealplan-list')
    .addEventListener('click', delButtonHandler);