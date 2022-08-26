import react, { useEffect, useRef, useState } from "react";
import './InputStyle.css'


function Input(props) {

    const input = useRef();
    const className = props.className;
    const type = props.type;
    const name = props.name;
    const placeholder = props.placeholder;
    const width = props.width;
    const height = props.height;
    const margin = props.margin;
    const verticalAlign = props.verticalAlign;
    const horisontalAlign = props.horisontalAlign;
    const background = props.background;
    const border = props.border;
    const borderRarius = props.borderRarius;

    const setIsInputFocused = props.setIsInputFocused;
    const setIsEraseButtonVisible = props.setIsEraseButtonVisible;
    const eraseButton = props.eraseButton;

    useEffect(()=>{
        input.current.addEventListener('focus', ()=>{
            setIsInputFocused(true)
        })

        input.current.addEventListener('blur', ()=>{
            setIsInputFocused(false)
        })

        input.current.addEventListener('input', ()=>{
            setIsEraseButtonVisible(true)
        })

        if(eraseButton !== undefined) {
            eraseButton.addEventListener('click', (e)=>{
                e.preventDefault();
                input.current.value = '';
                setIsEraseButtonVisible(false)
            })
        }
    })

    return(
        <input ref = {input} className = {`input ${className}`} type = {type} name = {name} placeholder = {placeholder}
            style = {{
                height: height, 
                width: width, 
                margin: margin, 
                justifySelf: horisontalAlign, 
                alignSelf: verticalAlign, 
                background: background,
                border: border,
                borderRadius: borderRarius
            }}
        >
        </input>     
    )
}

export default  Input;