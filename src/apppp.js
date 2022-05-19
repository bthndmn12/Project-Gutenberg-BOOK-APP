import React from 'react';




function App() {
  //Set state for the data 
  const [booksData , setBooksData] = React.useState([])
  // Set state for the Loading msg 
  const [isDataLoading , setIsDataLoading] = React.useState(true)
  // Api url 
  const API = "https://gnikdroy.pythonanywhere.com/api/book/"


//   React.useEffect(()=>{
   
//     const fetchBooks = async () =>{
//       try{
//         const response = await fetch(API)
//         const data = await response.json()
//         console.log(data);
        
//         setBooksData(data.results)
//       }catch(err){

//       }finally{
//         setIsDataLoading(false)
//       }
//     }
    
//     fetchBooks();
//   },[])

// console.log(isDataLoading);




  return (
    <div>
      
      <h1>hello</h1>
    {/* {  isDataLoading &&
    <p> Loading Data ..... </p> }
    {booksData.map(data => <p key={data.id}>{data.title}</p>)} */}
    </div>
  );
}

export default App;
