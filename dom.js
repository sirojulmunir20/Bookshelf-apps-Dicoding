const INCOMPLETE_BOOKSHELFLIST = "inCompleteBookshelfList";
const COMPLETE_BOOK_SHELFLIST = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook(){
    const inCompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELFLIST);
    const completeBookshelfList = document.getElementById(COMPLETE_BOOK_SHELFLIST);

    const inputBookTitle = document.getElementById("inputBookTitle").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;
    const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

    const book = makeBook(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);
    const bookObject = composeBookObject(inputBookTitle, inputBookAuthor,inputBookYear, inputBookIsComplete);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if(inputBookIsComplete == false){
        inCompleteBookshelfList.append(book);
    }else{
        completeBookshelfList.append(book);
    }

    updateDataToStorage();

    
}

function makeBook(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete){
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = inputBookTitle;
    bookTitle.classList.add("move")

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = inputBookAuthor;

    const bookYears = document.createElement("p");
    bookYears.classList.add("year");
    bookYears.innerText = inputBookYear;

    const bookIsComplete = createCompleteButton();

    const bookRemove = createRemoveButton();
    bookRemove.innerText = "Hapus";

    const bookAction = document.createElement("div");
    bookAction.classList.add("action");
    if(inputBookIsComplete == true){
        bookIsComplete.innerText = "belum selesai";
    }else{
        bookIsComplete.innerText = "sudah selesai";
    }

    bookAction.append(bookIsComplete, bookRemove);
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");
    bookItem.append(bookTitle, bookAuthor,bookYears, bookAction);

    return bookItem;

    
}

function createButton (buttonTypeClass, eventListener){
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event){
        eventListener(event);
    });
    return button;
}

function createCompleteButton(){
    return createButton("green", function(event){
        const parent = event.target.parentElement;
        addBookToCompleted(parent.parentElement);
    });
};

function removeBook(bookElement){
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    if(window.confirm("Apakah anda ingin menghapus buku ini dari rak?")){
        books.splice(bookPosition, 1);
        bookElement.remove();
    }
    updateDataToStorage();

    
};

function createRemoveButton(){
    return createButton("red", function(event){
        const parent = event.target.parentElement;
        removeBook(parent.parentElement);
    });
};

function addBookToCompleted(bookElement){
    const bookTitled = bookElement.querySelector(".book_item > h3").innerText;
    const bookAuthored = bookElement.querySelector(".book_item > p").innerText;
    const bookYeared = bookElement.querySelector(".year").innerText;
    const bookIsComplete = bookElement.querySelector(".green").innerText;

    if(bookIsComplete == "sudah selesai"){
        const newBook = makeBook(bookTitled, bookAuthored, bookYeared, true);

        const book = findBook(bookElement[BOOK_ITEMID]);
        book.isCompleted = true;
        newBook[BOOK_ITEMID] = book.id;

        const completeBookshelfList = document.getElementById(COMPLETE_BOOK_SHELFLIST);
        completeBookshelfList.append(newBook);
    }else{
        const newBook = makeBook(bookTitled, bookAuthored, bookYeared, false)

        const book = findBook(bookElement[BOOK_ITEMID]);
        book.isCompleted = false;
        newBook[BOOK_ITEMID] = book.id;

        const inCompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELFLIST);
        inCompleteBookshelfList.append(newBook);
    }
    bookElement.remove();

    updateDataToStorage();

    
}

function refreshDataFromBooks(){
    const listUnCompleted = document.getElementById(INCOMPLETE_BOOKSHELFLIST);
    const listCompleted = document.getElementById(COMPLETE_BOOK_SHELFLIST);

    for(book of books){
        const newbook = makeBook(book.title, book.author, book.year, book.isCompleted);
        newbook[BOOK_ITEMID] = book.id;

        if(book.isCompleted == false){
            listUnCompleted.append(newbook);
        }else{
            listCompleted.append(newbook);
        }
    }

   
}

function searchBook(){
    const inputSearch = document.getElementById("searchBookTitle").value;
    const moveBook = document.querySelectorAll(".move");

    for(move of moveBook){
        if(inputSearch !== move.innerText){
            console.log(move.innerText)
            move.parentElement.remove();
        }
    }
}
   