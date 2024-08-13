import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "../redux/authSlice"
import { useLoginMutation } from "../api/authApiSlice"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import logo from "@/assets/logo.svg"
import { BeatLoader } from "react-spinners"

export function Login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLParagraphElement>(null)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errMsg, setErrMsg] = useState<string>("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [email, password])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const userData = await login({ username: email, password }).unwrap()
      dispatch(setCredentials({ ...userData, email }))
      setEmail("")
      setPassword("")
      navigate("/")
    } catch (err: any) {
      if (!err?.originalStatus) {
        setErrMsg("No Server Response")
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password")
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized")
      } else {
        setErrMsg("Login Failed")
      }
      errRef.current?.focus()
    }
  }

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)
  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-center gap-2">
            <img src={logo} width={32} height={32} alt="Logo" />{" "}
            <h1>Blood Bank Login</h1>
          </div>
        </CardTitle>
        <CardDescription>
          <p className="text-center">Login to your account</p>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={handleEmailInput}
                ref={emailRef}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={handlePasswordInput}
              />
            </div>
          </div>
          <p ref={errRef} className="text-primary">
            {errMsg}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button type="submit" disabled={isLoading}>
            {!isLoading ? <p>Login</p> : <BeatLoader className="" size={4} />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
