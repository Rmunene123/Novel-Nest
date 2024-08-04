# Novel Nest
### Overview
"Novel Nest" is an online book ordering platform where users may browse, search, and purchase books from a handpicked collection. 
## Core Features of the MVP

 -  **Browse Books**: Users can browse a collection of books with essential details like title, author, genre, price, and description.
 -  **Search Functionality**: Users can search for books by genre.
 -  **Add to Cart**: Users can place books in a shopping cart to order.
 -  **Asynchronous Data Handling**: All API interactions will be processed asynchronously via JSON.
 -  **Single Page Application**: The entire site will run on a single page without any redirects or reloads.
 -  **Event Listeners**: To facilitate interactivity, the site will include at least three unique event listeners.
## API Data
For this project, we will use a JSON file (`db.json`) with a collection of books. Each book object will have the following attributes:

-   **Title**: Name of the book
-   **Author**: Author of the book
-   **Genre**: Genre category of the book
-   **Price**: Price of the book
-   **Discount**: Discount percentage on the book
-   **Cover Image**: URL to the book's cover image
-   **In Stock**: Availability status of the book
-   **Rating**: User rating of the book
-   **TopPick**: Boolean indicating whether the book is a featured top pick

### User Stories
 - As a user, I want to explore a library of books to find intriguing titles to read.  
- As a user, I'd like to see the prices of the books.
- As a user, I'd like to filter books by genre to find books that meet my choices.  
- As a user, I want to add books to my cart.
- As a user, I want to add books to favorite.
- As a user,I want to see the ratings of a book before purchasing it.
## JSON Requests Structure

-   **GET** `/books`: Fetch the list of all books.
-   **GET** `/books/:id`: Fetch details of a specific book by ID.

## conclusion
The website will have a listing of books, each with detailed information such as title, author, genre, price among others. The site allows users to examine book details, search for specific genres, see the book ratings and also see top picks of the books. The website will offer a smooth and interactive user experience, with no page reloads or redirects.