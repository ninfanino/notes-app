// install sw-precache on the computer
// run the command 'sw-precache' on the project root to create the service-worker.js file

if ('serviceWorker' in navigator) {
    // register service worker
    navigator.serviceWorker.register('service-worker.js');
}

let count = Number(window.localStorage.getItem("count"));
if(!count) {
    window.localStorage.setItem("count", 0);
}

const createNote = (noteTitle, noteBody) => {
    document.getElementById("no-notes").classList.add("hidden");

    let li = document.createElement("li");
    let a = document.createElement("a");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let xBtn = document.createElement("button");

    xBtn.classList.add("delete");

    let xText = document.createTextNode("X");
    let h2Txt = document.createTextNode(noteTitle);
    let pTxt = document.createTextNode(noteBody);

    h2.appendChild(h2Txt);
    p.appendChild(pTxt);
    xBtn.appendChild(xText);

    a.appendChild(h2);
    a.appendChild(xBtn);
    a.appendChild(p);
    a.setAttribute("href", "#");

    li.appendChild(a);
    document.getElementById("notes").appendChild(li);
}

const removeItem = (e) => {
    if(e.target.classList.contains("delete")) {
        if (confirm("Are you sure you want to delete that note?")) {
            let li = e.target.parentElement.parentElement;
            let ul = document.getElementById("notes");

            ul.removeChild(li);
            count--;
            window.localStorage.setItem("count", count);

            window.localStorage.removeItem(e.target.previousElementSibling.innerText);
        }
    }

    if(count < 1) {
        document.getElementById("no-notes").className = "";
    }
};

const createNoteFromInput = (e) => {
    e.preventDefault();

    let noteTitle = document.getElementById("new-note-title-input").value;
    let noteBody = document.getElementById("new-note-body-input").value; 

    document.getElementById("new-note-title-input").value = "";
    document.getElementById("new-note-body-input").value = ""; 

    count++;
    window.localStorage.setItem("count", count);

    while(window.localStorage.getItem(noteTitle)) {
        noteTitle += " - 1";
    }
    window.localStorage.setItem(noteTitle, noteBody);

    createNote(noteTitle, noteBody);

}

for(let i = 0; i <= count; i++) {
    let noteTitle = window.localStorage.key(i);
    let noteBody = window.localStorage.getItem(noteTitle);

    if(noteTitle && noteTitle !== "count") {
        createNote(noteTitle, noteBody);
    }
    
}

document
    .getElementById("inputForm")
    .addEventListener("submit", createNoteFromInput, false);


document
    .getElementById("notes")
    .addEventListener("click", removeItem, false);
