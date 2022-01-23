"use strict";

showtask();
var addList = document.getElementById("addList");
var addListBtn = document.getElementById("addListBtn");
addListBtn.addEventListener("click", function () {
  addListValue = addList.value;

  if (addListValue.trim() != 0) {
    var webtask = localStorage.getItem("localtask");

    if (webtask == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(webtask);
    }

    taskObj.push({
      'task_name': addListValue,
      'completeStatus': false
    });
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addList.value = '';
  }

  showtask();
});

function showtask() {
  var webtask = localStorage.getItem("localtask");

  if (webtask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
  }

  var html = '';
  var addedtasklist = document.getElementById("addedtasklist");
  taskObj.forEach(function (item, index) {
    if (item.completeStatus == true) {
      taskCompleteValue = "<td class=\"completed\">".concat(item.task_name, "</td>");
    } else {
      taskCompleteValue = "<td>".concat(item.task_name, "</td>");
    }

    html += "<tr>\n                    <th scope=\"row\">".concat(index + 1, "</th>\n                    ").concat(taskCompleteValue, "\n                    <td><button type=\"button\" onclick=\"edittask(").concat(index, ")\" class=\"text-primary\"><i class=\"fa fa-edit\"></i>Edit</button></td>\n                    <td><button type=\"button\" onclick=\"deleteitem(").concat(index, ")\" class=\"text-danger\"><i class=\"fa fa-trash\"></i>Delete</button></td>\n                </tr>");
  });
  addedtasklist.innerHTML = html;
}

function edittask(index) {
  var saveindex = document.getElementById("saveindex");
  var addListBtn = document.getElementById("addListBtn");
  var saveList = document.getElementById("saveList");
  saveindex.value = index;
  var webtask = localStorage.getItem("localtask");
  var taskObj = JSON.parse(webtask);
  addList.value = taskObj[index]['task_name'];
  addListBtn.style.display = "none";
  saveList.style.display = "block";
}

var saveList = document.getElementById("saveList");
saveList.addEventListener("click", function () {
  var addListBtn = document.getElementById("addListBtn");
  var webtask = localStorage.getItem("localtask");
  var taskObj = JSON.parse(webtask);
  var saveindex = document.getElementById("saveindex").value;

  for (keys in taskObj[saveindex]) {
    if (keys == 'task_name') {
      taskObj[saveindex].task_name = addList.value;
    }
  }

  saveList.style.display = "none";
  addListBtn.style.display = "block";
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  addList.value = '';
  showtask();
});

function deleteitem(index) {
  var webtask = localStorage.getItem("localtask");
  var taskObj = JSON.parse(webtask);
  taskObj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();
}

var addedtasklist = document.getElementById("addedtasklist");
addedtasklist.addEventListener("click", function (e) {
  var webtask = localStorage.getItem("localtask");
  var taskObj = JSON.parse(webtask);
  var mytarget = e.target;

  if (mytarget.classList[0] === 'text-success') {
    var mytargetid = mytarget.getAttribute("id");
    mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;

    for (keys in taskObj[mytargetid]) {
      if (keys == 'completeStatus' && taskObj[mytargetid][keys] == true) {
        taskObj[mytargetid].completeStatus = false;
      } else if (keys == 'completeStatus' && taskObj[mytargetid][keys] == false) {
        taskObj[mytargetid].completeStatus = true;
      }
    }

    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
  }
});
var deleteAll = document.getElementById("deleteAll");
deleteAll.addEventListener("click", function () {
  var saveList = document.getElementById("saveList");
  var addListBtn = document.getElementById("addListBtn");
  var webtask = localStorage.getItem("localtask");
  var taskObj = JSON.parse(webtask);

  if (webtask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
    taskObj = [];
  }

  saveList.style.display = "none";
  addListBtn.style.display = "block";
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();
});
var searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function () {
  var trlist = document.querySelectorAll("tr");
  Array.from(trlist).forEach(function (item) {
    var searchedtext = item.getElementsByTagName("td")[0].innerText;
    var searchtextboxval = searchtextbox.value;
    var re = new RegExp(searchtextboxval, 'gi');

    if (searchedtext.match(re)) {
      item.style.display = "table-row";
    } else {
      item.style.display = "none";
    }
  });
});