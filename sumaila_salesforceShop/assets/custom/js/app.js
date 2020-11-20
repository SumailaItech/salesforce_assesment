
/*
    ********************************************
    * Author: Iddrisu Sumaila
    * I like doing programming and learning new things in the tech industry
    * My motto is never give up in developling yourself to be the best version of you
    * 
    *****************************************
    */ 

const addProducts = ({...product})=>{
        let html =`
        <div class="featured-product-item all ${product.category}">
        <div class="featured-product-item-image">
            <img src="${product.image_url}" alt="" srcset="">
        </div>
        <p class="title">${product.name}</p>
        <p class="description">${product.description}</p>
        <p class="price">$${product.price}</p>
        <button class="addToCart" onclick="viewProductId(${product.id})">View Item</button>
        </div>
        `;   
        $('.featured-products').prepend(html);
}

/*
    ********************************************
    * Displaying categories from index
    *****************************************
    */ 
const catProducts = ({...product})=>{
    let html =`
    <div class="featured-product-item all ${product.category}">
    <div class="featured-product-item-image">
        <img src="${product.image_url}" alt="" srcset="">
    </div>
    <p class="title">${product.name}</p>
    <p class="description">${product.description}</p>
    <p class="price">$${product.price}</p>
    <button class="addToCart" onclick="viewProductId(${product.id})">View Item</button>
    </div>
    `;   
    $('.category-products').prepend(html);
}


function catSelected(cat){
    sessionStorage.setItem('cat', cat)
    window.location ='/productscat.html';
    return false;
}

/*
    ********************************************
    * Displaying categories from index
    *****************************************
    */ 
const getCatProducts=()=>{
    let cat = sessionStorage.getItem('cat');

    $.ajax('assets/data/products.json',{
        dataType:'json',
        contentType:'application/json',
        cache:false
    })
    .done(response=>{
        let products = response.products;
        console.log(products);
        $('#category-title').text(cat +' in Stock');
        products.forEach(product=>{
            if(product.category === cat){
                catProducts({...product});
            }  
        })
    })
    .fail((request, errorType, errorMessage)=>{
        console.log(errorMessage);
    });
    return false;
}


const viewProductId = id =>{
    sessionStorage.setItem('prodId', id);
    window.location ='/product-details.html'
    return false;
}

/*
    ********************************************
    * Getting a single product
    *****************************************
    */ 
const getSingleProduct = ()=>{
    let pId = +sessionStorage.getItem('prodId');
    $.ajax('assets/data/products.json',{
        dataType:'json',
        contentType:'application/json',
        cache:false
    })
    .done(response=>{
        let products = response.products;
        let output ='';
        $.each(products, (key, value)=>{
            if(value.id === pId){
                output +=`
                <div class="products-details-item">
                <img src="${value.image_url}" alt="" srcset="">
              </div>
              <div class="products-details-item">
               <div class="card">
                  <h2 class="title">${value.name}</h2>
                  <p class="description">${value.description}</p>
                  <p class="price"> price: $ ${value.price}</p>
                  <input type="color">
                  <input id="quantity" type="number" min="1" value="1">
                  <select name="" id="size">
                  <option value="">Select your size</option>
                  <option value="SM">SM</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  </select>    
                  <p class="totalPrice">Total price: $ ${value.price}</p>
                  <input type="hidden" value="${value.id}">
                  <button onclick="addToCart()" id="addToCart">Add to cart</button>
                  <button onclick="" id="cShopping">Continue Shopping</button>
                  <button onclick="checkoutCart()" id="checkout">Checkout</button>
                  </div>
              </div>
                `;
            };
        });
        $('.products-details').html(output);
    })
    .fail((request, errorType, errorMessage)=>{
        console.log(errorMessage);
    });
    return false;
}


/*
    ********************************************
    * Add to cart function
    *****************************************
    */ 
