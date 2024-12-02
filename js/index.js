
var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var submitInput = document.getElementById('SubmitBtn');


var container = [];

if(localStorage.getItem('books'))
{
    container = JSON.parse(localStorage.getItem('books'));
    displayBooks(container);
}

console.log(container);
function addBook()
{
    book = 
    {
        name:siteNameInput.value,
        url:siteUrlInput.value
    }

    container.push(book);
    displayBooks(container);
    clearForm();
    localStorage.setItem('books',JSON.stringify(container));
}

function displayBooks(arr)
{
    var temp = '';

    for(var i = 0;i<container.length;i++)
    {
        temp+= ` <tr>
                    <td class="py-3">${i+1}</td>
                    <td class="py-2">${container[i].name}</td>
                    <td class="py-2"><button class="visit border-0 px-3 py-2 rounded"><a href="${container[i].url}"><i class="fa-regular fa-eye"></i> Visit</a></button></td>
                    <td class="py-2 "><button class="delete text-white border-0 px-3 py-2 rounded" onclick="deleteBook();"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                </tr>`;
    }
    
    document.getElementById('tableBody').innerHTML = temp;

}
function clearForm()
{
    siteNameInput.value = null;
    siteUrlInput.value = null;
}

function deleteBook(indexDeleted)
{
    container.splice(indexDeleted,1);
    displayBooks(container);
    localStorage.setItem('books',JSON.stringify(container));
}


function validation(element)
{
    regex =
    {
        siteName:/^\w{3,}/,
        siteUrl:/^(https:\/\/)/
    }

    if(regex[element.id].test(element.value))
    {
        element.classList.replace('is-invalid','is-valid');
       
    }
    else
    {
        element.classList.replace('is-valid','is-invalid');
        
    }
  
}

function isFound()
{
    for(var i=0;i<container.length;i++)
    {
        if(siteNameInput.value == container[i].name)
        {
            return true;
        }
    }
    return false;
}

var nameRe = /^\w{3,}/;
var urlRe = /^(https:\/\/)/;
function addValid()
{
    var isValid = (nameRe.test(siteNameInput.value) && urlRe.test(siteUrlInput.value) && (!isFound()));
    if(isValid)
    {
        addBook();
    }
    else
    {
        document.querySelector('.light-box-container').classList.replace('d-none','d-flex')
    
    }

}

var closeIcon = document.querySelector('.rules .head button');
var lightBoxContainer = document.querySelector('.light-box-container');
var lightBox = document.querySelector('.light-box-container .rules');



function closeRules()
{
    lightBoxContainer.classList.replace('d-flex','d-none');
}

document.addEventListener('keydown',function(e){
    if(e.key == 'Escape')
    {
        closeRules();
    }
})
closeIcon.addEventListener('click',closeRules);

lightBoxContainer.addEventListener('click',function(){
    closeRules();
})

lightBox.addEventListener('click',function(e){
    e.stopPropagation();
})



