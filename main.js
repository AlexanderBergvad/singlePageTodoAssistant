//Movie Stuff

const myAddMovieList = document.querySelector(".searchedMovie");
const myMovieList = document.querySelector(".myMovieList");
const searchbtn = document.querySelector(".mySearchBtn");
const searchTxt = document.querySelector(".SearchMovie");
const searchfield = document.querySelector(".searchmovierow");
const searchmoviebtn = document.querySelector(".searhForMovie");
const historybtn = document.querySelector(".movieHistory");
const historyModal = document.querySelector(".myHistorybackground");
const HistoryList = document.querySelector(".myHistoryList");
const myModal = document.querySelector(".modal-content");
const Modal = document.querySelector(".modal");
const Grade = document.querySelector(".mygrademodal")

let movieTitleArray = [];
let movieHistoryArray = [];
let movieCard = "";
let movieRating = "";
let movieCardid = "";

Modal.addEventListener("click", closeModal)
myAddMovieList.addEventListener("click", addMovieToList)
searchmoviebtn.addEventListener("click", viewSearch);
searchbtn.addEventListener("click", Searchclick); 
historybtn.addEventListener("click", viewHistory);
HistoryList.addEventListener("click", watchAgain);
HistoryList.addEventListener("click", openModal); 
myMovieList.addEventListener("click", openModal); 
myMovieList.addEventListener("click", removeMovie);
historyModal.addEventListener("click", closeHistory);
Grade.addEventListener("click", setGrade);



//remove from history to watchlist 
function watchAgain (event) {
  let target = event.target;
  if(target.classList.contains("watchAgainBtn"))
  {
    let removeTarget = target.parentElement.parentElement;
    let targetTitle = removeTarget.querySelector(".MyCardButton")
    
    let title = target.parentElement.parentElement.querySelector(".MyCardButton");
    let Genre = target.parentElement.parentElement.querySelector(".Genre");
    let Plot = target.parentElement.parentElement.querySelector(".Plot");
    let Writer = target.parentElement.parentElement.querySelector(".Writer");
    let Photo = target.parentElement.parentElement.querySelector(".SavedMovieImage");
    let Actors = target.parentElement.parentElement.querySelector(".Actors");
    let Runtime = target.parentElement.parentElement.querySelector(".Runtime");
    let Released = target.parentElement.parentElement.querySelector(".Released");
    let ID = target.parentElement.parentElement.querySelector(".id");
    
    for( var i = 0; i < movieHistoryArray.length; i++){ 
      
      if ( movieHistoryArray[i] === targetTitle.innerText) { 
        movieTitleArray.push(movieHistoryArray[i]);
        movieHistoryArray.splice(i, 1); 
      }
    }
    movieCard = `<div class="myMovieCard col-lg-3 col-md-4 col-sm-12 justify-content-center">
                          <div class="row justify-content-center SavedMovieImage" style="padding: 10px;">
                            ${Photo.innerHTML}
                          </div>
                          <div class="row justify-content-center">
                            <div class="col">
                              <button class="MyCardButton">
                                ${title.innerText}
                              </button>
                            </div>
                          </div>
                          <div class="row justify-content-center Genre">
                          ${Genre.innerText}
                          </div>
                          <div class="row justify-content-center Runtime">
                          ${Runtime.innerText}
                          </div>
                          <div class="row justify-content-end" style="padding-right: 15px;">
                            <div class="col-2 buttondiv">
                              <button class="myWRButton MyRemove"></button>
                            </div>
                            <div class="col-2 buttondiv">
                              <button class="myWRButton MyWatched"></button>
                            </div>
                          </div>
                          <p hidden class="Writer">${Writer.innerText}</p>
                          <p hidden class="Plot">${Plot.innerText}</p>
                          <p hidden class="Actors">${Actors.innerText}</p>
                          <p hidden class="Released">${Released.innerText}</p>
                          <p hidden class="id">${ID.innerText}</p>
                          
                    </div>`;

      myMovieList.innerHTML += movieCard;
      removeTarget.remove();
      movieCard ="";
  }
}

