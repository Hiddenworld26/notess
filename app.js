const main = document.querySelector('#main');
const savenotes = () =>
{
    const note = document.querySelectorAll('.notes textarea');
    const  data=[];
    
    note.forEach(
        (notes) => {
             data.push(notes.value)
        }
    )
    console.log(data);
    if(data.length===0)
    {
        localStorage.removeItem('note')
    }
    else{
        localStorage.setItem("note",JSON.stringify(data));
    }
}

const addnote = (text="") =>
{
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML=`
    <div class="notes">
        <div class="toolbar">
            <i class="save fa-solid fa-floppy-disk"></i>
            <i class="trash fa-solid fa-trash"></i>
        </div>
       <textarea>${text}</textarea>
    </div>
    `;
  
    note.querySelector(".trash").addEventListener(
        "click",
        function()
        {
            note.remove();
            savenotes();
        }
    )
    note.querySelector(".save").addEventListener(
        "click",
        function()
        {
            savenotes();
        }
    )
    note.querySelector('textarea').addEventListener(
        "focusout",
        function () {
            savenotes();
        }
    )
    
    main.appendChild(note);
    savenotes();
}
(
  function() 
  {
    const lsnotes = JSON.parse(localStorage.getItem("note"));
    if(lsnotes===null){
     addnote();
    }
    else{
        lsnotes.forEach(
            (lsnotes)=>
            {
                addnote(lsnotes);
            }
        )
    }
  }
  
  
)()

document.getElementById('bt').addEventListener('click',addnote);
