// Function to fetch books from the API
function fetchBooks() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/books', true);
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      var books = JSON.parse(xhr.responseText);
      displayBooks(books);
      populateGenres(books);
      displayTopPicks(books);
    } else {
      console.error('Error fetching books:', xhr.statusText);
    }
  };
  xhr.onerror = function() {
    console.error('Network error occurred.');
  };
  xhr.send();
}

// Function to display books
function displayBooks(books) {
  var bookDisplay = document.getElementById('book-display');
  bookDisplay.innerHTML = books.map(function(book) {
    return `
      <div class="book" data-id="${book.id}">
        <img src="${book.coverImage}" alt="${book.title}">
        ${book.discount > 0 ? `<div class="discount-label">${book.discount}% OFF</div>` : ''}
        <h2>${book.title}</h2>
        <p>${book.author}</p>
        <p>KES ${book.price.toFixed(2)}</p>
        <div class="stars">${getStars(book.rating)}</div>
        ${book.inStock ? '<button class="add-to-cart">Add to Cart</button>' : '<p>Out of Stock</p>'}
        <button class="like">Like</button>
      </div>
    `;
  }).join('');

  // Attach event listeners to Like buttons
  var likeButtons = document.querySelectorAll('.like');
  likeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var bookId = this.closest('.book').getAttribute('data-id');
      addToFavorites(bookId);
    });
  });

  // Attach event listeners to Add to Cart buttons
  var addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var bookId = this.closest('.book').getAttribute('data-id');
      addToCart(bookId);
    });
  });
}

// Function to display top picks
function displayTopPicks(books) {
  var topPicksList = document.getElementById('top-picks-list');
  var topPicks = books.filter(function(book) {
    return book.topPick;
  });
  topPicksList.innerHTML = topPicks.map(function(book) {
    return `
      <div class="book" data-id="${book.id}">
        <img src="${book.coverImage}" alt="${book.title}">
        ${book.discount > 0 ? `<div class="discount-label">${book.discount}% OFF</div>` : ''}
        <h2>${book.title}</h2>
        <p>${book.author}</p>
        <p>KES ${book.price.toFixed(2)}</p>
        <div class="stars">${getStars(book.rating)}</div>
        ${book.inStock ? '<button class="add-to-cart">Add to Cart</button>' : '<p>Out of Stock</p>'}
      </div>
    `;
  }).join('');
}

// Function to get star rating HTML
function getStars(rating) {
  var stars = '';
  for (var i = 0; i < 5; i++) {
    stars += `<span>${i < rating ? '★' : '☆'}</span>`;
  }
  return stars;
}

// Function to populate genre filter
function populateGenres(books) {
  var genres = books.map(function(book) {
    return book.genre;
  });
  genres = Array.from(new Set(genres)); // Remove duplicates
  var genreSelect = document.getElementById('genre');
  genreSelect.innerHTML += genres.map(function(genre) {
    return `<option value="${genre}">${genre}</option>`;
  }).join('');
}

// Function to filter books by genre
function filterBooks() {
  var genre = document.getElementById('genre').value;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/books', true);
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      var books = JSON.parse(xhr.responseText);
      var filteredBooks = genre ? books.filter(function(book) {
        return book.genre === genre;
      }) : books;
      displayBooks(filteredBooks);
    } else {
      console.error('Error filtering books:', xhr.statusText);
    }
  };
  xhr.onerror = function() {
    console.error('Network error occurred.');
  };
  xhr.send();
}

// Function to add a book to favorites
function addToFavorites(bookId) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/books/' + bookId, true);
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      var book = JSON.parse(xhr.responseText);
      var favoritesList = document.getElementById('favorites-list');
      var favoriteItem = document.createElement('div');
      favoriteItem.className = 'book';
      favoriteItem.innerHTML = `
        <img src="${book.coverImage}" alt="${book.title}">
        <h2>${book.title}</h2>
        <p>${book.author}</p>
        <p>KES ${book.price.toFixed(2)}</p>
      `;
      favoritesList.appendChild(favoriteItem);
    } else {
      console.error('Error fetching book details:', xhr.statusText);
    }
  };
  xhr.onerror = function() {
    console.error('Network error occurred.');
  };
  xhr.send();
}

// Function to add a book to the cart
function addToCart(bookId) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/books/' + bookId, true);
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      var book = JSON.parse(xhr.responseText);
      alert(`Added "${book.title}" to the cart.`);
      // In a real application, you would probably send this info to a server or update the UI.
    } else {
      console.error('Error fetching book details:', xhr.statusText);
    }
  };
  xhr.onerror = function() {
    console.error('Network error occurred.');
  };
  xhr.send();
}

// Attach event listener to the genre filter
var genreSelect = document.getElementById('genre');
if (genreSelect) {
  genreSelect.addEventListener('change', filterBooks);
}

// Fetch books initially
fetchBooks();
