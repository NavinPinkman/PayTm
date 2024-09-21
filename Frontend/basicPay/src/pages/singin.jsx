import { Heading } from "../components/heading"
import { Subheading } from "../components/Subheading"
import { Inputbox } from "../components/Inputbox"
import { Button } from "../components/Button"
import {BottomWarning} from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export function Signin(){
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const navigate = useNavigate()
    
    return (
         <div className="bg-yellow-400 h-screen flex justify-center ">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign In"} />
            <Subheading label={"Enter your credentials to access your account"} />
            
            <Inputbox onChange={(e)=>{
                setUsername(e.target.value)
            }} placeholder="harkirat@gmail.com" label={"Email"} />

            <Inputbox onChange={(e)=>{
                setPassword(e.target.value)
            }} placeholder="123456" label={"Password"} />

            <div className="pt-4">
              <Button onClick={async ()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                    username,
                    password
                });
                const token = response.data.token
                localStorage.setItem("token",token)
                navigate("/dashboard")
              }} label={"Sign In"} />
            </div>
            <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
          </div>
        </div>
      </div>)
}