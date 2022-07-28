let meals = [];

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

document.querySelectorAll('#addBtn').forEach((btn) => {
    btn.addEventListener('click', addToPlan)
});

let createBtn = document.querySelector('#createPlan');

const createPlan = async (event) => {
    event.preventDefault();

    let creator = document.querySelector('#planCreator').value.trim();

    let name = document.querySelector('#planName').value.trim();

    // console.log(creator)
    // console.log(name)
    // console.log(meals)
    const response = await fetch('/api/test/createplan/test', {
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
        document.location.replace('/api/test/userplans');
        // console.log(creator, name, meals)
    } else {
        alert(response.statusText);
    };
};

createBtn.addEventListener('click', createPlan);