let quoteHandler=document.getElementById('quote');
let authorHandler=document.getElementById('author');
let myFormHandle=document.getElementById('myForm');
let quoteArr=[];

myFormHandle.addEventListener('submit',function (e){
    e.preventDefault();
    let quoteObj={
        quote: quoteHandler.value,
        author: author.value
    }

    if(validate(quoteObj)) {
        if(localStorage.quoteArr) {
            let quoteArr=JSON.parse(localStorage.quoteArr);
            quoteArr.push(quoteObj)
            localStorage.setItem('quoteArr',JSON.stringify(quoteArr));

        } else {
            quoteArr.push(quoteObj);
            localStorage.setItem('quoteArr',JSON.stringify(quoteArr));
        }

        myFormHandle.reset();
        swal("Looks Good!","Quote Saved","success");
    } else {
        swal("Oops!!","You forgot to write a quote or to mention author","error")
    }
    
},false)

function validate(quoteObj) {
    if(Object.values(quoteObj).includes("")) {
        return false;
    } else {
        return true;
    }
}