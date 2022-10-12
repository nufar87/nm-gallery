'use strict';

function onInit() {
  renderTodos();
}

function renderTodos() {
  const todos = getTodosForDisplay();

  if (todos.length === 0 || !todos) {
    var addInfo;
    if (getTotalCount() === 0) addInfo = '';
    else if (getActiveCount() === 0) addInfo = ' active';
    else addInfo = 'Done';
    var message = `No ${addInfo} todos`;
    return (document.querySelector(
      '.todo-list'
    ).innerHTML = `<h3>${message}</h3>`);
  }

  const strHTMLs = todos.map(
    (todo) => `
        <li class="${todo.isDone ? 'done' : ''}" onclick="onToggleTodo('${
      todo.id
    }')">
    <button onclick="onRemoveTodo(event,'${todo.id}')" >X</button>
        <span class="importance">${todo.importance} </span>${
      todo.txt
    } <span class="time"> ${todo.time}</span>   
        </li>
    `
  );

  document.querySelector('ul').innerHTML = strHTMLs.join('');
  document.querySelector('span.total').innerText = getTotalCount();
  document.querySelector('span.active').innerText = getActiveCount();
}

function onRemoveTodo(ev, todoId) {
  ev.stopPropagation();
  console.log('Removing:', todoId);
  var validation = confirm('are you sure');
  if (!validation) return;
  removeTodo(todoId);
  renderTodos();
}

function onToggleTodo(todoId) {
  console.log('Toggling:', todoId);
  toggleTodo(todoId);
  renderTodos();
}

function onAddTodo(ev) {
  ev.preventDefault();
  const time = new Date();
  const elTxt = document.querySelector('[name=txt]');
  const elImportance = document.querySelector('[name=importance]');
  const txt = elTxt.value;
  var importance = elImportance.value;
  if (!txt) {
    alert('you forgot something!');
    return;
  }
  addTodo(txt, importance, time);
  renderTodos();
  elTxt.value = '';
}

function onSetFilter(filterBy) {
  console.log('filterBy:', filterBy);
  setFilter(filterBy);
  renderTodos();
}

function onSortList(sortBy) {
  console.log('sort by:', sortBy);
  setSort(sortBy);
  renderTodos();
}

function onSetFilterByTxt(txt) {
  console.log('Filtering by txt', txt);
  setFilterByTxt(txt);
  renderTodos();
}

// function renderArrow () {
//     ${!gIsFiltered ? "<button class="arrow-up" onclick="onArrowUp(event,this,'${todo.id}')" ></button>
//     <button class="arrow-down" onclick="onArrowDown(event,this,'${todo.id}')" >X</button>"
//      :''}

// }
