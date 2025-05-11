const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage=getItemsFromStorage();
    itemsFromStorage.forEach((item)=>addItemToDOM(item));
    checkUI();
}

function onAddItemSubmit (e) {

    e.preventDefault();
    
    newItem=itemInput.value;
    if(newItem=== ''){
        alert('please add an item');
        return;
    }

    //Check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode=false;
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

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
        } else {
            setItemToEdit(e.target);
        }
}

function setItemToEdit(item) {
    isEditMode=true;

    itemList.querySelectorAll('li').forEach((i)=>i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pan"> </i>  Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value=item.textContent;

}

function removeItem(item) {
    if (confirm('Are you sure?')) {
        item.remove();

        removeItemFromStorage(item.textContent);

        checkUI();
    } 

}

function removeItemFromStorage(item) {
    let itemsFromStorage=getItemsFromStorage();

    //Filter out items to be removed
    itemsFromStorage=itemsFromStorage.filter((i)=> i!== item);

    //Re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearAllItems() {
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }

    localStorage.removeItem('items');

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
    itemInput.value = '';
    const items=document.querySelectorAll('li');
    if (items.length === 0){
        clearBtn.style.display ='none';
        itemFilter.style.display ='none';
    }
    else{
        clearBtn.style.display ='block';
        itemFilter.style.display ='block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
}


function init() {
    //Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearAllItems);
    itemFilter.addEventListener('input',filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();