// veiw history
function viewHistory () {
    historyModal.style.display = "block";
}
function closeHistory (event) {
  let target = event.target;
  if(target.classList.contains("myHistorybackground"))
  {
    historyModal.style.display = "none";
  }
}

//view search div
function viewSearch(){
  searchfield.toggleAttribute("hidden");
  if(searchmoviebtn.innerText === "Add movie")
  {
    searchmoviebtn.innerText = "Hide";
  }
  else
  {
    searchmoviebtn.innerText = "Add movie";
  }
  myAddMovieList.innerHTML = "";
  searchTxt.value = "";
}

// search for movie, api 
async function Searchclick() {

  async function getMovie() {
    let edited = searchTxt.value.trim().replaceAll(" ", "+");
    let SearchString = "https://www.omdbapi.com/?apikey=a160d71f&t=" + edited;
    let MovieResult = await axios.get(SearchString);  
    return new Promise((resolve) => 
      resolve(MovieResult.data)
    );
  }
  
  let MovieData = await getMovie();

  if(MovieData.Title && movieHistoryArray.find(title => title === MovieData.Title) === undefined && movieTitleArray.find(title => title === MovieData.Title) === undefined)
  {
    let MovieToAdd ="";
    MovieToAdd += `<div class="row justify-content-center">
                      <div class="col-md-12 movieImageDiv" style="align-items: center;">
                        <img src="${MovieData.Poster}" class="movieImage">
                      </div>
                        <div class="row justify-content-center">
                          <div class="col titleText">
                            ${MovieData.Title}
                          </div>
                        </div>
                        <div class="row justify-content-center" >
                          <div class="col genreText">
                            ${MovieData.Genre}
                            <button class="myButton myAddMovieBtn"></button>
                            <p hidden class="Plot">${MovieData.Plot}</p>
                            <p hidden class="Actors">${MovieData.Actors}</p>
                            <p hidden class="Runtime">${MovieData.Runtime}</p>
                            <p hidden class="Writer">${MovieData.Writer}</p>
                            <p hidden class="Released">${MovieData.Released}</p>
                            <p hidden class="id">${MovieData.imdbID}</p>
                          </div>
                        </div>
                      </div>
                    </div>`;


      myAddMovieList.innerHTML = MovieToAdd;

  }
  else if(movieHistoryArray.find(title => title === MovieData.Title) || movieTitleArray.find(title => title === MovieData.Title)) {
    let movieInList = "";
    movieInList = ` <div class="row justify-content-center">
    <div class="col titleText">
    Movie is allready in your watch list or in your history!
    </div>
  </div>`;
    myAddMovieList.innerHTML = movieInList;
  }
  else{
    let moviedosentEx = "";
    moviedosentEx = ` <div class="row justify-content-center">
    <div class="col titleText">
     movie dosent excist!
    </div>
  </div>`;
    myAddMovieList.innerHTML = moviedosentEx;
  }
}

