const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const clearBtn=document.getElementById('clear');
const itemFilter=document.getElementById('filter');

function displayItems() {
    const itemsFromStorage=getItemsFromStorage();
    itemsFromStorage.forEach((item)=>addItemToDOM(item));
}

function onAddItemSubmit (e) {

    e.preventDefault();
    
    newItem=itemInput.value;
    if(newItem=== ''){
        alert('please add an item');
        return;
    }
 
    addItemToDOM(newItem);

    addItemToStorage(newItem);

    checkUI();

    itemInput.value='';

}

function addItemToDOM(item) {
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(item));
    
    const button=createButton('remove-item btn-link text-red');
    console.log(button);
    li.appendChild(button);

    itemList.appendChild(li);
}


function createButton(classes) {
    const button=document.createElement('button');
    button.className=classes;
    const icon=createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon=document.createElement('i');
    icon.className=classes;
    return icon;
}


function addItemToStorage(item) {
    const itemsFromStorage =getItemsFromStorage();

    //Add new item to array
    itemsFromStorage.push(item);

    //Convert to JSON string and set to local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));


}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage=[];
    } else {
        itemsFromStorage=JSON.parse(localStorage.getItem('items'))
    }

    return itemsFromStorage;
}

function removeItem(e) {
     if (e.target.parentElement.classList.contains('remove-item')){
        if(confirm('Are you sure you want to delete?'))
        {e.target.parentElement.parentElement.remove();
        checkUI();}
     }
     
}

function clearAllItems() {
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
}

function filterItems(e) {
    const items=document.querySelectorAll('li');
    const text=e.target.value.toLowerCase();

    items.forEach((item)=>{
        const itemName=item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1){
            item.style.display='flex';
        } else {
            item.style.display='none';
        }
    });
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

function init() {
    //Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', removeItem);
    clearBtn.addEventListener('click', clearAllItems);
    itemFilter.addEventListener('input',filterItems);
    document.addEventListener('DOMContentLoaded', displayItems());

    checkUI();
}

init();

