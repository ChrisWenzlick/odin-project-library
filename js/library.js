// Constants

const myLibrary = [];
const libraryGrid = document.getElementById('library-grid');
const newBookButton = document.getElementById('new-book-button');

const newBookDialog = document.getElementById('new-book-dialog');
const newBookTitle = document.getElementById('new-book-title');
const newBookAuthor = document.getElementById('new-book-author');
const newBookPageCount = document.getElementById('new-book-page-count');
const newBookIsRead = document.getElementById('new-book-is-read');
const newBookErrors = document.getElementById('new-book-errors');
const addNewBookButton = document.getElementById('add-book-button');
const cancelNewBookButton = document.getElementById('cancel-new-book-button');


// Object Constructors and Prototype Functions

function Book(title, author, pageCount, isRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.isRead ? 'read' : 'not read yet'}`;
};

Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
}


// Functions

function addBookToLibrary(title, author, pageCount, isRead) {
    const newBook = new Book(title, author, pageCount, isRead);
    myLibrary.push(newBook);
    createBookCard(newBook, myLibrary.length - 1);
}

function createBookCard(book, bookIndex) {
    if(book instanceof Book) {
        const bookCardDiv = document.createElement('div');
        bookCardDiv.className = 'card';
        bookCardDiv.setAttribute('data-book-index', bookIndex);

        const bookCardTitle = document.createElement('p');
        bookCardTitle.className = 'title';
        bookCardTitle.textContent = book.title;

        const bookCardAuthor = document.createElement('p');
        bookCardAuthor.className = 'author';
        bookCardAuthor.textContent = book.author;

        const bookCardDetails = document.createElement('div');
        bookCardDetails.className = 'card-details';

        const bookCardPageCount = document.createElement('p');
        bookCardPageCount.className = 'page-count';
        bookCardPageCount.textContent = `${book.pageCount} pages`;

        const bookCardIsRead = document.createElement('p');
        bookCardIsRead.className = 'is-read';
        bookCardIsRead.textContent = book.isRead ? 'Read' : 'Unread';

        const bookCardButtons = document.createElement('div');
        bookCardButtons.className = 'book-card-buttons';

        const bookCardDeleteButton = document.createElement('button');
        bookCardDeleteButton.className = 'button-delete';
        bookCardDeleteButton.textContent = 'Delete';
        bookCardDeleteButton.addEventListener('click', () => {
            console.log(bookIndex);
            deleteBook(bookIndex);
            updateBookGrid();
        });

        const bookCardToggleReadButton = document.createElement('button');
        bookCardToggleReadButton.className = 'button-primary';
        bookCardToggleReadButton.textContent = 'Toggle Read';
        bookCardToggleReadButton.addEventListener('click', () => {
            book.toggleReadStatus();
            updateBookGrid();
        });

        bookCardDiv.appendChild(bookCardTitle);
        bookCardDiv.appendChild(bookCardAuthor);
        bookCardDetails.appendChild(bookCardPageCount);
        bookCardDetails.appendChild(bookCardIsRead);
        bookCardDiv.appendChild(bookCardDetails);

        bookCardButtons.appendChild(bookCardToggleReadButton);
        bookCardButtons.appendChild(bookCardDeleteButton);
        bookCardDiv.appendChild(bookCardButtons);

        libraryGrid.appendChild(bookCardDiv);
    }
}

function updateBookGrid() {
    libraryGrid.innerHTML = '';
    for(let i = 0; i < myLibrary.length; i++) {
        createBookCard(myLibrary[i], i);
    }
}

function resetNewBookForm() {
    newBookTitle.textContent = '';
    newBookAuthor.textContent = '';
    newBookPageCount.textContent = '';
    newBookIsRead.value = false;
    resetAddNewBookDialogErrors();
}

function validateNewBookForm() {
    let isValid = true;

    if(newBookTitle.value === '') {
        addNewBookDialogError('New books must have a title.');
        isValid = false;
    }

    if(newBookAuthor.value === '') {
        addNewBookDialogError('New books must have an author.');
        isValid = false;
    }

    if(newBookPageCount.value === '') {
        addNewBookDialogError('New books must have a page count.');
        isValid = false;
    }
    else if(!isInteger(newBookPageCount.value)) {
        addNewBookDialogError('Please provide a valid number for the page count.');
        isValid = false;
    }

    return isValid;
}

function addNewBookDialogError(errorText) {
    const newError = document.createElement('p');
    newError.textContent = errorText;
    newBookErrors.appendChild(newError);
}

function resetAddNewBookDialogErrors() {
    newBookErrors.innerHTML = '';
}

function deleteBook(bookIndex) {
    myLibrary.splice(bookIndex, 1);
}

function isInteger(inputString) {
    return inputString == Number.parseInt(inputString);
}

function addTestBooks() {
    addBookToLibrary('Cribsheet', 'Emily Oster', 291, false);
    addBookToLibrary('Cocktail Codex', 'Alex Day, Nick Fauchald, David Kaplan', 302, false);
    addBookToLibrary('Grit', 'Angela Duckworth', 282, false);
    addBookToLibrary('The Talent Code', 'Daniel Coyle', 267, false);
    addBookToLibrary('Grimm\'s Complete Fairy Tales', 'The Brothers Grimm', 652, false);
    addBookToLibrary('I Will Teach You To Be Rich', 'Ramit Sethi', 334, false);
    addBookToLibrary('Salt Fat Acid Heat', 'Samin Nosrat', 440, false);
    addBookToLibrary('The Art of Game Design: A Book of Lenses', 'Jesse Schell', 580, false);
}


// Event Listeners

newBookButton.addEventListener('click', () => {
    resetNewBookForm();
    newBookDialog.showModal();
});

addNewBookButton.addEventListener('click', (e) => {
    e.preventDefault(); // prevents the form from actually submitting
    resetAddNewBookDialogErrors();
    if(validateNewBookForm() === true) {
        addBookToLibrary(newBookTitle.value, newBookAuthor.value, newBookPageCount.value, newBookIsRead.value);
        newBookDialog.close(); // NOTE: When implemented, send book index here in the close() function
    }
});

cancelNewBookButton.addEventListener('click', () => {
    newBookDialog.close(null);
});


// Logic

addTestBooks();