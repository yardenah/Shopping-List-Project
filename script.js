const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const clearBtn=document.getElementById('clear');
const itemFilter=document.getElementById('filter');

function addItem (e) {

    e.preventDefault();
    
    newItem=itemInput.value;
    if(newItem=== ''){
        alert('please add an item');
        return;
    }
 
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    
    const button=createButton('remove-item btn-link text-red');
    console.log(button);
    li.appendChild(button);

    itemList.appendChild(li);

    checkUI();

    itemInput.value='';

}

function createButton(classes){
    const button=document.createElement('button');
    button.className=classes;
    const icon=createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes){
    const icon=document.createElement('i');
    icon.className=classes;
    return icon;
}

function removeItem(e){
     if (e.target.parentElement.classList.contains('remove-item')){
        if(confirm('Are you sure you want to delete?'))
        {e.target.parentElement.parentElement.remove();
        checkUI();}
     }
     
}

function clearAllItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
}

function checkUI () {
    const items=document.querySelectorAll('li');
    if (items.length === 0){
        clearBtn.style.display ='none';
        itemFilter.style.display ='none';
    }
    else{
        clearBtn.style.display ='block';
        itemFilter.style.display ='block';
    }
}

//Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAllItems);

