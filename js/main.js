
let title= document.getElementById('title');
let price= document.getElementById('price');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let small= document.getElementById('small');
let count= document.getElementById('count');
let category= document.getElementById('category');
let create= document.getElementById('create');
let search= document.getElementById('search');
let byTitle= document.getElementById('by-titl');
let byCate= document.getElementById('by-cate');
let tbody=document.getElementById('tbody');
let deleteAll=document.getElementById("delete-all");


let products;
let pro;
let mood='create';
if(localStorage.getItem("product") != null){
    products = JSON.parse(localStorage.getItem("product"));
    readProuducts(products);
    deleteAll.classList.replace('d-none','d-block');

}else{
    products=[];
    deleteAll.classList.replace('d-block','d-none');

}
//get total--done
    function getTotal(){
        if(price.value != ''){

        let total= (+price.value + +taxes.value + +ads.value )-  +discount.value;
        small.innerHTML=total;
        small.style.backgroundColor='rgb(0, 128, 11)'
        }else{
            small.innerHTML='';
            small.style.backgroundColor='rgba(236, 118, 22, 0.986)'

        }
    }

// create product--done
function createProduct(){
    if(regexTitle()==true && regexCategory()==true && regexPrice()==true){
        let product={

            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            count:count.value,
            small:small.textContent,
            category:category.value
        }
        if(mood==='create'){
            for(let i=0;i<count.value;i++){
                products.push(product);
            }
            
           }else {
            products[pro]=product;
            create.innerHTML='create';
            count.classList.remove('d-none');
            getTotal();
    }
        localStorage.setItem('product',JSON.stringify(products));
        clearInputs();
        readProuducts(products);
        deleteAll.classList.replace("d-none",'d-block');

        getTotal();

}
        
}



//save localstorage --done
//clear inputs--done
function clearInputs(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';

}
//read--done
function readProuducts(elements){
    let table='';
    for(let i=0;i<elements.length;i++){
        table+=`
    <tr>
        <th>${i}</th>
        <th>${elements[i].title}</th>
        <th>${elements[i].price}</th>
        <th>${elements[i].taxes}</th>
        <th>${elements[i].ads}</th>
        <th>${elements[i].discount}</th>
        <th>${elements[i].small}</th>
        <th>${elements[i].category}</th>
        <th><button onclick='updateProduct(${i})' class=" update btn-warning">update</button></th>
        <th><button onclick='deleteProduct(${i})' class="delete btn-danger">delete</button></th>
    </tr>`
    }
    tbody.innerHTML=table;
}


//delete  //done
function deleteProduct(deleteE){
            products.splice(deleteE,1);
            localStorage.setItem('product',JSON.stringify(products));
            readProuducts(products);
}
//update
function updateProduct(i){
    mood='update';
    title.value=products[i].title;
    price.value=products[i].price;
    taxes.value=products[i].taxes;
    ads.value=products[i].ads;
    discount.value=products[i].discount;
    small.value=products[i].small;
    category.value=products[i].category;

    pro=i;
    count.classList.add('d-none');
    create.innerHTML='update';
    scroll({
        top:0,
        behavior:"smooth"
    })
    getTotal();
}

//search
let searchList=[];
let searchMode='';
// function searchclickMode(id){
//     if(id=='by-titl'){
//         searchMode='title';
//         search.placeholder="search by title";
//     }else if(id=='by-cate'){
//         searchMode='category';
//         search.placeholder="search by category";
//     }
// }
search.onkeyup= function (){
        for(let i=0;i<products.length;i++){
            // if(searchMode=='title'){        
                if(products[i].title.toLowerCase().includes(search.value.toLowerCase())){
                    searchList.push(products[i]);
                    readProuducts(searchList);
        
                }else{
                    // searchList=[];
                    readProuducts(searchList);
                    }}
            // }else{
            //     if (products[i].category.toLowerCase().includes(search.value.toLowerCase())){
            //         searchList.push(products[i]);
            //         readProuducts(searchList);
        
            //     }else{
            //         searchList=[];
            //         readProuducts(searchList);
            //         } }
            // }
            
            }

        
//delete-all --done
function deleteAllProducts(){
    products=[];
    localStorage.setItem('product',JSON.stringify(products));
    readProuducts(products);
    deleteAll.classList.replace("d-block",'d-none');

}
//regex
function regexTitle(){
    let regexT=/^[a-z A-Z]{3,20}.{0,1}[a-z A-Z]{0,2}.{0,1}[1-9]{0,3}$/;
    if(regexT.test(title.value)==true){
        title.classList.replace("is-invalid","is-valid")
        return true;
    }else{
        title.classList.replace("is-valid","is-invalid")

        return false;
    }
}
function regexCategory(){
    let regexC=/^[a-z A-Z]{2,20}$/;
    if(regexC.test(category.value)==true){
        category.classList.replace("is-invalid","is-valid")
        return true;
    }else{
        category.classList.replace("is-valid","is-invalid")

        return false;
    }
}
function regexCount(){
    let regexCn=/^[1-9]{1,}$/;
    if(regexCn.test(count.value)==true){
        count.classList.replace("is-invalid","is-valid")
        return true;
    }else{
        count.classList.replace("is-valid","is-invalid")

        return false;
    }
}
function regexPrice(){
    let regexP=/^[1-9]{3,}$/;
    if(regexP.test(price.value)==true){
        price.classList.replace("is-invalid","is-valid")
        return true;
    }else{
        price.classList.replace("is-valid","is-invalid")

        return false;
    }
}
title.addEventListener('input',regexTitle);
category.addEventListener('input',regexCategory);
count.addEventListener('input',regexCount);
price.addEventListener('input',regexPrice);

