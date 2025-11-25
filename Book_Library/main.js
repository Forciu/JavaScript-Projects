const submitForm = document.getElementById("form-book-operation");

class Book {
    constructor(title, author, isRead) {
        this.title = title;
        this.author = author;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }
}

const myLibrary = new Library();

const addBook = (e) => {
    e.preventDefault();

    const book = getBookInfo();

    myLibrary.addBook(book);
    createCard(book);

    submitForm.reset();
}

const getBookInfo = () => {
    const bookTitle = document.getElementById("book-title").value;
    const bookAuthor = document.getElementById("book-author").value;
    const bookIsRead = document.getElementById("book-is-read").value;

    return new Book(bookTitle, bookAuthor, bookIsRead);
}

const createCard = (book) => {
    const cardContainer = document.getElementById("container-books");
    const card = document.createElement("div");
    const cardInfoDiv = document.createElement("div");
    const cardTitleText = document.createElement("p");
    const cardAuthorText = document.createElement("p");
    const cardOperationsDiv = document.createElement("div");
    const statusButton = document.createElement("button");
    const removeBookButton = document.createElement("button");

    cardContainer.appendChild(card).className = "book-card flex flex-column";
    card.appendChild(cardInfoDiv).className = "book-info flex flex-center flex-column";
    cardInfoDiv.appendChild(cardTitleText).className = "book-title";
    cardInfoDiv.appendChild(cardAuthorText).className = "book-author";
    card.appendChild(cardOperationsDiv).className = "books-operations-buttons flex flex-center flex-column";
    cardOperationsDiv.appendChild(statusButton).className = "button";
    cardOperationsDiv.appendChild(removeBookButton).className = "button";

    cardTitleText.innerText = book.title;
    cardAuthorText.innerText = book.author;

    if (book.isRead === 'read') {
        statusButton.innerText = `Read`;
        statusButton.style.backgroundColor = "#0a9f03";
    } else {
        statusButton.innerText = `To read`;
        statusButton.style.backgroundColor = "#ff2f2f";
    }

    removeBookButton.innerText = `Remove`;
}

submitForm.onsubmit = addBook;