// add movie to list
function addMovieToList(event){
  const title = myAddMovieList.querySelector(".titleText");
  const Genre = myAddMovieList.querySelector(".genreText");
  const Plot = myAddMovieList.querySelector(".Plot");
  const Writer = myAddMovieList.querySelector(".Writer");
  const Photo = myAddMovieList.querySelector(".movieImage");
  const Actors = myAddMovieList.querySelector(".Actors");
  const Runtime = myAddMovieList.querySelector(".Runtime");
  const Released = myAddMovieList.querySelector(".Released");
  const ID = myAddMovieList.querySelector(".id")

  let target = event.target;
  if(target.classList.contains("myAddMovieBtn")){
      movieCard +=  `<div class="myMovieCard col-lg-3 col-md-4 col-sm-12 justify-content-center">
                        <div class="row justify-content-center SavedMovieImage" style="padding: 10px;">
                          ${Photo.outerHTML}
                        </div>
                        <div class="row justify-content-center">
                          <div class="col">
                            <button class="MyCardButton">
                              ${title.innerText}
                            </button>
                          </div>
                        </div>
                        <div class="row justify-content-center Genre">
                        ${Genre.innerText}
                        </div>
                        <div class="row justify-content-center Runtime">
                        ${Runtime.innerText}
                        </div>
                        <div class="row justify-content-end" style="padding-right: 15px;">
                          <div class="col-2 buttondiv">
                            <button class="myWRButton MyRemove"></button>
                          </div>
                          <div class="col-2 buttondiv">
                            <button class="myWRButton MyWatched"></button>
                          </div>
                        </div>
                        <p hidden class="Writer">${Writer.innerText}</p>
                        <p hidden class="Plot">${Plot.innerText}</p>
                        <p hidden class="Actors">${Actors.innerText}</p>
                        <p hidden class="Released">${Released.innerText}</p>
                        <p hidden class="id">${ID.innerText}</p>
                        
                  </div>`
                     
               myMovieList.innerHTML += movieCard;
                movieTitleArray.push(title.innerText);

  }
  searchTxt.value = "";
  myAddMovieList.innerHTML = "";
  movieCard = "";
}

//get movie modal
function openModal(event){
  let Title = "";
  let Genre = "";
  let Plot = "";
  let Writer = "";
  let Photo = "";
  let Actors = "";
  let Runtime = ""; 
  let Released = "";
  let ID = "";
  
  let btntarget = event.target;
  if(btntarget.classList.contains("MyCardButton") || btntarget.classList.contains("movieImage"))
  {
    if (btntarget.classList.contains("MyCardButton"))
    { 
      Title = btntarget.parentElement.parentElement.parentElement.querySelector(".MyCardButton");
      Genre = btntarget.parentElement.parentElement.parentElement.querySelector(".Genre");
      Plot = btntarget.parentElement.parentElement.parentElement.querySelector(".Plot");
      Writer = btntarget.parentElement.parentElement.parentElement.querySelector(".Writer");
      Photo = btntarget.parentElement.parentElement.parentElement.querySelector(".SavedMovieImage");
      Actors = btntarget.parentElement.parentElement.parentElement.querySelector(".Actors");
      Runtime = btntarget.parentElement.parentElement.parentElement.querySelector(".Runtime");
      Released = btntarget.parentElement.parentElement.parentElement.querySelector(".Released");
      ID = btntarget.parentElement.parentElement.parentElement.querySelector(".id");
    }
    else if(btntarget.classList.contains("movieImage"))
    {
  
      Title = btntarget.parentElement.parentElement.querySelector(".MyCardButton");
      Genre = btntarget.parentElement.parentElement.querySelector(".Genre");
      Plot = btntarget.parentElement.parentElement.querySelector(".Plot");
      Writer = btntarget.parentElement.parentElement.querySelector(".Writer");
      Photo = btntarget.parentElement.parentElement.querySelector(".SavedMovieImage");
      Actors = btntarget.parentElement.parentElement.querySelector(".Actors");
      Runtime = btntarget.parentElement.parentElement.querySelector(".Runtime");
      Released = btntarget.parentElement.parentElement.querySelector(".Released");
      ID = btntarget.parentElement.parentElement.querySelector(".id");
    }
    let modalcontent = "";
       modalcontent =   `
       <div class="modal-body">
           <div class="row justify-content-end">
               <span class="closeModal"></span>
           </div>
           <div class="row">
               <div class="col-sm-12 col-md-3 col-lg-3 justify-content-center myModalPhoto">
               ${Photo.outerHTML}
               </div>
               <div class="col-lg-6 col-md-6 col-sm-12">
                   <div class="row">
                       <div class="col-lg-12 justify-content-center" style="margin-right: 15px;">
                           <p class="TitleP modalTextHeading" style="font-weight: bolder; font-size: 30px;">${Title.innerText}</p>
                           <hr/>
                       </div>
                   </div>
                   <hr/>
                   <div class="row">
                       <div class="col-lg-6 col-md-12 col-sm-12" style="margin-right: 15px;">
                           <p class="modalTextHeading" style="font-weight: bold;">Duration:</p>
                       </div>
                       <div class="col-lg-4 col-md-12 col-sm-12">
                          <p class="movieDuration modalText">${Runtime.innerText}</p>
                       </div>
                   </div>
                   <hr/>
                   <div class="row">
                       <div class="col-lg-6 col-md-12 col-sm-12" style="margin-right: 15px;">
                           <p class="modalTextHeading" style="font-weight: bold;">Release date:</p>
                       </div>
                       <div class="col-lg-4 col-md-12 col-sm-12">
                           <p class="Release modalText">${Released.innerText}</p>
                       </div>
                   </div>
                   <div class="row">
                       <div class="col-lg-6 col-md-12 col-sm-12" style="margin-right: 15px;">
                           <p class="modalTextHeading" style="font-weight: bold;">Genre:</p>
                       </div>
                       <div class="col-lg-4 col-md-12 col-sm-12">
                           <p class="Release modalText">${Genre.innerText}</p>
                       </div>
                   </div>
                   <hr style="color: rgba(56, 45, 22, 1);" />
                   <div class="row">
                       <div class="col-lg-6 col-md-12 col-sm-12" style="margin-right: 15px;">
                           <p class="modalTextHeading" style="font-weight: bold;">Lead actors:</p>
                       </div>
                       <div class="col-lg-4 col-md-12 col-sm-12">
                           <p class="actorsP modalText">${Actors.innerText}</p>
                       </div>
                   </div>
                   <hr/>
                   <div class="row">
                       <div class="col-lg-6 col-md-12 col-sm-12" style="margin-right: 15px;">
                           <p class="modalTextHeading" style="font-weight: bold;">Written by:</p>
  
                       </div>
                       <div class="col-lg-4 col-md-12 col-sm-12">
                           <p class="WrittenBy modalText">${Writer.innerText}</p>
                           <p hidden class="id">${ID.innerText}</p>
                       </div>
                   </div>
               </div>
           </div>
           <div class="row">
             <hr style="color: rgba(56, 45, 22, 1); border: solid 2px rgba(56, 45, 22, 1);" />
               <div class="col-12 justify-content-center">
                   <hr style="color: rgba(56, 45, 22, 1);" />
                   <p class="modalTextHeading" style="font-weight: bold;">Plot:</p>
                   <p class="plotP modalText">
                   ${Plot.innerText}
                   </p>
               </div>
           </div>`
       myModal.innerHTML = modalcontent;
      getModal();
  }
}

