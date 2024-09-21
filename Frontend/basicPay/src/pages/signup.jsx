import { Heading } from "../components/heading"
import { Subheading } from "../components/Subheading"
import { Inputbox } from "../components/Inputbox"
import { Button } from "../components/Button"
import {BottomWarning} from "../components/BottomWarning"
import{useState} from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


export function Signup(){
  const [firstname , setFirstname] = useState("")
  const [lastname , setLastname] = useState("")
  const [username , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const navigate = useNavigate();

  
    return (
         <div className="bg-yellow-400 h-screen flex justify-center ">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign up"} />
            <Subheading label={"Enter your infromation to create an account"} />
            <Inputbox onChange={(e)=>{
              setFirstname(e.target.value)
            }} placeholder="John" label={"First Name"} />

            <Inputbox onChange={(e)=>{
              setLastname(e.target.value)
            }} placeholder="Doe" label={"Last Name"} />

            <Inputbox onChange={(e)=>{
              setEmail(e.target.value)
            }} placeholder="harkirat@gmail.com" label={"Email"} />

            <Inputbox onChange={(e)=>{
              setPassword(e.target.value)
            }} placeholder="123456" label={"Password"} />

            <div className="pt-4">
              <Button onClick={async ()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                  username,
                  firstname,
                  lastname,
                  password
                })
                localStorage.setItem("token",response.data.token)
                //localStorage.removeItem("token") ==> whenever we logged out we should remove token from local storage
                navigate("/dashboard")
              }} label={"Sign up"} />
            </div>
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
          </div>
        </div>
      </div>)
}