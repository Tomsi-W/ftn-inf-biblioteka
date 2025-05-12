"use strict";

class Knjiga {
  constructor(id, naziv, datumStampanja, putanjaDoSlike, opis, popularnost, iznajmljena = false) {
    this.id = id;
    this.naziv = naziv;
    this.datumStampanja = datumStampanja;
    this.putanjaDoSlike = putanjaDoSlike;
    this.opis = opis;
    this.popularnost = popularnost;
    this.iznajmljena = iznajmljena;
  }
}

const knjige = getBooks();

function getBooks() {
  const sacuvaneKnjige = localStorage.getItem("knjige");
  if (!sacuvaneKnjige) return [];
  const parsed = JSON.parse(sacuvaneKnjige);
  return parsed.map(k => new Knjiga(
    k.id, k.naziv, k.datumStampanja, k.putanjaDoSlike, k.opis, k.popularnost, k.iznajmljena || false
  ));
}

function setBooks() {
  localStorage.setItem("knjige", JSON.stringify(knjige));
}

function prikaziKnjige() {
  const iznajmljene = document.getElementById("iznajmljeneKnjige");
  iznajmljene.innerHTML = "";

  let br = 1;

  knjige.forEach((knjiga, index) => {
    if (knjiga.iznajmljena) {
      const red = document.createElement("tr");
      red.innerHTML = `
        <td>${br++}</td>
        <td>${knjiga.naziv}</td>
        <td><button onclick="vrati(${index})">Vrati</button></td>
      `;
      iznajmljene.appendChild(red);
    }
  });
}

function vrati(index) {
  knjige[index].iznajmljena = false;
  setBooks();
  prikaziKnjige();
}

document.addEventListener("DOMContentLoaded", prikaziKnjige);
