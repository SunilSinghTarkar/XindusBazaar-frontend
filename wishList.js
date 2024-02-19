let token=localStorage.getItem("jwtToken");
let apiUrl = 'https://xindusbazaar-production.up.railway.app/api/';

let userName=localStorage.getItem("userName");
let userInput=document.getElementById("userName");
userInput.textContent="Hello "+ userName +"👋";

async function fetchDataWithToken() {
    try {
        const response = await fetch(`${apiUrl}wishlists`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
        const data = await response.json();
        
        console.log('Data received:', data.itemList);
        displayItems(data.itemList);
    } catch (error) {
        console.error('Request failed:', error.message);
    }
}
fetchDataWithToken();

let container=document.getElementById("container");
let totalCount=document.getElementById("total-count");
let totalPrice=document.getElementById("total-price");
function displayItems(data){
   container.innerHTML=null;
   let totalAmount=0;
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
        button.innerText="Remove Item";
        totalAmount+=itemData.price;
        button.addEventListener("click",()=>{
            removeFromWishList(itemData.itemId); 
        })
        div.append(img,itemName,category,price,button);
        container.append(div);
       
    });  
    totalCount.textContent="Total Items: "+data.length;
    totalPrice.textContent="Total Price: ₹"+totalAmount.toFixed(2);
    if(data.length==0)container.innerHTML=" <h1>Your WishList is Empty!</h1>";
}



//Code for Remove from WishList

async function removeFromWishList(itemId) {
    console.log("Inside removeFromWishList");
    try {
        const response = await fetch(`${apiUrl}wishlists/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
        const data = await response.json();
        
        console.log('Data received:', data);
        displayItems(data.itemList);
    } catch (error) {
        console.error('Request failed:', error.message);
    }
}