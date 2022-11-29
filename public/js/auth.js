const myForm = document.querySelector('form');

const url = 'http://localhost:3000/api/v1/auth';

async function handleCredentialResponse(response) {
    try {
        const body = { id_token: response.credential };
        
        const request = await fetch(`${ url }/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const { user, token } = await request.json();
        localStorage.setItem('email', user.email)
        localStorage.setItem('token', token);
        window.location = 'chat.html';
    } catch (error) {
        console.warn(error);
    }
}

myForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        email: myForm.querySelector('#email').value,
        password: myForm.querySelector('#password').value,
    };
    
    try {
        const response = await fetch(`${ url }/login`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if ( response.status === 200 ) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            window.location = 'chat.html';
        }
    } catch (error) {
        console.log('Error');
        console.log(error); 
    }
});

const btnSignOut = document.getElementById('google-signout');

btnSignOut.addEventListener('click', () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke( localStorage.getItem('email'), (done) => {
        localStorage.clear();
        location.reload();
    });
});