//open modal
function getModal(){
  Modal.style.display = "block";
}
//close modal
function closeModal(event){
  let target = event.target;
  if(target.classList.contains("closeModal") || target.classList.contains("modal"))
  {
    Modal.style.display = "none";
    myModal.innerHTML = "";
  }
}

function OpenGradeModal() {
  Grade.style.display = "flex";
}
function setGrade (event) {
   let target = event.target;
   const movieTograde = HistoryList.querySelector("#" + movieCardid);
   const graderow = movieTograde.querySelector(".graderow");
   console.log(graderow);
   console.log(target);
   console.log(movieTograde);

   if(target.classList.contains("star1"))
   {
     graderow.innerHTML = 
     `<div class="col-2">
     <span class="gradestar">★</span>
   </div>`
   }
   if(target.classList.contains("star2"))
   {
    for(let i = 0; i < 2; i++)
    {
      graderow.innerHTML += 
      `<div class="col-2">
        <span class="gradestar">★</span>
      </div>`
    }
   }
   if(target.classList.contains("star3"))
   {
    for(let i = 0; i < 3; i++)
    {
      graderow.innerHTML += 
      `<div class="col-2">
        <span class="gradestar">★</span>
      </div>`
    }
   }
   if(target.classList.contains("star4"))
   {
    for(let i = 0; i < 4; i++)
    {
      graderow.innerHTML += 
      `<div class="col-2">
        <span class="gradestar">★</span>
      </div>`
    }
   }
   if(target.classList.contains("star5"))
   {
    for(let i = 0; i < 5; i++)
    {
      graderow.innerHTML += 
      `<div class="col-2">
        <span class="gradestar">★</span>
      </div>`
    }
   }
   let inputbtn = Grade.querySelector(".star1");
   inputbtn.checked = false;
   let inputbtn2 = Grade.querySelector(".star2");
   inputbtn2.checked = false;
   let inputbtn3 = Grade.querySelector(".star3");
   inputbtn3.checked = false;
   let inputbtn4 = Grade.querySelector(".star4");
   inputbtn4.checked = false;
   let inputbtn5 = Grade.querySelector(".star5");
   inputbtn5.checked = false;
   Grade.style.display = "none";
}
//remove movie from list to history
function removeMovie(event) {
  let target = event.target;
  let removeTarget = target.parentElement.parentElement.parentElement;
  let targetTitle = removeTarget.querySelector(".MyCardButton")
  
  if(target.classList.contains("MyRemove"))
  {
    for( var i = 0; i < movieTitleArray.length; i++){ 
    
      if ( movieTitleArray[i] === targetTitle.innerText) { 
        movieTitleArray.splice(i, 1); 
      }
    }
    removeTarget.remove();
  }
  if(target.classList.contains("MyWatched"))
  {

      let Title = target.parentElement.parentElement.parentElement.querySelector(".MyCardButton");
      let Genre = target.parentElement.parentElement.parentElement.querySelector(".Genre");
      let Plot = target.parentElement.parentElement.parentElement.querySelector(".Plot");
      let Writer = target.parentElement.parentElement.parentElement.querySelector(".Writer");
      let Photo = target.parentElement.parentElement.parentElement.querySelector(".SavedMovieImage");
      let Actors = target.parentElement.parentElement.parentElement.querySelector(".Actors");
      let Runtime = target.parentElement.parentElement.parentElement.querySelector(".Runtime");
      let Released = target.parentElement.parentElement.parentElement.querySelector(".Released");
      let ID = target.parentElement.parentElement.parentElement.querySelector(".id");
    

              movieCard =`<div id="${ID.innerText}"class="myMovieCard col-lg-3 col-md-4 col-sm-12 justify-content-center" >
              <div class="row justify-content-center SavedMovieImage" style="padding: 10px;">
                ${Photo.innerHTML}
              </div>
              <div class="row justify-content-center">
                <div class="col">
                  <button class="MyCardButton">
                    ${Title.innerText}
                  </button>
                </div>
              </div>
              <div class="row justify-content-center Genre">
              ${Genre.innerText}
              </div>
              <div class="row justify-content-center Runtime">
              ${Runtime.innerText}
              </div>
              <div class="grade">
                <div class="row justify-content-center graderow">
                  
                </div>
              </div>
              <div class="row justify-content-end">
                  <button class=" myButton watchAgainBtn">Watch again</button>
              </div>
              <p hidden class="Writer">${Writer.innerText}</p>
              <p hidden class="Plot">${Plot.innerText}</p>
              <p hidden class="Actors">${Actors.innerText}</p>
              <p hidden class="Released">${Released.innerText}</p>
              <p hidden class="id">${ID.innerText}</p>
              
          </div>`
  
    HistoryList.innerHTML += movieCard;
    movieCard = "";
    for( var i = 0; i < movieTitleArray.length; i++){ 
    
      if ( movieTitleArray[i] === targetTitle.innerText) { 
        movieHistoryArray.push(movieTitleArray[i]);
        movieTitleArray.splice(i, 1); 
      }
    }
    movieCardid = ID.innerText;
    OpenGradeModal();
    removeTarget.remove();
  }
}



































