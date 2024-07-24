# Novel Nest
## Overview
"Novel Nest" is an online book ordering platform where users may browse, search, and purchase books from a handpicked collection. 
## Core Features of the MVP

 -  **Browse Books**: Users can browse a collection of books with essential details like title, author, genre, price, and description.
 -  **Search Functionality**: Users can search for books by title or author.
 -  **Filter Functionality**: Users can filter books by genre and price range.
 -  **View Book Details**: Users can view further information about a book by clicking on it.
 -  **Add to Cart**: Users can place books in a shopping cart to order.
 -  **Asynchronous Data Handling**: All API interactions will be processed asynchronously via JSON.
 -  **Single Page Application**: The entire site will run on a single page without any redirects or reloads.
 -  **Event Listeners**: To facilitate interactivity, the site will include at least three unique event listeners.
## API Data
For this project, we will use a JSON file (`db.json`) with a collection of books. Each book object will have the following attributes:

 -   **Title**: Name of the book
 -   **Author**: Name of the author
 -   **Genre**: Genre of the book
 -   **Description**: Short description of the book
 -   **Price**: Price of the book
### User Stories
 - As a user, I want to explore a library of books to find intriguing titles to read.  
- As a user, I'd like to search for books by title or author to find specific books quickly.  
- As a user, I'd like to filter books by genre and price range to find books that meet my choices.  
- As a user, I want to see thorough information on a book before deciding whether to read it.  
- As a user, I want to add books to my cart so that I can simply purchase them.
## JSON Requests Structure

-   **GET** `/books`: Fetch the list of all books.
-   **GET** `/books/:id`: Fetch details of a specific book by ID.
-   **POST** `/cart`: Add a book to the shopping cart.
-   **DELETE** `/cart/:id`: Remove a book from the shopping cart.
## conclusion
The website will have a listing of books, each with detailed information such as title, author, genre, price, and description. The site allows users to examine book details, search for specific books, and filter books based on category or price range. The website will offer a smooth and interactive user experience, with no page reloads or redirects.