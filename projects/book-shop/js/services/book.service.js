'use strict';

const STORAGE_KEY = 'booksDB';
const PAGE_SIZE = 3;

var gBooksDisplay;
const gBooksNames = [
  'Harry Potter',
  'Big Magic',
  'Untamed',
  'One',
  'Atomic Habits',
];

var gBooksDisplay = 'cards';
var gSortBy = '';
var gPageIdx = 0;
var gBooks = _createBooks();
var gFilterBy = { maxPrice: 40, minRate: 0, txt: '' };

function getBooksNames() {
  return gBooksNames;
}

function getNumOfPages() {
  return Math.ceil(gBooks.length / PAGE_SIZE);
}

function getPageNum(pageStatus) {
  if (pageStatus === 'previous') {
    if (gPageIdx === 0) return false;
    gPageIdx--;
  } else if (pageStatus === 'next') {
    if (gPageIdx >= getNumOfPages() - 1) return false;
    gPageIdx++;
  } else gPageIdx = pageStatus;
  return true;
}

//new
function getBooksForDisplay() {
  var books = gBooks;

  if (gSortBy === 'price') books.sort((a, b) => a.price - b.price);
  else if (gSortBy === 'rate') books.sort((a, b) => a.rate - b.rate);
  else books.sort((a, b) => a.name.localeCompare(b.name));
  return books;
}

function getBooks() {
  //   Filtering:
  var books = getBooksForDisplay().filter(
    (book) =>
      book.price <= +gFilterBy.maxPrice && book.rate >= +gFilterBy.minRate
  );
  //   && book.name.toLowerCase().includes(gFilterBy.txt.toLowerCase())

  books = books.filter((book) =>
    book.name.toLowerCase().includes(gFilterBy.txt.toLowerCase())
  );

  //   //   Paging:
  const startIdx = gPageIdx * PAGE_SIZE;
  books = books.slice(startIdx, startIdx + PAGE_SIZE);
  //   console.log(books);
  return books;
}

_createBooks();

function removeBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => bookId === book.id);
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}

function addBook(name, price) {
  var book = _createBook(name, price);
  gBooks.unshift(book);
  _saveBooksToStorage();
  return book;
}

function getBookById(bookId) {
  return gBooks.find((book) => bookId === book.id);
}

function updateBook(bookId, newPrice) {
  const book = gBooks.find((book) => book.id === bookId);
  book.price = newPrice;
  _saveBooksToStorage();
  return book;
}

function _createBook(name, price, imgURL) {
  return {
    id: makeId(),
    name,
    price,
    imgURL,
    desc: makeLorem(),
    rate: 0,
  };
}

function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY);
  // Nothing in storage - generate demo data
  if (!books || !books.length) {
    books = [];
    for (let i = 0; i < 21; i++) {
      var bookName =
        gBooksNames[getRandomIntInclusive(0, gBooksNames.length - 1)];
      var bookPrice = getRandomIntInclusive(8, 50);
      books.push(_createBook(bookName, bookPrice));
    }
  }
  gBooks = books;
  _saveBooksToStorage();
}

function setBookFilter(filterBy) {
  console.log(filterBy);
  if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice;
  if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate;
  if (filterBy.txt) {
    gFilterBy.txt = filterBy.txt;
  } else {
    gFilterBy.txt = '';
  }
  return gFilterBy;
}

function setBookSort(sortBy = {}) {
  if (sortBy.price !== undefined) {
    gBooks.sort((b1, b2) => (b1.price - b2.price) * sortBy.parice);
  } else if (sortBy.rate !== undefined) {
    gBooks.sort((b1, b2) => (b2.rate - b1.rate) * sortBy.rate);
  } else if (sortBy.name !== undefined) {
    sortByName();
  }
}

function sortByName() {
  gBooks.sort((b1, b2) => {
    var bookName1 = b1.name.toUpperCase();
    var bookName2 = b2.name.toUpperCase();
    if (bookName1 < bookName2) return -1;
    else if (bookName1 > bookName2) return 1;
    else return 0;
  });
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks);
}

function updateRating(bookId, diff) {
  var book = getBookById(bookId);
  if ((book.rate === 10 && diff === 1) || (book.rate === 0 && diff === -1))
    return;
  book.rate += diff;
  _saveBooksToStorage();
}

function updategSortBy(sortBy) {
  gSortBy = sortBy;
}

function updategBooksDisplay(status) {
  gBooksDisplay = status === 'list' ? 'list' : 'cards';
  console.log(gBooksDisplay);
}