//Todo Stuff

// SELECTORS
//nav buttons
const Navbuttons = document.querySelector(".sidenav");
//myAddPostit
const myAddpostit = document.querySelector(".myAddPostit");
//my Todos
const myPostit = document.querySelector(".TodoList");
// Add btn
const addBtn = document.querySelector(".myAddbtn");
//inputfield
const input = document.querySelector(".myTextarea");
//Datetime
const dateTime = document.querySelector(".myDatetime");
//TodoList
const todoPosts = document.querySelector(".TodoList");
// important button
const flagCheckbtn = document.querySelector(".flagged");
//allcategoryCheckboxes
const allCategories = document.querySelectorAll(".category");

//EVENT LISTNER
addBtn.addEventListener("click", AddTodo);
myAddpostit.addEventListener("click", DeleteEditAdd);
myPostit.addEventListener("click", DeleteEditAdd);
Navbuttons.addEventListener("click", screenShowing);

//Functions
function AddTodo(event) {
  if (
    (input.value === "" && input.value.trim() === "") ||
    dateTime.value === ""
  ) {
    alert("No text entered for the To Do or date is empty");
  } else {

    const postIt = document.createElement("div");
    postIt.classList.add("col-sm-10");
    postIt.classList.add("col-md-5");
    postIt.classList.add("col-lg-3");

    const content = document.createElement("div");
    content.classList.add("myPostit");
    postIt.appendChild(content);
    //row 1
    const row = document.createElement("div");
    row.classList.add("row");
    row.setAttribute("style", "margin: 10px;");
    content.appendChild(row);

    const col1 = document.createElement("div");
    col1.classList.add("col-8");
    col1.innerText = dateTime.value;
    row.appendChild(col1);

    const col2 = document.createElement("div");
    col2.classList.add("col-3");
    row.appendChild(col2);

    if (flagCheckbtn.checked) {
      const flagged = document.createElement("button");
      flagged.classList.add("myButton");
      flagged.classList.add("flagged");
      flagged.setAttribute("disabled", 0);
      col2.appendChild(flagged);
    }

    //row 2
    const row2 = document.createElement("div");
    row2.classList.add("row");
    row2.setAttribute("style", "margin: 10px;");
    content.appendChild(row2);

    const col4 = document.createElement("div");
    col4.classList.add("col-8");
    col4.classList.add("postitText");
    row2.appendChild(col4);

    const p = document.createElement("p");
    p.classList.add("postitTextP");
    p.classList.add("example");
    p.innerText = input.value;
    col4.appendChild(p);

    const editArea = document.createElement("textarea");
    editArea.classList.add("myEditTextarea");
    editArea.hidden = true;
    col4.appendChild(editArea);

    const col5 = document.createElement("div");
    col5.classList.add("col-3");
    row2.appendChild(col5);

    const category = document.createElement("button");
    category.classList.add("myButton");
    category.disabled = true;
    if (allCategories[0].checked) {
      category.classList.add("social");
    }
    if (allCategories[1].checked) {
      category.classList.add("training");
    }
    if (allCategories[2].checked) {
      category.classList.add("work");
    }
    col5.appendChild(category);

    //row3
    const row3 = document.createElement("div");
    row3.classList.add("row");
    row3.setAttribute("style", "marign: 10px;");
    content.appendChild(row3);

    const col6 = document.createElement("div");
    col6.classList.add("col-2");
    col6.setAttribute("style", "margin-left: 20px;");
    row3.appendChild(col6);

    const col7 = document.createElement("div");
    col7.classList.add("col-2");
    row3.appendChild(col7);

    //create Delete btn
    const DeleteBtn = document.createElement("button");
    DeleteBtn.classList.add("myButton");
    DeleteBtn.classList.add("myDeleteBtn");
    col6.appendChild(DeleteBtn);

    // create edit Btn
    const EditBtn = document.createElement("button");
    EditBtn.classList.add("myButton");
    EditBtn.classList.add("myEditBtn");
    col7.appendChild(EditBtn);

    //create save Btn
    const saveBtn = document.createElement("button");
    saveBtn.classList.add("myButton");
    saveBtn.classList.add("mySavebtn")
    saveBtn.hidden = true;
    col6.appendChild(saveBtn);

    if (flagCheckbtn.checked) {
      todoPosts.insertBefore(postIt, todoPosts.children[1]);
    } else {
      todoPosts.appendChild(postIt);
    }

    dateTime.value = "";
    input.value = "";
    flagCheckbtn.checked = false;
  }
}

