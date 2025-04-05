import SubmitBtn from "@/app/ui/auth/SubmitBtn";
import { openSans } from "@/app/ui/fonts";


export default function EmailVerification() {
  return (
    <>
    <div className="flex flex-col gap-3">
        <h2 className="md:text-2xl font-bold text-xl">Email Verification</h2>
        <p className={`md:text-base text-sm ${openSans.className}`}>A link has been sent to your mail, kindly check your mail and click the link to activate your account</p>
        <p className="text-[#D60000] text-xs md:text-sm">Didn't get a mail?</p>
    </div>
    <div className="mt-8 flex flex-col gap-8">
        <SubmitBtn text="Resend"/>   
    </div>
    </>
  )
}
