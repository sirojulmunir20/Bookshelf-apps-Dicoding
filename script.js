document.addEventListener("DOMContentLoaded", function(){
    const submitBook = document.getElementById("inputBook");
    submitBook.addEventListener("submit", function(event){
        event.preventDefault();
        addBook();
    });

    const searchBooks = document.getElementById("searchBook");
    searchBooks.addEventListener("submit", function(event){
        event.preventDefault();
        searchBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }

});

document.addEventListener("ondatasaved", () =>{
    console.log("data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () =>{
    refreshDataFromBooks();
});

function changeText(){
    const checkbox = document.getElementById("inputBookIsComplete");
    const textSubmit = document.getElementById("textSubmit");

    if(checkbox.checked == true){
        textSubmit.innerText = "sudah selesai dibaca";
    }else{
        textSubmit.innerText = "belum selesai dibaca";
    }
};