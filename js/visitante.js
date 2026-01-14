const addNoteSection = document.getElementById("add-note-section")
const noteForm = document.getElementById("add-note-form");

document.getElementById("add-note-button").addEventListener("click", () => {
    addNoteSection.style.display = "flex"
    noteForm.reset()
})

document.querySelectorAll("#cancel-note, #exit").forEach(fechar => {
    fechar.addEventListener("click", () => {
        addNoteSection.style.display = "none"
        noteForm.reset()
    })
})

const noteFix = document.getElementById("fix-note")
let estaFixado = false

noteFix.addEventListener("click", () => {
    if (!estaFixado) {
        noteFix.classList.replace("note-unfixed", "note-fixed")
        noteFix.textContent = "Fixado"
        estaFixado = true
    } else if (estaFixado) {
        noteFix.classList.replace("note-fixed", "note-unfixed")
        noteFix.textContent = "Fixar no topo"
        estaFixado = false
    }
})

function atualizarContadorTotal() {
    const Count = document.querySelector(".totalCounter")
    let contador = Number(Count.textContent)
    contador++
    Count.innerHTML = contador
}

function atualizarContadorFixados() {
    const Count = document.querySelector(".fixedCounter")
    let contador = Number(Count.textContent)
    contador++
    Count.innerHTML = contador
}

/*_____________________________________________________________________________________*/

const notesContainer = document.querySelector(".notes");
const fixContainer = document.querySelector(".fixed")
const searchInput = document.getElementById("search-notes")
const notesArray = []
let currentCategory = "ALL";
let currentSearch = "";



noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isFixed = !document.getElementById("fix-note").classList.contains("note-unfixed"); // false

    const dados = {
        title: noteForm["note-title"].value.trim(),
        category: document.getElementById("note-category").value,
        text: noteForm["note-text"].value.trim(),
        date: new Date().toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }),
        fix: isFixed
    };

    const noteStructure = `
    <h1 class="note-title">${dados.title}</h1>
    <p class="note-text">${dados.text}</p>
    <div class="note-footer">
        <p class="note-date">${dados.date}</p> 
        <div class="note-category">
            <p class="note-category-text">${dados.category}</p>
        </div>
    </div>`

    const noteFixedStructure = `
        <h1 class="note-title">${dados.title}</h1>
        <p class="note-text">${dados.text}</p>
        <div class="note-footer">
            <p class="note-date">${dados.date}</p>
            <div>
                <div class="fix-icon">
                    <img src="../img/fix-icon.png" alt="Fix-Icon">
                </div>
                <div class="note-category">
                    <p class="note-category-text">${dados.category}</p>
                </div>
            </div>
        </div>`

    notesArray.push(dados)

    const note = document.createElement("div")
    note.classList.add("note")

    if (isFixed) {
        atualizarContadorFixados()
        note.innerHTML = noteFixedStructure
        fixContainer.appendChild(note)
    } else {
        note.innerHTML = noteStructure
        notesContainer.appendChild(note)
    }
    atualizarContadorTotal()

    document.getElementById("without-note-section").style.display = "none"

    noteForm.reset()
    noteFix.classList.replace("note-fixed", "note-unfixed");
    noteFix.textContent = "Fixar no topo";
    estaFixado = false;
    applyFilters()
});

document.getElementById("save-note").addEventListener("click", () => { addNoteSection.style.display = "none" })

function applyFilters() {
  notesContainer.innerHTML = "";
  fixContainer.innerHTML = "";

  const filteredNotes = notesArray.filter(note => {
    const matchTitle =
      note.title.toLowerCase().includes(currentSearch);

    const matchCategory =
      currentCategory === "ALL" || note.category === currentCategory;

    return matchTitle && matchCategory;
  });

  filteredNotes.forEach(n => {
    const note = document.createElement("div");
    note.classList.add("note");

    if (n.fix) {
      note.innerHTML = `
        <h1 class="note-title">${n.title}</h1>
        <p class="note-text">${n.text}</p>
        <div class="note-footer">
          <p class="note-date">${n.date}</p>
          <div>
            <div class="fix-icon">
              <img src="../img/fix-icon.png">
            </div>
            <div class="note-category">
              <p>${n.category}</p>
            </div>
          </div>
        </div>
      `;
      fixContainer.appendChild(note);
    } else {
      note.innerHTML = `
        <h1 class="note-title">${n.title}</h1>
        <p class="note-text">${n.text}</p>
        <div class="note-footer">
          <p class="note-date">${n.date}</p>
          <div class="note-category">
            <p>${n.category}</p>
          </div>
        </div>
      `;
      notesContainer.appendChild(note);
    }
  });
}

document.getElementById("All-categorys").addEventListener("click", () => {
    currentCategory = "ALL"
    applyFilters()
})
document.getElementById("work-category").addEventListener("click", () => {
    currentCategory = "Trabalho"
    applyFilters()
})
document.getElementById("personal-category").addEventListener("click", () => {
    currentCategory = "Pessoal"
    applyFilters()
})
document.getElementById("idea-category").addEventListener("click", () => {
    currentCategory = "Ideias"
    applyFilters()
})
document.getElementById("studies-category").addEventListener("click", () => {
    currentCategory = "Estudos"
    applyFilters()
})
searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value.toLowerCase()
    applyFilters()
})