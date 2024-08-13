import logo from "@/assets/logo.svg"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"

export default function Navbar() {
  return (
    <div className="h-[48px] bg-primary">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <img src={logo} className="bg-secondary rounded-full size-8" />
          <h2 className="text-2xl font-bold text-background">Blood Bank</h2>
        </div>
        <div className="hidden md:flex md:items-center">
          <div className="flex gap-2 items-center">
            <Link to="/login">Home</Link>
            <Link to="/login">Donation</Link>
          </div>
          <Button className="bg-secondary text-background font-bold text-lg">
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
