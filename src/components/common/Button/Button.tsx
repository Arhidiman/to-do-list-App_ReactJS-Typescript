import { useEffect, useRef, FC } from "react";
import './ButtonStyle.css'

interface IButton {
    className: string,
    inner: string,
    disabled?: boolean,
    setSearchButtonElement?: Function,
    setAddButtonElement?: Function,
    setEraseButtonElement?: Function,
    setEditTextButtonElement?: Function
    setSaveToDoButtonElement?: Function
}

const Button: FC<IButton> = ({className, inner, disabled, setAddButtonElement, setSearchButtonElement, setEraseButtonElement, setEditTextButtonElement, setSaveToDoButtonElement})=> {
    
    const button = useRef<HTMLButtonElement>(null!)
    
    useEffect(()=>{
        if(setEraseButtonElement) {
            setEraseButtonElement(button.current)
        }
        if(setAddButtonElement) {
            setAddButtonElement(button.current)
        }

        if(setEditTextButtonElement) {
            setEditTextButtonElement(button.current)
        }
        if(setSaveToDoButtonElement) {
            setSaveToDoButtonElement(button.current)
        }
        if(setSearchButtonElement) {
            setSearchButtonElement(button.current)
        }
    })

    function switchColor(element: HTMLElement, color: string) {
        element.style.background = color
    }

    return(
        <button ref = {button} className = {`button ${className}`} disabled = {disabled} type = 'button' 
            onMouseOver = {()=> switchColor(button.current, 'rgb(97, 97, 97)')}
            onMouseDown = {()=> switchColor(button.current, 'rgb(71, 71, 71)')}
            onMouseUp = {()=> switchColor(button.current, 'rgb(97, 97, 97)')}
            onMouseOut = {()=> switchColor(button.current, 'grey')}
        > 
            {inner}
        </button>     
        
    )
}



export default  Button;