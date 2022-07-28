// array of meals to add to plan
let meals = [];

let createBtn = document.querySelector('#createPlan');

// event listener to update meal array
const addToPlan = (e) => {
    e.preventDefault();
    e.target.textContent = "Added to Plan!"
    const id = e.target.getAttribute('data-id');
    console.log(id)
    meals.push(id)
    console.log(meals)
    e.target.removeEventListener('click', addToPlan)
    e.target.addEventListener('click', removeFromPlan)
    return
};

// event listener to update meal array
const removeFromPlan = (e) => {
    e.preventDefault();
    e.target.textContent = "Removed from Plan!"
    const id = e.target.getAttribute('data-id');
    let index = meals.indexOf(id);
        if (index > -1) {
            meals.splice(index, 1)
        };
    console.log(meals)
    e.target.removeEventListener('click', removeFromPlan)
    e.target.addEventListener('click', addToPlan)
    return
};

// event listener to create plan with meal array and creator/name fields
const createPlan = async (event) => {
    event.preventDefault();

    let creator = document.querySelector('#planCreator').value.trim();

    let name = document.querySelector('#planName').value.trim();

    console.log(creator)

    console.log(name)

    if (creator == '') {
        alert("Creator field should not be empty")
        return
    }

    if (name == '') {
        alert("Name field should not be empty")
        return
    }

    if (meals.length == 0) {
        alert("Please select atleast one meal to add to the plan")
        return
    }

    const response = await fetch('/api/plan/new', {
        method: 'POST',
        body: JSON.stringify(
            {
                name,
                creator,
                meals                
            }
        ),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // If successful, redirect the browser to the profile page
        alert("Plan created sucessfully!")
        document.location.replace('/api/users/profile');
    } else {
        alert(response.statusText);
    };
};

createBtn.addEventListener('click', createPlan);

document.querySelectorAll('#addBtn').forEach((btn) => {
    btn.addEventListener('click', addToPlan)
});