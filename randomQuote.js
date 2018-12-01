let displayQuoteHandler=document.getElementById('displayQuote');
let randomButtonHandler=document.getElementById('random');
let saveHandle=document.getElementById('save');
let quoteArr=[];  let quoteObj={};


getQuote();

function getQuote() {
    let quoteUrl='https://talaikis.com/api/quotes/random/';
    saveHandle.setAttribute('disabled','true');
    axios.get(quoteUrl).then((response)=>{
        displayQuoteHandler.innerHTML=``;
        quoteObj=response.data;
        let quote=quoteObj.quote;
        let author=response.data.author;
        // let h2=document.createElement('h2');
        // h2.setAttribute('class','display-5');
        // let p=document.createElement('p');
        // p.setAttribute('class','lead-3')
        // let qText=document.createTextNode(quote);
        // let aText=document.createTextNode(author);
        // h2.appendChild(qText);
        // p.appendChild(aText);
        // console.log(h2,typeof h2);
        // displayQuoteHandler.appendChild(h2);
        // displayQuoteHandler.appendChild(p);

        displayQuoteHandler.innerHTML=`<h2 class="display-5" style="text-align:center">"${quote}"</h2>`;
        displayQuoteHandler.innerHTML+=`<p class="lead" style="text-align:center">~${author}</p>`;
        


        saveHandle.removeAttribute('disabled');

        

        
        

    }).catch((err)=>{
        console.log(err);
    })

}

randomButtonHandler.addEventListener('click',()=>{
    getQuote();
    saveHandle.innerText='Save to Local';
    saveHandle.setAttribute('class','btn btn-primary');
},false)

saveHandle.addEventListener('click',()=>{
    saveHandle.innerText='Saved';
    saveHandle.setAttribute('class','btn btn-success');
    if(localStorage.quoteArr) {
        let quoteArr=JSON.parse(localStorage.quoteArr);
        quoteArr.push(quoteObj)
        localStorage.setItem('quoteArr',JSON.stringify(quoteArr));

    } else {
        quoteArr.push(quoteObj);
        localStorage.setItem('quoteArr',JSON.stringify(quoteArr));
    }
    saveHandle.setAttribute('disabled','true');
   
},false)