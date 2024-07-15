import BloodBankImg from "../assets/bloodbank_hand.png"
import { Login } from "../features/auth/components/Login"

export default function LoginPage() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-grow-[3] flex justify-center items-center">
        <div className="w-[90%] h-[90%] bg-primary rounded-xl flex flex-col justify-center items-center gap-4">
          <img
            src={BloodBankImg}
            alt="blood-bank"
            width={400}
            height={400}
            className="mx-auto"
          />
          <h1 className="text-4xl text-center text-background font-semibold break-words">
            "Your blood can give <br /> someone another chance <br />
            at life."
          </h1>
        </div>
      </div>
      <div className="flex-grow-[2] flex justify-center items-center">
        <Login />
      </div>
    </div>
  )
}
