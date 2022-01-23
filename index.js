//Gets our addList and addListBtn ID's from our HTML, also uses localStorage to save values in our browser even after closing it.
showList();
let addList = document.getElementById("addList");
let addListBtn = document.getElementById("addListBtn");

addListBtn.addEventListener("click", function(){
    addListValue = addList.value;
    if(addListValue.trim()!=0){
        let webList = localStorage.getItem("locallist");
        if(webList == null){
            list = [];
        }
        else{
            list = JSON.parse(webList);
        }
        list.push({'list_item':addListValue, 'completeStatus':false});
        localStorage.setItem("locallist", JSON.stringify(list));
        addList.value = '';
    }
    showList();
});

function showList() {
    let webList = localStorage.getItem("locallist");
    if(webList == null){
        list = [];
    }
    else{
        list = JSON.parse(webList);
    }
    let string = '';
    let addedList = document.getElementById("addedList");
    //Creates our list so it can be seen on the actual website using template literals as well as creating our edit and delete buttons.
    list.forEach((item, index) => {
        if(item.completeStatus==true){
            listComplete = `<td class="completed">${item.list_item}</td>`;
        }else{
            listComplete = `<td>${item.list_item}</td>`;
        }
        string += `<tr>
                    <th scope="row">${index+1}</th>
                    ${listComplete}
                    <td><button type="button" onclick="editItem(${index})" class="btn btn-warning btn-sm">Edit</button></td>
                    <td><button type="button" onclick="deleteItem(${index})" class="btn btn-danger btn-sm">Delete</button></td>
                </tr>`;
    });
    addedList.innerHTML = string;
}

function editItem(index) {
    let saveIndex = document.getElementById("saveIndex");
    let addListBtn = document.getElementById("addListBtn");
    let saveList = document.getElementById("saveList");
    saveIndex.value = index;
    let webList = localStorage.getItem("locallist");
    let list = JSON.parse(webList); 
    
    addList.value = list[index]['list_item'];
    addListBtn.style.display="none";
    saveList.style.display="block";
}

let saveList = document.getElementById("saveList");
saveList.addEventListener("click", function(){
    let addListBtn = document.getElementById("addListBtn");
    let webList = localStorage.getItem("locallist");
    let list = JSON.parse(webList); 
    let saveIndex = document.getElementById("saveIndex").value;
    
    for (keys in list[saveIndex]) {
        if(keys == 'list_item'){
            list[saveIndex].list_item = addList.value;
        }
      }

    saveList.style.display="none";
    addListBtn.style.display="block";
    localStorage.setItem("locallist", JSON.stringify(list));
    addList.value='';
    showList();
});

function deleteItem(index) {
     let webList = localStorage.getItem("locallist");
    let list = JSON.parse(webList);
    list.splice(index, 1);
    localStorage.setItem("locallist", JSON.stringify(list));
    showList();
}

let addedList = document.getElementById("addedList");
    addedList.addEventListener("click", function(e){
       
        let webList = localStorage.getItem("locallist");
        let list = JSON.parse(webList);   
        let mytarget = e.target;
        if(mytarget.classList[0] === 'text-success'){
        let mytargetid = mytarget.getAttribute("id");   
        mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;
            for (keys in list[mytargetid]) {
                if(keys == 'completeStatus' && list[mytargetid][keys]==true){
                    list[mytargetid].completeStatus = false;
                }else if(keys == 'completeStatus' && list[mytargetid][keys]==false){
                    list[mytargetid].completeStatus = true;
                }
              }
              
        localStorage.setItem("locallist", JSON.stringify(list));
        showList();
    }
    });

let deleteAll = document.getElementById("deleteAll");
deleteAll.addEventListener("click", function(){
    let saveList = document.getElementById("saveList");
    let addListBtn = document.getElementById("addListBtn");
    let webList = localStorage.getItem("locallist");
    let list = JSON.parse(webList);
    if(webList == null){
        list = [];
    }
    else{
        list = JSON.parse(webList);
        list = [];
    }
    saveList.style.display="none";
    addListBtn.style.display="block";
    localStorage.setItem("locallist", JSON.stringify(list));
    showList();
});




