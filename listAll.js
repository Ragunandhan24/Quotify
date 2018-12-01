let listHandle=document.getElementById('listingQuote');
let tbodyHandle=document.getElementById('tbody');
let quotesGlobal = [];
let countHandle=document.getElementById('quoteCount');
//listQuote();

checkLocal();

function checkLocal() {
    if(localStorage.length) {
        quotesGlobal=JSON.parse(localStorage["quoteArr"]);
        listQuote(quotesGlobal);
    }
    else {
        countHandle.innerText=0;
        tbodyHandle.innerHTML=`<h3 class="display-5" style="text-align:center">Oops ! You didn't save any quote</h3>`
    }
}


function listQuote(quotes) {
    
    console.log(quotes.length);
    output='';
    console.log(quotes);
    
    quotes.forEach((quote,i)=>{
        output+= buildBody(quote,i);
    })
    console.log(output)
    tbodyHandle.innerHTML=output;
    countHandle.innerText=quotes.length;
    
    
}



function deleteQuote(i){
    let output='';
    
    let ele=document.getElementById(`tr-${i}`);
    // let ele=document.querySelector('tr');
    console.dir(ele);
    let quotes=JSON.parse(localStorage.quoteArr);
    console.log('quotes before splice', quotes);
    quotes.splice(i,1);
    console.log('quotes after splice', quotes);
    localStorage.setItem('quoteArr',JSON.stringify(quotes));
    
    
    if(quotes.length==0) {
        countHandle.innerText=quotes.length;
        console.log('i am here')
        tbodyHandle.innerHTML=`<h3 class="display-5" style="text-align:center">Oops ! You didn't save any quote</h3>`
        delete localStorage["quoteArr"];
        
    }
    else if(quotes.length) {

        quotes.forEach((quote,i)=>{
            console.log('inside',i);
            output+= buildBody(quote,i);
        })

        console.log('item popped and the value of i is', i);
        countHandle.innerText=quotes.length;
        ele.remove();
        console.log(quotes.length);
        tbodyHandle.innerHTML='';
        tbodyHandle.innerHTML=output;

    }
}

function updateQuote(i) {
    event.preventDefault();
    let output='';
    let quotes=JSON.parse(localStorage.quoteArr);
    let tr=document.getElementById(`tr-${i}`);
    let div=document.getElementById(`ntr-${i}`);
    let quoteText=document.getElementById(`quote-${i}`).value;
    let author=document.getElementById(`author-${i}`).value;
    
    
    let quoteObj={
        quote:quoteText,
        author:author
    }
    console.log('before assign', quotes);
    
    quotes[i]=quoteObj;
    localStorage.setItem('quoteArr',JSON.stringify(quotes));
    tr.innerHTML= `<td >"${quoteObj.quote}" ~ ${quoteObj.author} <br>
    <i class="material-icons md-30 iconclass" data-toggle="tooltip" data-placement="right" title="Delete" onclick="deleteQuote(${i})">delete</i>
    <i class="material-icons md-30 iconclass" data-toggle="tooltip" data-placement="right" title="Edit" onclick="editQuote(${i})">edit</i></td>`
    // quotes.forEach((quote,i)=>{
    //     output+= buildBody(quote,i);
    // })
    // tbodyHandle.innerHTML='';
    // tbodyHandle.innerHTML=output;    
    div.innerHTML='';
}

function cancel(i) {
    let div=document.getElementById(`ntr-${i}`);
    let tr=document.getElementById(`tr-${i}`);
    tr.children[0].children[3].removeAttribute("style","color:red")
    div.innerHTML='';
}

function buildQuoteBody(i, quote) {
    return `<form id="myForm">    
    <div class="form-group">
    <label for="quote-${i}">Quote</label>
    <textarea class="form-control" id="quote-${i}" rows="3" placeholder="Enter a quote">${quote.quote}</textarea>
    </div>
    <div class="form-group">
    <label for="author-${i}">Author</label>
    <input type="text" class="form-control" id="author-${i}" value="${quote.author}"/>
    </div>
    <button class="btn btn-primary" onclick="updateQuote(${i})">Update</button>
    <button class="btn btn-danger" onclick="cancel(${i})">Cancel</button> 
    </form>
    <br>`
}

function editQuote(i) {
    // let tr=document.getElementById(`tr-${i}`);
    let tr=document.querySelector('tr'); // to select elements in a HTML page
    console.log('tr',tr)
    /*
        tr.classList.toggle('active');

        The above code will toggle the class = "active" attribute of every tr.
        If attribute is already there it will remove, if it is not there it will add.
    */
    console.dir(tr.children[0]);
   
    console.log('last element child',tr.lastElementChild)
    console.log('last child',tr.lastChild);
    let div=document.getElementById(`ntr-${i}`);
    let quotes=JSON.parse(localStorage.quoteArr);
    let quote=quotes[i];
    div.innerHTML = buildQuoteBody(i,quote);
    if(div.style.display==="block"){
        div.style.display="none";
        tr.children[0].children[3].removeAttribute("style","color:red")
        
    } else {
        div.style.display="block";
        
        tr.children[0].children[3].setAttribute("style","color:red");
    }
    
}


function buildBody(quote,i) {    
    return `
    <tr id="tr-${i}">
        <td>"${quote.quote}"<br><span> ~${quote.author}</span>
        <i class="material-icons md-30 iconclass" data-toggle="tooltip" data-placement="right" title="Delete" onclick="deleteQuote(${i})">delete</i>
        <i class="material-icons md-30 iconclass" data-toggle="tooltip" data-placement="right" title="Edit" onclick="editQuote(${i})">edit</i>
        </td>
        
          
    </tr>
    <div class="container">
    <div id="ntr-${i}"></div> 
    </div>    
`;
}