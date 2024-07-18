// frontend/script.js


    const loginForm = document.getElementById('loginForm');
    const errorText = document.getElementById('errorText');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Store token in localStorage
                localStorage.setItem('token', data.token);

                // Navigate to dashboard.html
                window.location.href = 'dashboard.html';
            } else {
                errorText.innerText = data.error;
            }
        } catch (error) {
            console.error('Login error:', error);
            errorText.innerText = 'Failed to login. Please try again.';
        }
    });

// dashboard protection

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html'; // Redirect to login if token is not present
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/dashboard', {
            headers: {
                'Authorization': token
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('dashboardMessage').innerText = data.message;
        } else {
            console.error('Error:', data.error);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});
