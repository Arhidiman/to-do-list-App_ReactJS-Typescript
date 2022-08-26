import React, { useEffect, useRef, useState, FC, ReactNode } from "react";
import './AppBottomStyle.css'



interface IAppBottom {
    children?:  ReactNode
}

const  AppBottom: FC<IAppBottom> = ({children})=> {

    return(
        <div className="app-bottom">
            {children}
        </div>       
    )
}

export default  AppBottom;