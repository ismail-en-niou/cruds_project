let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category =document.getElementById('category');   
let submit =document.getElementById('submit');
let nbr;


let mode = 'create';
// get total
function getTotal(){
    if(price.value != ''){
     let result = (+price.value + +taxes.value + +ads.value)
      - +discount.value ;
      total.innerHTML = result;
      total.style.background='#040'
    }
    else{
        total.innerHTML =''
        total.style.background='rgba(196, 21, 21, 0.664)'
    }
}
// great prodoct
let datapro ;
if(localStorage.product!= null){
    datapro= JSON.parse(localStorage.product)
}



submit.onclick=function(){
    let newpro ={
        title : title.value ,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value
    }
    if(title.value!='' && price.value!='' &&category!='' && newpro.count < 100) {
        if(mode==='create'){
            if(newpro.count>1){
                for(let i = 0 ; i<newpro.count;i++){
                   datapro.push(newpro);
                } 
               }else { datapro.push(newpro);}
           
           }else{
            datapro[nbr]=newpro;
            mode='create';
            submit.innerHTML ='Creat';
            count.style.display ='block'
           }
           cleardata()
    }
 
    






    // save localstorge
    localStorage.setItem('product',   JSON.stringify(datapro)    );
    
    showData()
}

// glear inputs
function cleardata(){
    title.value  ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    count.value ='';
    category.value='';
 }
// read 
function showData(){
    getTotal()
    let table ='';
    for( let i=0; i < datapro.length;i++){
        table +=`
                <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price} MAD</td>
                <td>${datapro[i].taxes} MAD </td>
                <td>${datapro[i].ads} MAD</td>
                <td>${datapro[i].discount} </td>
                <td>${datapro[i].total}MAD</td>
                <td>${datapro[i].category} </td>
                <td><button id="Update" onclick="updateData(${i})">Update</button></td>
                <td><button onclick="delateData(${i})" id="Delate">Delate</button></td>
                </tr>
        `
        console.log(table)
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelate = document.getElementById('delateAll')
    if(datapro.length > 0){
           btnDelate.innerHTML =`
           <td><button>Delate All</button></td>
           `
    }
}
showData()


// delate
function delateData(i){
   datapro.splice(i,1)
   localStorage.product = JSON.stringify(datapro)
   showData()
}
// update
function updateData(i){
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal();
  count.style.display = 'none';
  category.value = datapro[i].catcatego;
  submit.innerHTML ='Update';
  mode='update'
  nbr= i ;
  scroll({
    top:0,
    behavior :"smooth"
  })
}



let modeShearch ='title' ;
function getmode(id){
    if(id == 'searcTitle'){
        modeShearch ==='title'
    }else{
        modeShearch==='category'
    }
    console.log(modeShearch)
}













// search
// clean data 