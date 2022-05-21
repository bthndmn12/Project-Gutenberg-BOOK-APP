import React from "react"


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
  
// console.log(optionsInput);
// console.log(currentUrl)
// console.log(booksData);
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
    // setCurrenPage(prevState => prevState +1)    
    setCurrentUrl(bookNavigation.next)
}

    //Function to move to prev page 
const prevPage = function(){
    // if(currentPage<=1) return;
    // setCurrenPage(prevState => prevState -1)
    setCurrentUrl(bookNavigation.previous)
}
    //Function to back to Home 
    const backHome = function(){
      setCurrentUrl(`https://gnikdroy.pythonanywhere.com/api/book/`)
    }

//Function to get search value from input
const inputChange = function(event){
    const {name , value } = event.target
    setOptionsInput(prevState => {
        return{
        ...prevState,
            [name]: value
    }
    })}

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
const getSearch = function(){
    setCurrentUrl(`https://gnikdroy.pythonanywhere.com/api/book?search=${optionsInput.search}`)
}

// Function to filter language 

const filterLang = function(){
  setCurrentUrl(`https://gnikdroy.pythonanywhere.com/api/book/?languages=${optionsInput.language}`)
}





return (
    <div>
      
    <h1>hello</h1>
    <input 
    type="text" 
    value={optionsInput.search}
    onChange={inputChange}
    name="search"
    >
    {/* OPTIONS FOR LANGUAGE FILTER   */}
    </input>
    <button onClick={getSearch}>SEARCH</button>
    <select
    id = "language"
    value = {optionsInput.language}
    onChange={inputChange}
    name = "language"
    >
    
    <option value="en">EN</option>
    <option value="pl">PL</option>
    <option value="es">ES</option>
    <option value="it">IT</option>
    <option value="ru">RU</option>
           

    </select>
    <button onClick={filterLang}>SUBMIT</button>
    {  isDataLoading &&
    <p> Loading Data ..... </p> }
    {fetchError && <p>{fetchError}</p>}

    {booksData.map(data => 
    // BOOK CARD COMPONENT
    <div key={data.id}>
    {/* Check if the current id is already in favIDs if its not dispaly button  */}
    {!favIds.includes(data.id) && <button onClick={()=>addFavorites(data)}>Add Favorite</button>}
    <p >{data.title}</p> 
    <a href={`https://www.gutenberg.org/files/${data.id}/${data.id}-h/${data.id}-h.htm`}>
    <img src={`https://www.gutenberg.org/cache/epub/${data.id}/pg${data.id}.cover.medium.jpg`} alt={data.title}></img>
    </a>
    </div>
    )}

    <h2>FAVORITES</h2>
    {/* FAVORITES */}
    {favorites.map(data => 
    // BOOK CARD COMPONENT
    <div key={data.id}>
    <button onClick={ ()=> removeFavorites(data)}>Remove Favorite</button>
    <p >{data.title}</p> 
    <a href={`https://www.gutenberg.org/files/${data.id}/${data.id}-h/${data.id}-h.htm`}>
    <img src={`https://www.gutenberg.org/cache/epub/${data.id}/pg${data.id}.cover.medium.jpg`} alt={data.title}></img>
    </a>
    </div>
    )}
    
    <button onClick={prevPage}>BACK</button>
    <p>Books : {bookNavigation.count} </p>
    <button onClick={nextPage}>NEXT</button>
      <button onClick={backHome}>Home</button>
    </div>
    
  );
}