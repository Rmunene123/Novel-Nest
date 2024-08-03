// Function to fetch books from the API
function fetchBooks() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/books', true);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var books = JSON.parse(xhr.responseText);
      displayBooks(books); 
      populateGenres(books); 
      displayTopPicks(books); 
    } else {
      console.error('Error fetching books:', xhr.statusText); // Handle HTTP errors
    }
  };
  xhr.onerror = function () {
    console.error('Network error occurred.'); // Handle network errors
  };
  xhr.send(); // Send the request
}

// Function to display books on the page
function displayBooks(books) {
  var bookDisplay = document.getElementById('book-display');
  bookDisplay.innerHTML = books.map(function (book) {
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
  likeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var bookId = this.closest('.book').getAttribute('data-id');
      addToFavorites(bookId); // Add the book to favorites
    });
  });

  // Attach event listeners to Add to Cart buttons
  var addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var bookId = this.closest('.book').getAttribute('data-id');
      addToCart(bookId); // Add the book to the cart
    });
  });
}

// Function to display top picks
function displayTopPicks(books) {
  var topPicksList = document.getElementById('top-picks-list');
  var topPicks = books.filter(function (book) {
    return book.topPick; // Filter books that are marked as top picks
  });
  topPicksList.innerHTML = topPicks.map(function (book) {
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

// Function to generate HTML for star ratings i.e. five star ratings
function getStars(rating) {
  var stars = '';
  for (var i = 0; i < 5; i++) {
    stars += `<span>${i < rating ? '★' : '☆'}</span>`; // Display filled or empty stars based on rating
  }
  return stars;
}

// Function to populate the genre filter dropdown
function populateGenres(books) {
  var genres = books.map(function (book) {
    return book.genre; 
  });
  genres = Array.from(new Set(genres)); // Remove duplicate genres
  var genreSelect = document.getElementById('genre');
  genreSelect.innerHTML += genres.map(function (genre) {
    return `<option value="${genre}">${genre}</option>`; // Create an option element for each genre
  }).join('');
}

// Function to filter books by genre based on user selection
function filterBooks() {
  var genre = document.getElementById('genre').value;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/books', true);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var books = JSON.parse(xhr.responseText);
      var filteredBooks = genre ? books.filter(function (book) {
        return book.genre === genre; // Filter books by the selected genre eg: romance.....fiction etc.
      }) : books;
      displayBooks(filteredBooks); // Display the filtered books eg: romance - pride and prejudice
    } else {
      console.error('Error filtering books:', xhr.statusText); // Handle HTTP errors
    }
  };
  xhr.onerror = function () {
    console.error('Network error occurred.');
  };
  xhr.send(); 
}

// Function to add a book to the favorites list
function addToFavorites(bookId) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/books/' + bookId, true);
  xhr.onload = function () {
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
      favoritesList.appendChild(favoriteItem); // Add the book to the favorites list at the top of the screen
    } else {
      console.error('Error fetching book details:', xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error('Network error occurred.');
  };
  xhr.send(); 
}

// Function to add a book to the cart
function addToCart(bookId) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/books/' + bookId, true);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var book = JSON.parse(xhr.responseText);
      alert(`Added "${book.title}" to the cart.`); // Notify the user that the book was added to the cart
      // In a real application, you would likely send this information to a server
    } else {
      console.error('Error fetching book details:', xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error('Network error occurred.');
  };
  xhr.send();
}

// Fetch books initially when the page loads
fetchBooks();

// Attach event listener to the genre filter
var genreSelect = document.getElementById('genre');
if (genreSelect) {
  genreSelect.addEventListener('change', filterBooks); 
}
