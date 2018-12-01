let displayQuoteHandler=document.getElementById('displayQuote');
let randomButtonHandler=document.getElementById('random');
let saveHandle=document.getElementById('save');
let quotes = [];
let i=0;
//displayLocal();

checkLocal();

function checkLocal() {
    if(localStorage.length) {
        quotes=JSON.parse(localStorage["quoteArr"]);
        displayLocal();
    }
    else {
        displayQuoteHandler.innerHTML=`<h3 class="display-5" style="text-align:center">Oops ! You didn't save any quote</h3>`
    }
}


function displayLocal () {
    if(i<quotes.length) {
        
        displayQuoteHandler.innerHTML='';
        //let h3=document.createElement('h3');
        let qText=quotes[i].quote;
        let aText=quotes[i].author;
        console.log('quote',qText,'author',aText);
        console.log('i after text node',i);
        //h3.appendChild(qText);
        //displayQuoteHandler.appendChild(h3);

        displayQuoteHandler.innerHTML=`<h2 class="display-5" style="text-align:center">"${qText}"</h2>`;
        displayQuoteHandler.innerHTML+=`<p class="lead" style="text-align:center">~${aText}</p>`;
    }
    i++;
    console.log('i when function ends',i);
}



randomButtonHandler.addEventListener('click',()=>{
    console.log('when click event fires',i)
    displayLocal();
    if(i==quotes.length) {
        i=0;
    }

},false)