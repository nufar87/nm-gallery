'use strict';

const STORAGE_KEY = 'todoDB';
var gFilterBy = {
  txt: '',
  status: '',
};
var gTodos;
var gSort;
var gIsFiltered = false;

_createTodos();

function getTodosForDisplay() {
  var todos = gTodos;

  if (gFilterBy.status) {
    gIsFiltered = true;
    todos = todos.filter(
      (todo) =>
        (todo.isDone && gFilterBy.status === 'done') ||
        (!todo.isDone && gFilterBy.status === 'active')
    );
  } else {
    gIsFiltered = false;
  }

  todos = todos.filter((todo) =>
    todo.txt.toLowerCase().includes(gFilterBy.txt.toLowerCase())
  );
  sortToDoBeforeDisplay(todos);
  return todos;
}

function sortToDoBeforeDisplay(todos) {
  if (gSort === 'created')
    todos.sort((todoA, todoB) => todoA.time - todoB.time);
  else if (gSort === 'importance')
    todos.sort((todoA, todoB) => todoA.importance - todoB.importance);
  else if (gSort === 'txt') todos.sort(compare);
}

function compare(a, b) {
  var todoA = a.txt.toUpperCase();
  var todoB = b.txt.toUpperCase();
  let comparison = 0;
  if (todoA > todoB) comparison = 1;
  else if (todoA < todoB) comparison = -1;
  return comparison;
}

function removeTodo(todoId) {
  const todoIdx = gTodos.findIndex((todo) => todo.id === todoId);
  gTodos.splice(todoIdx, 1);
  _saveTodosToStorage();
}

function toggleTodo(todoId) {
  const todo = gTodos.find((todo) => todo.id === todoId);
  todo.isDone = !todo.isDone;
  _saveTodosToStorage();
}

function addTodo(txt, importance, time) {
  // const todo = {
  //     id: _makeId(),
  //     txt,
  //     isDone: false
  // }
  // THE SAME
  const todo = _createTodo(txt, importance, time);
  gTodos.push(todo);
  _saveTodosToStorage();
}

function setFilter(status) {
  gFilterBy.status = status;
}

function setSort(sortBy) {
  gSort = sortBy;
}
function setFilterByTxt(txt) {
  gFilterBy.txt = txt;
}

function getTotalCount() {
  return gTodos.length;
}

function getActiveCount() {
  return gTodos.filter((todo) => !todo.isDone).length;
}

function _createTodos() {
  var todos = loadFromStorage(STORAGE_KEY);

  if (!todos || !todos.length) {
    todos = [
      {
        id: 't101',
        txt: 'Learn HTML',
        isDone: true,
      },
      {
        id: 't102',
        txt: 'Master JS',
        isDone: false,
      },
      {
        id: 't103',
        txt: 'Study CSS',
        isDone: false,
      },
    ];
  }

  gTodos = todos;
  _saveTodosToStorage();
}

function _createTodo(txt, importance = 3, time = Date.now()) {
  var elImportance = document.querySelector('[name=importance]');
  var importance = elImportance.value;
  const todo = {
    id: _makeId(),
    txt,
    isDone: false,
    importance: importance,
    time: time,
  };
  return todo;
}

function _saveTodosToStorage() {
  saveToStorage(STORAGE_KEY, gTodos);
}

function _makeId(length = 5) {
  var txt = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    txt += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return txt;
}
