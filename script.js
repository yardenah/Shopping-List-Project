const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const clearBtn=document.getElementById('clear');

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
        e.target.parentElement.parentElement.remove();
     }
}

function clearAllItems(){
    const items=itemList.querySelectorAll('li');
    items.forEach(item => {
        item.remove();
    });
}

//Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAllItems);
