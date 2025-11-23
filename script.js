let notes = JSON.parse(localStorage.getItem("smartNotes")) || [];

const container = document.getElementById("notesContainer");
const titleInput = document.getElementById("noteTitle");
const contentInput = document.getElementById("noteContent");
const search = document.getElementById("search");

// Add Note
document.getElementById("addBtn").addEventListener("click", () => {
  if(titleInput.value.trim()==="" || contentInput.value.trim()==="") return;

  notes.push({
    title: titleInput.value,
    content: contentInput.value,
    time: new Date().toLocaleString()
  });

  save();
  render();
  titleInput.value="";
  contentInput.value="";
});

// Open viewer
function openNote(index){
  const viewer = document.getElementById("noteViewer");
  document.getElementById("viewerTitle").innerText = notes[index].title;
  document.getElementById("viewerContent").innerHTML = notes[index].content.replace(/\n/g, "<br>");
  
  viewer.style.display = "flex";
}

// Close viewer
document.getElementById("closeViewer").addEventListener("click",()=>{
  document.getElementById("noteViewer").style.display="none";
});

// Delete
function deleteNote(index){
  notes.splice(index,1);
  save();
  render();
}

// Render UI
function render(filter=""){
  container.innerHTML="";
  notes.forEach((note,index)=>{

    if(note.title.toLowerCase().includes(filter.toLowerCase())){

      const card=document.createElement("div");
      card.className="note-card";

      card.innerHTML=`
        <div class="note-title">${note.title}</div>
        <div>${note.time}</div>
        <div class="note-actions">
          <button onclick="openNote(${index})">Open</button>
          <button style="background:red" onclick="deleteNote(${index})">Delete</button>
        </div>
      `;
      container.appendChild(card);
    }
  });
}

// Search live
search.addEventListener("input", e => {
  render(e.target.value.toLowerCase());
});

// Save notes
function save(){
  localStorage.setItem("smartNotes",JSON.stringify(notes));
}

render();

// Dark Mode
document.getElementById("themeToggle").addEventListener("click",()=>{
  document.body.classList.toggle("dark-mode");
});
