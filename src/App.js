import React from "react"


export default function App (){
    //Set state for current page 
    const [currentPage , setCurrenPage] = React.useState(6578)
    //Set state for the data 
  const [booksData , setBooksData] = React.useState([])
    // Set state for the Loading msg 
  const [isDataLoading , setIsDataLoading] = React.useState(true)
  // Set state for fetchError
  const [fetchError , setFetchError] = React.useState(null)
    // Api  change URL of  the page number then useEffect will rerender if we will add dependancy as a currentPage
  const API = `https://gnikdroy.pythonanywhere.com/api/book/?page=${currentPage}`

// Function to move to next page 
const nextPage = function (){
    setCurrenPage(prevState => prevState +1)
}
//Function to move to prev page 
const prevPage = function(){
    if(currentPage<=1) return;
    setCurrenPage(prevState => prevState -1)
   
}

// useEffect to fetch API and rerenders if currentPage will change .
React.useEffect(()=>{
   
   
    const fetchBooks = async () =>{
      try{
          
        const response = await fetch(API);
        //if there is no response throw an error 
        if (!response.ok) throw Error("Did not recive any data");
        // 
        const data = await response.json();
        // set the state for BooksData 
        setBooksData(data.results);
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
  },[currentPage ,API])

console.log(currentPage);


return (
    <div>
      
    <h1>hello</h1>
    {  isDataLoading &&
    <p> Loading Data ..... </p> }
    {fetchError && <p>{fetchError}</p>}
    {booksData.map(data => 
    <div key={data.id}>
    <p >{data.title}</p> 
    <a href={`https://www.gutenberg.org/files/${data.id}/${data.id}-0.txt`}>
    <img src={`https://www.gutenberg.org/cache/epub/${data.id}/pg${data.id}.cover.medium.jpg`} alt={data.title}></img>
    </a>
    </div>
    )}
    <button onClick={prevPage}>BACK</button>
    <button onClick={nextPage}>NEXT</button>

    </div>
    
  );
}