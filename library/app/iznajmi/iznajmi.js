"use strict";

class Knjiga {
  constructor(
    id,
    naziv,
    datumStampanja,
    putanjaDoSlike,
    opis,
    popularnost,
    iznajmljena = false
  ) {
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
  return parsed.map(
    (k) =>
      new Knjiga(
        k.id,
        k.naziv,
        k.datumStampanja,
        k.putanjaDoSlike,
        k.opis,
        k.popularnost,
        k.iznajmljena || false
      )
  );
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
  prikaziDostupneKnjige();
}

document.addEventListener("DOMContentLoaded", function () {
  getBooks(); // Osiguraj da se podaci učitaju iz localStorage
  prikaziDostupneKnjige(); // Pozivaj prikaz tek nakon učitavanja podataka
  prikaziKnjige(); // I prikaz iznajmljenih knjiga
});

function prikaziDostupneKnjige() {
  const table = document.querySelector("#dostupneKnjige");
  table.innerHTML = "";

  knjige.forEach((knjiga, index) => {
    if (knjiga.iznajmljena) return;

    const tr = document.createElement("tr");
    const br = document.createElement("td");
    const naziv = document.createElement("td");
    const akcija = document.createElement("td");
    const btn = document.createElement("button");

    br.textContent = knjiga.id;
    naziv.textContent = knjiga.naziv;
    btn.textContent = "Iznajmi";

    btn.onclick = function () {
      knjige[index].iznajmljena = true;
      setBooks(); // ovo koristi funkciju koja setuje `knjige`
      prikaziDostupneKnjige(); // ovo osvezi
      prikaziKnjige(); // i prikazi iznajmljene
    };

    akcija.appendChild(btn);
    tr.appendChild(br);
    tr.appendChild(naziv);
    tr.appendChild(akcija);
    table.appendChild(tr);
  });
}
