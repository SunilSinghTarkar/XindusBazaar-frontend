let token=localStorage.getItem("jwtToken");
let wishListId=localStorage.getItem("wishListId");
let apiUrl = 'https://xindusbazaar-production.up.railway.app/api/';

let userName=localStorage.getItem("userName");
let userInput=document.getElementById("userName");
userInput.textContent="Hello "+ userName +"👋";


    // Get the form element
    let productForm = document.getElementById('product-form');

    productForm.addEventListener('submit', function (event) {
        
        event.preventDefault();

        // Extract data from the form
        let itemName = document.getElementById('itemName').value;
        let category = document.getElementById('category').value;
        let price = parseFloat(document.getElementById('price').value);

        let product={ 
            "itemName":itemName,
            "category":category,
            "price":price
          }

       console.log(product)    
       uploadProduct(product);
       productForm.reset();
    });


    async function uploadProduct(product) {
        try {
            const response = await fetch(`${apiUrl}items`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                 body: JSON.stringify(product),
            });
            
            if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
            const data = await response.json();
            
            console.log('Data received:', data);
            alert(data.itemName+" uploaded successfully.")
        } catch (error) {
            console.error('Request failed:', error.message);
            alert("failed to upload product!")
        }
    }

