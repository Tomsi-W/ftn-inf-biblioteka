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
      (k) =>
        new Knjiga(
          k.id,
          k.naziv,
          k.datumStampanja,
          k.putanjaDoSlike,
          k.opis,
          k.popularnost
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
    console.error("Greška pri čuvanju knjiga:", error);
    return false;
  }
}

function initializeBooks() {
  if (!localStorage.getItem("knjige")) {
    const initialKnjige = [
      new Knjiga(
        1,
        "Alhemičar",
        "2013-12-26",
        "https://laguna.rs/_img/korice/2313/alhemicar-paulo_koeljo_v.jpg",
        "Opis...",
        3
      ),
      new Knjiga(
        2,
        "Životinjska farma",
        "1945-07-17",
        "https://upload.wikimedia.org/wikipedia/sr/...",
        "Opis...",
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

    let id = generateId(knjige);
    let naziv = formData.get("naziv");
    let datumStampanja = formData.get("datumStampanja");
    let putanjaDoSlike = formData.get("slikaKnjige");
    let opis = formData.get("opisKnjige");
    let popularnost = parseInt(formData.get("ocenaKnjige")) || 0;

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
    prikaziKnjige();
    form.reset();
    alert("Uspešno ste dodali novu knjigu.");
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

function prikaziKnjige() {
  const kontener = document.getElementById("pregledkontener");
  if (!kontener) return;

  kontener.innerHTML = "";

  knjige.forEach((knjiga, index) => {
    let red = document.createElement("tr");
    red.innerHTML = `
      <td>${index + 1}</td>
      <td><span class="naziv-knjige" data-index="${index}">${knjiga.naziv}</span></td>
      <td><button onclick="obrisiKnjigu(${index})">Obriši</button></td>
    `;
    kontener.appendChild(red);
  });

  const naslovi = document.querySelectorAll(".naziv-knjige");
  naslovi.forEach(naslov => {
    naslov.addEventListener("click", function () {
      const index = this.dataset.index;
      prikaziDetalje(knjige[index]);
    });
  });
}

function obrisiKnjigu(index) {
  knjige.splice(index, 1);
  setBooks();
  prikaziKnjige();
  document.getElementById("detaljiKnjige").innerHTML = ""; 
}

function prikaziDetalje(knjiga) {
  const detaljiDiv = document.getElementById("detaljiKnjige");
  detaljiDiv.innerHTML = `
    <h2>${knjiga.naziv}</h2>
    <p><strong>Datum štampanja:</strong> ${knjiga.datumStampanja}</p>
    <p><strong>Opis:</strong> ${knjiga.opis}</p>
    <p><strong>Popularnost:</strong> ${"⭐".repeat(knjiga.popularnost)}</p>
    <img src="${knjiga.putanjaDoSlike}" alt="${knjiga.naziv}" style="max-width:200px">
  `;
}

document.addEventListener("DOMContentLoaded", function () {
  initializeBooks();
  prikaziKnjige();
  obradiFormu();
});
