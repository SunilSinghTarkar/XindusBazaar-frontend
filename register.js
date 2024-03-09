let apiUrl = 'https://xindusbazaar-1.onrender.com/api/';

let regirationForm=document.getElementById("registration-form");

regirationForm.addEventListener("submit",function(event){
event.preventDefault();
let name = document.getElementById('name').value;
let email = document.getElementById('email').value;
let password = document.getElementById('password').value;

   let user={
        "userName":name,
        "email":email,
        "password":password
      }
      registerUserAsync(user);
   regirationForm.reset();
})
async function registerUserAsync(userData) {
    try {
        const registrationResult = await registerUser(userData);
        console.log('Registration successful:', registrationResult);
        window.location.href="/login.html";

    } catch (error) {
        console.error('Registration failed:', error.message);
    }
}

async function registerUser(userData) {

    try {
        const response = await fetch(`${apiUrl}registers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if(response.status===400){
          document.getElementById("serverresponse-signUp").innerText="Email is already Registered!";
        }
        if (!response.ok) {
            
            throw new Error(`Registration failed: ${response.statusText}`);
        }
        const data = await response.json();

        // Return the registration result
        return data;
    } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
    }
}



//Code for user SignIn

    async function handleLogin(event) {
        event.preventDefault(); 
    
        const username = document.getElementById('signin-email').value;
     const password = document.getElementById('signin-password').value;

     let signInForm=document.getElementById("signIn-form");
     signInForm.reset();
        const base64Credentials = btoa(username + ':' + password);
        const headers = new Headers({
            'Authorization': 'Basic ' + base64Credentials
          });
          const requestOptions = {
            method: 'GET',
            headers: headers,
          };

      try {
        const response = await fetch(`${apiUrl}signIn`, requestOptions);
        if(response.status===401){
          document.getElementById("serverresponse-signIn").innerText="Invalid username or password!";
        }
        
        if (response.status === 202) {
          // Retrieve the JWT token from the response headers
          const token = response.headers.get('Authorization');
          const data = await response.json();
         console.log(data)
         
          if (token) {
            console.log('JWT Token:', token);
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.userName.split(" ")[0]);
            localStorage.setItem("wishListId",data.wishList.wishListId);
          
            
          } else {
            throw new Error('JWT Token not found in headers');
          }
          window.location.href="/product.html";
        }
         else {
          throw new Error('Login failed');
        }
        
      } catch (error) {
        console.error('Error:', error); // Handle errors
      }
    }
