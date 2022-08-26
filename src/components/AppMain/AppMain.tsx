import React, { useEffect, useRef, useState, FC, ReactNode } from "react";
import './AppMainStyle.css'



interface IAppBottom {
    children?:  ReactNode
}

const  AppBottom: FC<IAppBottom> = ({children})=> {

    return(
        <div className="app-main">
            {children}
        </div>       
    )
}

export default  AppBottom;