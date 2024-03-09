let token=localStorage.getItem("jwtToken");
let apiUrl = 'https://xindusbazaar-1.onrender.com/api/';

let userName=localStorage.getItem("userName");
let userInput=document.getElementById("userName");
userInput.textContent="Hello "+ userName +"👋";

async function fetchDataWithToken() {
    try {
        const response = await fetch(`${apiUrl}items`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
        const data = await response.json();
        
        console.log('Data received:', data);
        displayItems(data);
    } catch (error) {
        console.error('Request failed:', error.message);
    }
}
fetchDataWithToken();

let container=document.getElementById("container");

function displayItems(data){
   container.innerHTML=null;
   data.forEach(itemData => {
    
        let div=document.createElement("div");
        div.classList.add("item");
        let img=document.createElement("img");
        let itemName=document.createElement("h3");
        let category=document.createElement("p");
        let price=document.createElement("p");
        let button=document.createElement("button");
        button.classList.add("wishlist-button");

        img.src="/product-coming-soon.png";
        img.alt = "image-"+itemData.itemId;
        itemName.textContent = itemData.itemName;
        category.innerText="Category: "+itemData.category;
        price.innerText="Price: ₹"+itemData.price;
        button.innerText="Add to WishList";
        
        button.addEventListener("click",()=>{
            addToWishList(itemData); 
            button.textContent="Added 📦";

        })
        div.append(img,itemName,category,price,button);
        container.append(div);
       
    });  
}



//Code for addToWishList

async function addToWishList(product) {
    console.log("Inside addToWishList");
    try {
        const response = await fetch(`${apiUrl}wishlists`, {
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
    } catch (error) {
        console.error('Request failed:', error.message);
    }
}