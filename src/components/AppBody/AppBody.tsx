import { FC, ReactElement } from "react";
import './AppBodyStyle.css'


interface IAppBody {
    children:  ReactElement[]
}

const  AppBody: FC<IAppBody> = ({children})=> {

    return(
        <div className="app-body">
          {children}
        </div>       
    )
}

export default  AppBody;