const loginFormHandler = async (event) => {
  event.preventDefault();

  // TODO: select the correct elements
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  
  const display_name = document.querySelector('#name-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const avatar = document.querySelector('input[name="options-base"]:checked');

  let avatarName;
  if (avatar) {
    avatarName = `${avatar.id}.svg`
  }

  if (display_name && username && password && avatarName) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({display_name, username, password, avatarName }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// TODO: select the correct element
document
.querySelector(".login-form")
.addEventListener("submit", loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);