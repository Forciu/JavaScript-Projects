const submitForm = document.getElementById("form-book-operation");

class Book {
    constructor(title, author, isRead, id) {
        this.title = title;
        this.author = author;
        this.isRead = isRead;
        this.id = id;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        console.log(this.books)
    }

    deleteBook(book) {
        this.books.splice(book.id, 1);
    }
}

const myLibrary = new Library();

const addBook = (e) => {
    e.preventDefault();

    const book = getBookInfo();

    book.id = crypto.randomUUID()
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
    cardOperationsDiv.appendChild(statusButton).className = "button book-button";
    statusButton.id = "status-button";
    cardOperationsDiv.appendChild(removeBookButton).className = "button book-button";

    cardTitleText.innerText = book.title;
    cardAuthorText.innerText = book.author;

    if (book.isRead === 'read') {
        statusButton.innerText = `Read`;
        statusButton.classList.add("read");
    } else {
        statusButton.innerText = `To read`;
        statusButton.classList.add("to-read");
    }

    removeBookButton.innerText = `Remove`;

    statusButton.addEventListener("click", changeBookStatus);
    removeBookButton.addEventListener("click", () => deleteBook(book, card));
}

const changeBookStatus = function () {
    if (this.classList.contains("read")) {
        this.classList.remove("read");
        this.classList.add("to-read");
        this.innerText = `To read`;

    } else {
        this.classList.remove("to-read");
        this.classList.add("read");
        this.html = `Read`;
    }
}

const deleteBook = (book, card) => {
    myLibrary.deleteBook(book.id);
    card.remove()
}

submitForm.addEventListener("submit", addBook);