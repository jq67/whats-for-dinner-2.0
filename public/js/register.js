const signupFormHandler = async (event) => {
  event.preventDefault();
  
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const favoritefood = document.querySelector('#favorite-food').value.trim();
  
  if (username && email && password && favoritefood) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, favoritefood }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up');
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);