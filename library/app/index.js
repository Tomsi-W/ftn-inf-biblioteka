const books = [
    { id: "B1234", title: "Knjiga 1", date: "2022", url: "assets/images/book1.jpg", description: "Opis knjige 1", popularity: 4 },
    { id: "B5678", title: "Knjiga 2", date: "2021", url: "assets/images/book2.jpg", description: "Opis knjige 2", popularity: 5 },
    { id: "B9101", title: "Knjiga 3", date: "2020", url: "assets/images/book3.jpg", description: "Opis knjige 3", popularity: 3 },
    { id: "B1121", title: "Knjiga 4", date: "2019", url: "assets/images/book4.jpg", description: "Opis knjige 4", popularity: 2 },
    { id: "B3141", title: "Knjiga 5", date: "2018", url: "assets/images/book5.jpg", description: "Opis knjige 5", popularity: 5 }
];

const bookList = document.getElementById("");

for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const bookDiv = document.createElement("div");
    bookDiv.innerHTML = `
        <img src="${book.url}" alt="${book.title}">
        <h2>${book.title}</h2><br>
        <p>${book.description}</p><br>
        <small>Datum štampanja: ${book.date}</small><br>
        <p>Popularnost: ${"★".repeat(book.popularity)}</p>
    `;
    bookList.appendChild(bookDiv);
}