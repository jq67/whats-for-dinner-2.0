const addToProfile = async (e) => {
    const planid = e.target.getAttribute('data-id');

    const response = await fetch(`/api/test/mealplan/${planid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(

        // )
    });

    if (response.status == 400) {
        console.log(response.status)
        alert('You already have this plan on your profile!')
    } else if (response.status == 200) {
        console.log(response.status)
        e.target.textContent = "Added to Profile!"
    } else {
        e.target.textContent = "Something went wrong"
        alert(response.statusText);
    }

}

document.querySelectorAll('.addBtn').forEach((btn) => {
    btn.addEventListener('click', addToProfile)
});