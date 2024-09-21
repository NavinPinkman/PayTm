import {Link} from "react-router-dom"

export function BottomWarning({label , buttonText, to}){
    return <div className="flex justify-center pb-2">
        <div>{label}</div>
        <div>
            <Link className=" cursor-pointer pl-2 underline" to={to}>{buttonText}</Link>
        </div>
    </div>
}