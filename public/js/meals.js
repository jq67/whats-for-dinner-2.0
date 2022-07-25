let meals = []

const addToPlan = (e) => {
    e.target.textContent = "Added to Plan!"
    const id = e.target.getAttribute('data-id');
    console.log(id)
    meals.push(id)
    console.log(meals)
}

document.querySelectorAll('.addBtn').forEach((btn) => {
    btn.addEventListener('click', addToPlan)
});

let createBtn = document.querySelector('#createPlan')

const createPlan = async (event) => {
    event.preventDefault();

    let creator = 'jq'

    let name = 'browser made plan 1'

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
        document.location.replace('/');
    } else {
        alert(response.statusText);
    };
}

createBtn.addEventListener('click', createPlan)