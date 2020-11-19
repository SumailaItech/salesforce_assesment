
// fetching the data and displaying on the UI

const fetchData = (category)=>{
    fetch('http://localhost:5000/sumaila_ShoppingCart_201105/assets/data/products.json')
    .then(response => response.json())
    .then(data =>{
        let products = data.products;
        const title = document.querySelector('.category');
        title.textContent = category.toUpperCase(); 
      
        for (const product of products) {
            if(category === product.category){
                createProduct({...product});
            }else if(category ==='all'){
                createProduct({...product});
            }
       }

    } ).catch(err=>
        console.log(err)
    )
}
 

const createProduct = ({...product})=>{
    const proDev = document.createElement('div');
    proDev.className = 'product-item';
       proDev.innerHTML =`
        <img src="${ product.image_url }" alt="${ product.name }">
        <div class="product-item__content">
            <h2>${ product.name }</h2>
            <h3>\$${product.price }</h3>
            <span id="cat">${product.category }</span>
            <p>${ product.description }</p>
            <button class="addToCart">Add to cart</button>
        </div>
        `;

        const productContainer = document.querySelector('.product-container');
        productContainer.appendChild(proDev);

        const addToCartBtn = document.getElementsByClassName('addToCart');
        //console.log(addToCartBtn);
        let items = [];
        for(let i=0; i<addToCartBtn.length;i++){
        addToCartBtn[i].addEventListener('click', e=>{
            //console.log(e.target.parentElement.children[1].textContent);
            if(typeof(Storage) !=='undefined'){
                let item ={
                    id:i+1,
                    name:e.target.parentElement.children[0].textContent,
                    price:e.target.parentElement.children[1].textContent,
                    num:0
                };
                if(JSON.parse(localStorage.getItem('items'))=== null){
                    items.push(item);
                    localStorage.setItem("items",JSON.stringify(items));
                    window.location.reload();
                }else{
                    const localItems = JSON.parse(localStorage.getItem("items"));

                    localItems.map(data =>{
                        if(item.id == data.id){
                            item.num = data.num + 1;
                        }else{
                            items.push(data);
                        }
                    });
                    items.push(item);
                    localStorage.setItem("items",JSON.stringify(items));
                    window.location.reload();
                }
            }else{
                alert('Storage is not working in you browser')
            }
        });
        }

// addding to the cart

const cartDisplay = document.getElementById('cartDisplay');
let number;
 if(typeof(Storage) ==='undifined'){
    number = 0;
 }else{
    JSON.parse(localStorage.getItem('items')).map(data =>{
        number = data.num;
    });
 }

cartDisplay.textContent = `cart( ${number})`;

let tableData =`

`;
        
}




fetchData('all');
const navList = document.querySelector('.nav-cat');
const firstEl = navList.querySelector('li:first-of-type');
const secondEl = navList.querySelector('li:nth-of-type(2)')
const lastEl = navList.querySelector('li:last-of-type');

let cattext;

for(let i=0; i< navList.length; i++){
     cattext = navList.querySelector('li').textContent;
     console.log(cattext);
}



firstEl.addEventListener('click', ()=>{
    fetchData('computer');
});

secondEl.addEventListener('click', ()=>{
    fetchData('car');
});

lastEl.addEventListener('click', ()=>{
    fetchData('chair');
});



const checkout= document.getElementById('checkout');
const cancel = document.querySelector('.btn--passive');
const checkoutBtn = document.querySelector('.btn--success');

checkout.addEventListener('click', ()=>{
    const showModal = document.getElementById('cart-modal');
    showModal.classList.toggle('visible');
})

cancel.addEventListener('click', ()=>{
    const showModal = document.getElementById('cart-modal');
    showModal.classList.toggle('visible');
})
