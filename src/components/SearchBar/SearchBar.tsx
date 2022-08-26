import React, { useEffect, useRef, useState, FC } from "react";
import './SearchBarStyle.css'
import Button from '../common/Button/Button'
import Input from "../common/Input/Input";
import searchIcon from '../../images/loup.png';


interface ISearchBar {

}

const  SearchBar: FC<ISearchBar> = ()=> {

    return(
        <div className="search-bar">

            <input></input>
 

        </div>       
    )
}

export default  SearchBar;