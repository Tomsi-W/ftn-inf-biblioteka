"use strict";

class Knjiga {
  constructor(id, naziv, datumStampanja, putanjaDoSlike, opis, popularnost) {
    this.id = id;
    this.naziv = naziv;
    this.datumStampanja = datumStampanja;
    this.putanjaDoSlike = putanjaDoSlike;
    this.opis = opis;
    this.popularnost = popularnost;
  }
}

const knjige = getBooks() || [];

function getBooks() {
  const sacuvaneKnjige = localStorage.getItem("knjige");
  if (sacuvaneKnjige) {
    const parsedKnjige = JSON.parse(sacuvaneKnjige);
    return parsedKnjige.map(
      (knjiga) =>
        new Knjiga(
          knjiga.id,
          knjiga.naziv,
          knjiga.datumStampanja,
          knjiga.putanjaDoSlike,
          knjiga.opis,
          knjiga.popularnost
        )
    );
  }
  return [];
}

function setBooks() {
  try {
    localStorage.setItem("knjige", JSON.stringify(knjige));
    return true;
  } catch (error) {
    console.error("Greska pri cuvanju knjiga:", error);
    return false;
  }
}

function initializeBooks() {
  // Ukoliko nema niceg na kljucu knjige, koristi inicijalne knjige
  if (!localStorage.getItem("knjige")) {
    const initialKnjige = [
      new Knjiga(
        1,
        "Alhemicar",
        "26.12.2013",
        "https://laguna.rs/_img/korice/2313/alhemicar-paulo_koeljo_v.jpg",
        "Priča koja pleni svojom jednostavnošću i inspiriše svojom mudrošću prati mladog andaluzijskog pastira Santjaga, koji iz rodne Španije odlazi u egipatsku pustinju kako bi našao skriveno blago zakopano ispod piramida.",
        3
      ),
      new Knjiga(
        2,
        "Zivotnjska farma",
        "17.7.1945",
        "https://upload.wikimedia.org/wikipedia/sr/thumb/c/c6/Zivotinjska_farma-dzordz_orvel_v.jpg/250px-Zivotinjska_farma-dzordz_orvel_v.jpg",
        " Životinjska farma iako prvenstveno satira o Ruskoj revoluciji, odnosi na svaku nasilnu revoluciju koju predvode nemarni ljudi gladni vlasti.",
        4
      ),
    ];
    localStorage.setItem("knjige", JSON.stringify(initialKnjige));
  }
}

function obradiFormu() {
  let btn = document.querySelector("#submitBtn");

  btn.addEventListener("click", function () {
    let form = document.querySelector("#dodajKnjigu");
    let formData = new FormData(form);

    let id = generateId(getBooks());
    let naziv = formData.get("naziv");
    let datumStampanja = formData.get("datumStampanja");
    let putanjaDoSlike = formData.get("slikaKnjige");
    let opis = formData.get("opisSlike");
    let popularnost = formData.get("ocenaKnjige");

    let novaKnjiga = new Knjiga(
      id,
      naziv,
      datumStampanja,
      putanjaDoSlike,
      opis,
      popularnost
    );
    knjige.push(novaKnjiga);
    setBooks();
    form.reset();
    alert("Uspesno ste dodali novu knjigu");
  });
}

function generateId(knjige) {
  let maxId = 0;
  for (let i = 0; i < knjige.length; i++) {
    if (knjige[i].id > maxId) {
      maxId = knjige[i].id;
    }
  }
  return maxId + 1;
}

// Inicijalizacija aplikacije
document.addEventListener("DOMContentLoaded", function () {
  initializeBooks();
  obradiFormu();
});
