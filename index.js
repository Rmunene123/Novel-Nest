// Initialize variables
const bookList = document.getElementById('book-list');
const searchInput = document.getElementById('search');
const genreFilter = document.getElementById('genre-filter');
const priceFilter = document.getElementById('price-filter');
const darkModeToggle = document.getElementById('dark-mode-toggle');

let books = [];

// Fetch books from API
function fetchBooks() {
  fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(data => {
      books = data;
      displayBooks(books);
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
}

// Display books
function displayBooks(books) {
  bookList.innerHTML = books.map(book => `
    <div class="book">
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Price:</strong> KSH ${book.price.toFixed(2)}</p>
      <p>${book.description}</p>
    </div>
  `).join('');
}

// Filter books
function filterBooks() {
  const searchTerm = searchInput.value.toLowerCase();
  const genre = genreFilter.value;
  const maxPrice = parseFloat(priceFilter.value);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm);
    const matchesGenre = genre === '' || book.genre === genre;
    const matchesPrice = isNaN(maxPrice) || book.price <= maxPrice;
    return matchesSearch && matchesGenre && matchesPrice;
  });

  displayBooks(filteredBooks);
}

// Event listeners
searchInput.addEventListener('input', filterBooks);
genreFilter.addEventListener('change', filterBooks);
priceFilter.addEventListener('input', filterBooks);
darkModeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
});

// Initial fetch
fetchBooks();
