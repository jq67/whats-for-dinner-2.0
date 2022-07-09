let planArray = []

const addToPlan = () => {
    console.log(event.target.textContent)
    event.target.textContent = "Added to Plan!"
    const name = event.target.nextElementSibling.textContent;
    console.log(name)
    planArray.push(name)
    console.log(planArray)
}

document.querySelectorAll('.addBtn').forEach((btn) => {
    btn.addEventListener('click', addToPlan)
})

let createBtn = document.querySelector('#createPlan')

const createPlan = async (event) => {
    event.preventDefault();

    let meals = planArray.toString()
    console.log(meals)

    let creator = 1

    const response = await fetch('/api/plan/new', {
        method: 'POST',
        body: JSON.stringify({
            meals, creator
        }),
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