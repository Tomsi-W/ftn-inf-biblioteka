"use strict";

let knjige = JSON.parse(localStorage.getItem("knjige"));
if (!knjige || knjige.length === 0) {
    knjige = [
        { title: "Knjiga 1" },
        { title: "Knjiga 2" },
        { title: "Knjiga 3" }
    ];
    localStorage.setItem("knjige", JSON.stringify(knjige));
}
let kontener = document.getElementById("pregledkontener");

function prikaziKnjige() {
    kontener.innerHTML = "";

    knjige.forEach((knjiga, index) => {
        let red = document.createElement("tr");
        red.innerHTML = `
            <td>${index + 1}</td>
            <td>${knjiga.title}</td>
            <td><button onclick="obrisiKnjigu(${index})">Obriši</button></td>
        `;
        kontener.appendChild(red);
    });
}

function obrisiKnjigu(index) {
    knjige.splice(index, 1);
    localStorage.setItem("knjige", JSON.stringify(knjige));
    prikaziKnjige();
}

prikaziKnjige();

