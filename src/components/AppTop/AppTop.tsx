import { FC, ReactNode } from "react";
import './AppTopStyle.css'



interface IAppTop {
    children: ReactNode,
}

const  AppTop: FC<IAppTop> = ({children})=> {
    return(
        <div className="app-top">
            <div className="app-top-container">
                {children}
            </div>
        </div>       
    )
}

export default  AppTop;