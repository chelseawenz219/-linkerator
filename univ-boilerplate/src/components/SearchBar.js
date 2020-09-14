//IMPORT REACT
import React, {useState, useEffect} from "react";

import "./SearchBar.css";

import {
    getTags
} from "../api";

//SEARCH BAR FUNCTION
function SearchBubblez() {

    const [tags, setAllTags] = useState([]);

    useEffect(async ()=>{
        setAllTags(await getTags());
    });

    console.log(tags);
    
    return (
        <div className="searchBar">
            <div className="checkresults">
            {/* {
                tags.map((tag, index) =>{
                    return <input type="checkbox" key={index} value={tag}>{tag}</input>
                })
            } */}
            
            </div>
        </div>
    );
}

//EXPORT SEARACH FUNCTION
export default SearchBubblez;