function DeleteEditAdd(event) {
  const clickedTarget = event.target;
  const checkbox1 =
    myAddpostit.children[2].children[0].children[0].children[0].children[0];
  const checkbox2 =
    myAddpostit.children[2].children[0].children[1].children[0].children[0];
  const checkbox3 =
    myAddpostit.children[2].children[1].children[0].children[0].children[0];

  if (clickedTarget.classList.contains("category")) {
    if (clickedTarget.id === "1" && clickedTarget.checked == true) {
      checkbox2.disabled = true;
      checkbox3.disabled = true;
    } else if (clickedTarget.id === "2" && clickedTarget.checked == true) {
      checkbox1.disabled = true;
      checkbox3.disabled = true;
    } else if (clickedTarget.id === "3" && clickedTarget.checked == true) {
      checkbox1.disabled = true;
      checkbox2.disabled = true;
    } else {
      checkbox1.disabled = false;
      checkbox2.disabled = false;
      checkbox3.disabled = false;
    }
  }
  //Edit and delete
  if (clickedTarget.classList.contains("myDeleteBtn")) {
    const removeTodo = clickedTarget.parentElement.parentElement.parentElement.parentElement;
    removeTodo.remove();
  }
  //if clicked target is edit
  if (clickedTarget.classList.contains("myEditBtn")) {
    const removeTodo = clickedTarget.parentElement.parentElement.parentElement;
    const todoText = removeTodo.children[1].children[0].children[0];
    todoText.hidden = true;
    const textArea = removeTodo.children[1].children[0].children[1];
    textArea.value = todoText.innerText;
    textArea.hidden = false;
    const button1 = removeTodo.children[2].children[0].children[0];
    button1.hidden = true;
    const button2 = removeTodo.children[2].children[1].children[0];
    button2.hidden = true;
    const savebtn = removeTodo.children[2].children[0].children[1];
    savebtn.hidden = false;

  }
  if( clickedTarget.classList.contains("mySavebtn")) {
    
    const removeTodo = clickedTarget.parentElement.parentElement.parentElement;
    const todoText = removeTodo.children[1].children[0].children[0];
    const textArea = removeTodo.children[1].children[0].children[1];
    
    todoText.hidden = false;
    textArea.hidden = true;
    todoText.innerText = textArea.value;

    const button1 = removeTodo.children[2].children[0].children[0];
    button1.hidden = false;
    const button2 = removeTodo.children[2].children[1].children[0];
    button2.hidden = false;
    const savebtn = removeTodo.children[2].children[0].children[1];
    savebtn.hidden = true;
  }
}








































