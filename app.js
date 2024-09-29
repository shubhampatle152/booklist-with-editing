// Book class for setting the value 

class Book {
    constructor(title, Author, ISBN) {
        this.title = title;
        this.Author = Author;
        this.ISBN = ISBN;
    }
}






// UI class to hendel UI 
class UI {
    // Temprary Book store 
    static displaybook() {
        const storebook = store.getbook();
        storebook.forEach(book => {
            UI.addbookTolist(book)
        });
    };

    // add book method 
    static addbookTolist(book) {
        const list = document.getElementById('book-list')
        const row = document.createElement("tr")
        row.innerHTML = `
        <td id="title">${book.title}</td>
        <td id="author">${book.Author}</td>
        <td id="isbn">${book.ISBN}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        <td><i class="fas fa-edit"></i></td>
        `
        list.appendChild(row);
    }

    // For alert it's Showalert method 
    static Showalert(message, className) {
        const div = document.createElement("div")
        div.classList = `alert alert-${className}`;
        div.innerText = `${message}`;
        const container = document.querySelector('.container');
        const form = document.querySelector(".book-form");
        container.insertBefore(div, form)
        // Remove alert in 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 1700);
    }



    static deleteBook(el) {
        if (el.classList.contains("delete")) {
            UI.Showalert("Book Removed Successfuly !", 'success')
            el.parentElement.parentElement.remove();
        }
    }

    static editbook(ell) {
        if (ell.classList.contains("fa-edit")) {
            UI.Showalert("Editing Enabled Successfuly !", 'info')
            const titlevalue = ell.parentElement.parentElement.children[0].innerText;
            const authorvalue = ell.parentElement.parentElement.children[1].innerText;
            const isbnvalue = ell.parentElement.parentElement.children[2].innerText;

            
            const title = document.querySelector("#title").value = titlevalue;
            const Author = document.querySelector("#author").value = authorvalue;
            const ISBN = document.querySelector("#isbn").value = isbnvalue;

            ell.parentElement.parentElement.remove();


        }
    }



    static callerInputefielde() {
        const title = document.querySelector("#title").value = " ";
        const Author = document.querySelector("#author").value = " ";
        const ISBN = document.querySelector("#isbn").value = " ";
    }
}
// UI class to hendel UI  - END




// Event for Get books form submit book -START 
document.querySelector(".book-form").addEventListener("submit", (e) => {
    e.preventDefault()
    // Get value from input 

    const title = document.querySelector("#title").value;
    const Author = document.querySelector("#author").value;
    const ISBN = document.querySelector("#isbn").value;

    // validation check 
    if (title === "" || Author === "" || ISBN === "") {
        UI.Showalert("Fielde all Inpute!", 'danger')
    } else {
        const book = new Book(title, Author, ISBN)

        // Add book from User input 

        UI.addbookTolist(book)
        store.addbook(book)
        UI.callerInputefielde()

        UI.Showalert("Book Added Successfuly !", 'success')
    }
})
// Event for Get books form submit book - END




//Storeg class: Handel storage > localStorage 
class store {

    static getbook() {
        let books;
        if (localStorage.getItem('books') == null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }


    static addbook(book) {
        const books = store.getbook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }


    static removebook(ISBN) {
        const books = store.getbook()
        books.forEach((book, index) => {
            if (book.ISBN === ISBN) {
                books.splice(index, 1);
            }
            localStorage.setItem('books', JSON.stringify(books))
        });
    }


}






// Event for display books 
document.addEventListener("DOMContentLoaded", UI.displaybook)




// Event for remove
document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target);
    UI.editbook(e.target);



    store.removebook(e.target.parentElement.previousElementSibling.textContent);
    store.removebook(e.target.parentElement.parentElement.children[2].textContent);

})

