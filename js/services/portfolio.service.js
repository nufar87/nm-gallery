'use strict';

var gProjs = [
  {
    id: 'mine-sweeper',
    name: 'Mine-Sweeper',
    title: 'find those mines',
    des: 'In this game I had to understand the logic of the game Mine Sweeper.\n I had to design from scratch the whole game.',
    date: 'September 2022',
  },
  {
    id: 'touch-nums',
    name: 'Touch The Numbers',
    title: 'Click fast on those numbers',
    des: 'In this game I had to understand how to paint a matrix, make a timer, and connect all together.',
    date: 'September 2022',
  },
  {
    id: 'in-picture',
    name: 'What In The Picture',
    title: 'Choose the correct answer',
    des: 'In this project I had to understand how to use JS and HTML.',
    date: 'September 2022',
  },
  {
    id: 'pacman',
    name: 'Pacman',
    title: 'Beat those ghosts',
    des: 'In this project I had to understand how to make the game work.',
    date: 'September 2022',
  },
  {
    id: 'todos',
    name: 'Todos List',
    title: 'Create your own list',
    des: 'In this project I had to understand how to use MVC. How to make a sort function and get an input.',
    date: 'September 2022',
  },
  {
    id: 'book-shop',
    name: 'Book-Shop',
    title: 'Welcome to my bookshop',
    des: 'In this project I had to understand how to use MVC. How to sort and filter inputs.',
    date: 'September 2022',
  },
];

function getProjects() {
  return gProjs;
}

function getProjById(id) {
  return gProjs.find(function (proj) {
    return proj.id === id;
  });
}
