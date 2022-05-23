import React from "react"
import BookCard from "./BookCard"
import Favorites from "./Favorites"
import Navbar from "./Navbar"
import { Icon } from "@iconify/react"

export default function App (){
////////////// STATE //////////////////

    //Set state for currentUrl to fetch API
    const [currentUrl , setCurrentUrl] = React.useState(`https://gnikdroy.pythonanywhere.com/api/book/`)
    //Set satate for navigation options next and prev page (from data.next and data.previous)
    const [bookNavigation , setBookNavigation] = React.useState([])
    //Set state for the books data 
    const [booksData , setBooksData] = React.useState([])
    // Set state for the Loading msg 
    const [isDataLoading , setIsDataLoading] = React.useState(true)
    // Set state for fetchError
    const [fetchError , setFetchError] = React.useState(null)
    // Set state for search Input and filter 
    const [optionsInput , setOptionsInput] = React.useState({search: "" , language: ""})
    // Set state for favorites and LOAD ITEMS FROM LOCAL STORAGE
    const [favorites , setFavorites] = React.useState(JSON.parse(localStorage.getItem("Favorites")) )
    // set state for curren tage number 
    const [pageNumber , setPageNumber] = React.useState(1)
    //set state for open FavoritesModal 
    const [isModalOpen , setIsModalOpen] = React.useState(false)
  
// console.log(optionsInput);
// console.log(currentUrl)
// console.log(currentUrl);
// console.log(bookNavigation);



/////////////////API CALL /////////////


// useEffect to fetch API and rerenders if currentUrl will change .
React.useEffect(()=>{
   
    const fetchBooks = async () =>{
      try{
        const response = await fetch(currentUrl) ;
        //if there is no response throw an error 
        if (!response.ok) throw Error("Did not recive any data");
        // 
        const data = await response.json();
        // set the state for BooksData 
        setBooksData(data.results);
        // set data for next and prev page options
        setBookNavigation(data)
        // set the FetchEroor 
        setFetchError(null);
        ;
      }catch(err){
        setFetchError(err.message);
      }finally{
        setIsDataLoading(false);
      }
    }
    fetchBooks();
  },[currentUrl])



////////////// FUNCTIONS /////////////////

    // Function to move to next page 
const nextPage = function (){
    //Get next page url
    setCurrentUrl(bookNavigation.next)
    // Check current page number and set it to +1
    setPageNumber(prevState => prevState + 1)
}

    //Function to move to prev page 
const prevPage = function(){
    // Get prev page url
    setCurrentUrl(bookNavigation.previous)
     // Check current page number and set it to +1
     if(pageNumber <= 1) return;
     setPageNumber(prevState => prevState - 1)
}
    //Function to back to Home 
    const backHome = function(){
      setCurrentUrl(`https://gnikdroy.pythonanywhere.com/api/book/`)
      setPageNumber(1)
    }

//Function to get search value from input
const inputChange = function(event){
  
    const {name , value } = event.target
    setOptionsInput(prevState => {
        return{
        ...prevState,
            [name]: value
    }
    })
  }

// ALL IDS of fav movies to check if the movie is already added to fav list .   
  const favIds = favorites.map(item => item.id)

// ADD MOVIE TO FAVORITES
  const addFavorites = function(data){
    // Create copy of current favorites array and add the curent book to it 
    // const favIds = favorites.map(item => item.id)
    if(favIds.includes(data.id)){
    return
    }else{
     const newFavoriteList = [...favorites , data ] 
     setFavorites(newFavoriteList) 
    }
}

// REMOVE MOVIE FROM FAVORITES 
const removeFavorites = function(data){
  //Create the newFavoriteList , filter favorites array and remove item that will return false 
  // item.id === data.id is true so all other items won't be removed 
  const newFavoriteList = favorites.filter((item)=> item.id !== data.id
  )
  // Set favorites list to our newFaroite list after filter
  setFavorites(newFavoriteList)
 
}

// SAVE AND REMOVE FAVORITES TO LOCAL STORAGE 
  // save and remove items to local storage everytime favorites array changes
  React.useEffect(()=>{
  localStorage.setItem("Favorites" , JSON.stringify(favorites))
  },[favorites])


//Function to search for the query 
const getSearch = function(event){
    
  
  event.preventDefault();
    setCurrentUrl(`https://gnikdroy.pythonanywhere.com/api/book?search=${optionsInput.search}`)
}

// Function to filter language 

const filterLang = function(){
  setCurrentUrl(`https://gnikdroy.pythonanywhere.com/api/book/?languages=${optionsInput.language}`)
}

// Function to close and open modal 
const modalToggle = function() {
  setIsModalOpen(prevState => !prevState)
}


console.log(isModalOpen);


return (
    <div>
{/* // Navbar with options to filter for language , favorites list , search bar */}
<header>
  <Navbar
  optionsValue = {optionsInput.language}
  inputChange={inputChange}
  filterLang={filterLang}
  getSearch={getSearch}
  searchValue={optionsInput.search}
  openModal={modalToggle}
  />

</header>
{/* BOOK CARDS  */}
  <div className="books__container">
    {  isDataLoading &&
    <p> Loading Data ..... </p> }
    {fetchError && <p>{fetchError}</p>}
    {booksData.map(data => 
    <BookCard
    key={data.id}
    data={data}
    addFavorites={()=>addFavorites(data)}
    removeFavorites={()=> removeFavorites(data)}
    author={data.agents.map((data)=> `${data.person} `)}
    favIds={favIds}
    language={data.languages}
    />)}
  </div>

{/* MODAL WITH FAVORITES BOOKS */}
   
  {/* Condition to close and open modal  */}
  <div className={!isModalOpen ? "modal__container" : " modal__container modal__container-open"}>
  {/* Add hidden class to body to hide double scrollbar */}
  {isModalOpen ? document.body.classList.add("hidden") :document.body.classList.remove("hidden") }

    <h1 className="favorites__title">Favorite Books</h1>
    <Icon icon="icon-park-outline:close-one" 
    onClick={modalToggle}
    />
    {favorites.map(data =>
        <Favorites
        key={data.id}
        data={data}
        addFavorites={()=>addFavorites(data)}
        removeFavorites={()=> removeFavorites(data)}
        author={data.agents.map((data)=> `${data.person} `)}
        favIds={favIds}
        language={data.languages}
        />
    )}
  </div> 

   
   
  
  {/* BOTTOM NAVIGATION */}
    <button onClick={prevPage}>BACK</button>
    <p>Page :{pageNumber} / {Math.round(bookNavigation.count / 10)} </p>
    <button onClick={nextPage}>NEXT</button>
      <button onClick={backHome}>Home</button>
    </div>
    
  );
}


 // <div key={data.id}>
    // <button onClick={ ()=> removeFavorites(data)}>Remove Favorite</button>
    // <p >{data.title}</p> 
    // <a href={`https://www.gutenberg.org/files/${data.id}/${data.id}-h/${data.id}-h.htm`}>
    // <img src={`https://www.gutenberg.org/cache/epub/${data.id}/pg${data.id}.cover.medium.jpg`} alt={data.title}></img>
    // </a>
    // </div>