/* nav button stuff */
 /* side nav functions */ 
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";  
  const navOpenbtn = document.querySelector(".hamburgerbtn");
  navOpenbtn.hidden = true;
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  const navOpenbtn = document.querySelector(".hamburgerbtn");
  navOpenbtn.hidden = false;
}

function screenShowing(event){

  const clickedTarget = event.target;
  const containerTodo = document.querySelector(".containerTodo");
  const containerMovies = document.querySelector(".containerMovies");
  const containerFront = document.querySelector(".containerFront");
  if(clickedTarget.classList.contains("Todo"))
  {
    containerTodo.hidden = false;
    containerFront.hidden = true;
    containerMovies.hidden = true;
    closeNav();

  }
  else if(clickedTarget.classList.contains("Movies"))
  {
    containerTodo.hidden = true;
    containerFront.hidden = true;
    containerMovies.hidden = false;
    closeNav();
  }
  else if(clickedTarget.classList.contains("Series"))
  {
    containerTodo.hidden = true;
    containerFront.hidden = true;
    containerMovies.hidden = true;
    closeNav();
  }
  else if(clickedTarget.classList.contains("Home"))
  {
    containerTodo.hidden = true;
    containerFront.hidden = false;
    containerMovies.hidden = true;
    closeNav();
  }

} 