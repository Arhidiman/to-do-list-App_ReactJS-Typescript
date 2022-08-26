import React, { useEffect, useRef, useState, FC, ReactElement } from "react";
import './AppHeaderStyle.css'


interface IAppHeader {
    children: ReactElement
}

const  AppHeader: FC<IAppHeader> = ({children})=> {

    return(
        <div className="app-header">
          {children}
        </div>       
    )
}

export default  AppHeader;