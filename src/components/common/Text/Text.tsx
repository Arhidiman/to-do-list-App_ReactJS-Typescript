import { useRef, FC } from "react";
import './TextStyle.css'

interface TextProps {
    className?: string,
    textType?: string,
    inner?: string
    setTextShadowToggler?: Function | undefined,
    textShadowToggler?: boolean,
    setCheckResult?: Function | undefined,
    switchToNext?: boolean
} 
const Text: FC<TextProps> = ({textType, className, inner, setTextShadowToggler, textShadowToggler, setCheckResult, switchToNext})=> {
    
    const text = useRef<HTMLHeadingElement | HTMLParagraphElement>(null!)

    if(textType == 'title') {
        return(
            <h1 ref = {text} className = {`title ${className}`} >
                {inner}
            </h1>     
        )
    }
    
    if(textType == 'text') {
        return(
            <p ref = {text} className = {`text ${className}`}>
                {inner}
            </p>     
        )
    }

    else return (
        <div>
            
        </div>
    )
  
}

export default  Text;