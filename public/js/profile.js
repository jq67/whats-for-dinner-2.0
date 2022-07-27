const deletePostHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log(id)
        // Collect values from the login form
         
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/test/mealplan/${id}`, {
            method: 'DELETE',
        });
    
        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/api/test/userplans');
        } else {
            console.log(response);
        };
    };
};

document.querySelectorAll('.delbtn').forEach((btn) => {
    btn.addEventListener('click', deletePostHandler)
});