const addToProfile = async (e) => {
    const id = e.target.getAttribute('data-id');

    const response = await fetch(`/api/test/mealplan/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(

        // )
    });

    if (response.ok) {
        e.target.textContent = "Added to Profile!"
    } else {
        e.target.textContent = "Something went wrong"
        alert(response.statusText);
    }

}

document.querySelectorAll('.addBtn').forEach((btn) => {
    btn.addEventListener('click', addToProfile)
});