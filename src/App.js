import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'

function App() {

  const [searchResult, setSearchResult] = useState()

  const [page, setPage] = useState(1)
  const [input, setInput] = useState("")

  useEffect(()=>{
    //if we open a new page input is empty so the program skip this
    if(input){
      const changePage = async () => {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=a461e386&s=${input}&page=${page}`,
        )
        
        const data = await response.json();
        
        if(data!==undefined){
          setSearchResult(data);
        }
      }
      changePage();
      
    }
   },[page])
  
  //It will update the input character by character
  const inputWriter = (str) =>{
    setInput(str);
  }

  //When we press search we take the input we have and we make the first query 
  const search = async () =>{
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=a461e386&s=${input}`,
      )
      const data = await response.json();
      setSearchResult(data);
  } 
 
  
  return (
    <div className="App">
      <div className="search">
        <input type="text" placeholder="Search..." value={input} onChange={(e) => inputWriter(e.target.value)}/>
        <button onClick={search}>Search</button>
      </div>
      {!searchResult ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results">
          <div className="chevron">
            { (page > 1) && (<ChevronLeft onClick={()=> setPage(page - 1)} />) }
          </div>
          <div className="search-results-list">
            {searchResult.Search.map(result => (
              <div key={result.imdbID} className="search-item">
                <img
                  src={result.Poster === 'N/A' ? placeholderImg : result.Poster}
                  alt="poster"
                />
                <div className="search-item-data">
                  <div className="title">{result.Title}</div>
                  <div className="meta">{`${result.Type} | ${result.Year}`}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chevron">
          {searchResult.Search.length > 9 &&(<ChevronRight onClick={()=> setPage(page + 1)}/>)}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