const addToCart = ()=>{
    let products =[];
    let img = $('.products-details-item img').parent().children().attr('src');
    let price = $('.price').parent().children()[2].innerHTML;
    let tPrice = $('.totalPrice').parent().children()[6].innerHTML;
    let size = $('#size').val();
    console.log(size);
    price = price.split(':')[1].split(' ')[2];
    tPrice = tPrice.split(':')[1].split(' ')[2];
    let quantity = $('#quantity').val();
    let title = $('.title').parent().children()[0].innerHTML;

    let id = $('input[type="hidden"]').val();
    if(tPrice === undefined){
        tPrice = sessionStorage.getItem('total');
    };

     let product = {
            id:id,
            image:img,
            title:title,
            price:price,
            qty:quantity,
            size:size,
            total:tPrice
        }
    if(typeof(Storage) !== undefined){
        if(JSON.parse(localStorage.getItem('products'))=== null){
            products.push(product);
            localStorage.setItem('products', JSON.stringify(products));
        } else{
          
            localProd = JSON.parse(localStorage.getItem('products'))||[];
            localProd.map(data=>{
              if(product.id == data.id){
                $('.products-details-item #addToCart').hide();
                $('.products-details-item #cShopping').show();
                $('.products-details-item #checkout').show();
              }else{
                products.push(data);
                return false;
              }
           });
            products.push(product);
            localStorage.setItem('products', JSON.stringify(products));
  
    } 
}

}
/*
    ********************************************
    * checkout cart
    *****************************************
    */ 
    const  checkoutCart = ()=>{
        window.location = 'checkout.html'
        return false;
    }

    const getCartProducts = ()=>{
        const cartProdutcs = JSON.parse(localStorage.getItem('products'));
        let total = cartProdutcs.map(price=>price.total).reduce((first,second)=>+first + +second);
        console.log(total);
        let output ='';
        output += ` <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Price($)</th>
                    <th>Quantity</th>
                    <th>Total($)</th>
                    <th></th>
                    </tr>`;
       
        cartProdutcs.map(product =>{
            output +=`
                    <tr>
                    <td id="tdImg"><img src="${product.image}"></td>
                    <td>${product.title}</td>
                    <td>${product.size}</td>
                    <td id="priceCheck">${product.price}</td>
                    <td>${product.qty}</td>
                    <td id="totalPrice">${product.total}</td>
                    <td><button onclick="removeProduct(${product.id})">Remove</button></td>
                    </tr>
            `;
        });

        console.log();
        let totalText =  $('.check-card #totalAmount').parent().children()[1];
        totalText.innerHTML =`Total Cost: $${total}`;
        $('.check-card table').html(output);
    }

    /*
    ********************************************
    * Removing item from the cart
    *****************************************
    */ 
    const removeProduct = prdId=>{
        let products = JSON.parse(localStorage.getItem('products'))
        for (var i = 0; i < products.length; i++) {
            let product = products[i];
             if(product.id == prdId){
               products.splice(i,1);
             }     
          }

          products = JSON.stringify(products);
          localStorage.setItem('products', products)
          window.location.reload();
          console.log(products);
    }

 const catTotal =()=>{
    let price = $('#priceCheck');
    console.log(price);
    let tPrice = $('#totalPrice').parent().children()[4];
    console.log(tPrice);
    // price = price.split(':')[1].split(' ')[2];
    let quantity = $('.quantity').val();
    console.log(quantity);
    let total = quantity * price;
    console.log(total);
    tPrice.innerHTML =`${total}`;
    sessionStorage.setItem('total', total);
 }
/*
    ********************************************
    * Entering point for the Document
    *****************************************
    */ 
$(document).ready(()=>{

    $.ajax('assets/data/products.json',{
        dataType:'json',
        contentType:'application/json',
        cache:false
    })
    .done(response=>{
        let products = response.products;
        products.forEach(product=>{
            addProducts({...product});
        })
    })
    .fail((request, errorType, errorMessage)=>{
        console.log(errorMessage);
    });
    
    /*
    ********************************************
    * displaying categories section
    *****************************************
    */ 
$('.categories-links>li').click(function(){
    let sel_cat = $(this).text();
    console.log();
    $('#product-title').text(sel_cat + ' in stock');
    console.log($('.featured-product-item'));
    if(sel_cat){
        sel_cat = sel_cat.toLowerCase();
    }
    $('.featured-product-item').hide();
    $('.featured-product-item').each(function(){
        if($(this).hasClass(sel_cat)){
            $(this).animate({"width":"toggle"});
        }
    })

})


 /*
    ********************************************
    * Updating the total price
    *****************************************
    */ 

$('#quantity').on('change',function(){
    let price = $('.price').parent().children()[2].innerHTML;
    let tPrice = $('.totalPrice').parent().children()[6];
    price = price.split(':')[1].split(' ')[2];
    let quantity = ($(this).val());
    let total = quantity * price;
    console.log(total);
    tPrice.innerHTML =`Total Price : $${total}`;
    sessionStorage.setItem('total', total);
});



$('#checkCoupon').keyup(function(){
    if($(this).val() ==='IDDRISU'){
        let payAmount =  $('.check-card #totalAmount').parent().children()[1];
        let cProduct = JSON.parse(localStorage.getItem('products'));
        let tAmount= cProduct.map(price=>price.price).reduce((fvalue, sValue)=>+fvalue + +sValue);
        let totalAmount = tAmount * 0.5;
         console.log(totalAmount);
         console.log(payAmount);
        payAmount.innerHTML =`Total Cost: ${totalAmount}`;
    };
})

// 


$('.products-details-item #cShopping').click(function(){
    console.log($(this));
    window.location = 'products.html';
 return false;
});

$('#check-card-btn').click(()=>{
    alert("Thank you for your generous purchase");
    window.location = 'login.html'
})


$('.toggle-button').click(function(){
    $('.mobile-nav').toggle('open');
})
})//end of document

