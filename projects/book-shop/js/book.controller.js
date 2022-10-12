'use strict';

function onInit() {
  //   renderFilterByQueryStringParams();

  renderBooks();
  renderPageBtns();
}

function renderBooksNamesInFilter() {
  const booksNames = getBooksNames();

  const strHTMLs = booksNames.map((vendor) => `<option>${vendor}</option>`);
  strHTMLs.unshift('<option value="">Select Vendor</option>');

  const elSelect = document.querySelector('.filter-vendor-select');
  elSelect.innerHTML = strHTMLs.join('');
}

function renderBooks() {
  const books = getBooks();
  renderPageBtns();
  const elListDisplay = document.querySelector('.list-display');
  const elCardsDisplay = document.querySelector('.card-display');

  if (gBooksDisplay === 'list') {
    renderByList(books);
    elListDisplay.classList.remove('hide');
    elCardsDisplay.classList.add('hide');
  } else {
    renderByCards(books);
    elListDisplay.classList.add('hide');
    elCardsDisplay.classList.remove('hide');
  }
}

function renderPageBtns() {
  var numOfPages = getNumOfPages();
  var strHTML = `<button onclick="onGetPageNum('previous')">&#171</button>`;
  for (var i = 0; i < numOfPages; i++) {
    strHTML += `<button onclick="onGetPageNum(${i})">${i + 1}</button>`;
  }
  strHTML += `<button onclick="onGetPageNum('next')">&#187</button>`;
  document.querySelector('.switch-page').innerHTML = strHTML;
}
function onGetPageNum(pageStatus) {
  if (getPageNum(pageStatus)) renderBooks();
}

function renderByCards(books) {
  var strHtmls = books.map(
    (book) => `
          <article class="book-preview">
              <button class="btn-remove" onclick="onRemoveBook('${book.id}')">X</button>
              <h5>${book.name}</h5>
              <img onerror="this.src='img/Harry Potter.jpeg'" src="img/${book.name}.jpeg" alt="Book name ${book.name}">
              <h6>price: $<span>${book.price}</span></h6>
              <button onclick="onReadBook('${book.id}')">Read</button>
              <button onclick="onUpdateBook('${book.id}')">Update</button>
          </article> 
          `
  );
  document.querySelector('.card-display').innerHTML = strHtmls.join('');
}

function renderByList(books) {
  var books = getBooks();
  var strHTMLs = books.map(function (book) {
    return `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>$${book.price}</td>
        <td><button class="read-button" onclick="onReadBook('${book.id}')">Read</button></td>
        <td><button class="update-button" onclick="onUpdateBook('${book.id}')">Update</button></td>
        <td><button class="delete-button" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`;
  });
  document.querySelector('.table-books-container').innerHTML =
    strHTMLs.join('');
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  renderBooks();
  flashMsg(`Book Deleted`);
}

function onAddBook() {
  var bookName = prompt('book name?', 'Harry Potter');
  var bookPrice = prompt('book price?', '$20');
  if (bookName && bookPrice) {
    const book = addBook(bookName, bookPrice);
    renderBooks();
    flashMsg(`Book Added (id: ${book.id})`);
  }
}

function onUpdateBook(bookId) {
  const book = getBookById(bookId);
  var newPrice = +prompt('Price?', book.price);
  if (newPrice && book.price !== newPrice) {
    const book = updateBook(bookId, newPrice);
    renderBooks();
    flashMsg(`Price updated to: $${book.price}`);
  }
}

function onReadBook(bookId) {
  var book = getBookById(bookId);
  var elModal = document.querySelector('.modal');
  elModal.querySelector('h2').innerText = book.name;
  elModal.querySelector('h3 span').innerText = book.price;
  elModal.querySelector('p').innerText = book.desc;

  document.querySelector('.modal>img').src = `img/${book.name}.jpeg`;

  document.querySelector('.book-rating').innerHTML = `Rating:
  <button onclick="onUpdateRating('${book.id}', -1)">-</button>
  <span>${book.rate}</span><button onclick="onUpdateRating('${book.id}', 1)">+</button>`;

  elModal.classList.add('open');
}

function onSetFilterBy(filterBy) {
  filterBy = setBookFilter(filterBy);
  renderBooks();

  const queryStringParams = `?price=${filterBy.maxPrice}&rate=${filterBy.minRate}`;
  const newUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    queryStringParams;
  window.history.pushState({ path: newUrl }, '', newUrl);
}

function onCloseModal() {
  document.querySelector('.modal').classList.remove('open');
}

function flashMsg(msg) {
  const el = document.querySelector('.user-msg');
  el.innerText = msg;
  el.classList.add('open');
  setTimeout(() => {
    el.classList.remove('open');
  }, 3000);
}

function renderFilterByQueryStringParams() {
  const queryStringParams = new URLSearchParams(window.location.search);
  const filterBy = {
    maxPrice: queryStringParams.get('price') || '',
    minRate: +queryStringParams.get('rate') || 0,
  };

  if (!filterBy.maxPrice && !filterBy.minRate) return;

  document.querySelector('.filter-price-select').value = filterBy.maxPrice;
  document.querySelector('.filter-rate-range').value = filterBy.minRate;
  setBookFilter(filterBy);
}

function onSetFilterByTxt(txt) {
  console.log('Filtering by txt', txt);
  setFilterByTxt(txt);
  renderBooks();
}

function onSetSortBy(sortBySelection) {
  updategSortBy(sortBySelection);
  const prop = document.querySelector('.sort-by').value;
  const isDesc = document.querySelector('.sort-desc').checked;

  const sortBy = {};
  sortBy[prop] = isDesc ? -1 : 1;

  setBookSort(sortBy);
  renderBooks();
}
function onGetPageNum(pageStatus) {
  if (getPageNum(pageStatus)) renderBooks();
}

function onUpdateRating(bookId, diff) {
  updateRating(bookId, diff);
  onReadBook(bookId);
}

function onSetBooksDisplay(status) {
  updategBooksDisplay(status);
  renderBooks();
}
