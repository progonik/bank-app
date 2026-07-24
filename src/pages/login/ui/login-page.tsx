import Image from "next/image";
import { LoginForm } from "@features/auth";

const LOGO_PATH = "/images/logo.png";
const BANNER_PATH = "/images/login-banner.png";

export function LoginPage() {
  return (
    <div className="p-6 bg-white grid grid-cols-5 gap-6 w-full h-[100vh]">
      <div className="col-span-2 h-full flex flex-col relative">
        <div className="w-full flex justify-between items-center absolute top-0 left-0 right-0">
          <Image src={LOGO_PATH} alt="Logo" width={148} height={57} />
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <LoginForm />
        </div>
      </div>

      <div className="col-span-3 rounded-[24px] overflow-hidden relative w-full h-full shadow-md shadow-accent-foreground/10">
        <Image
          src={BANNER_PATH}
          alt="Login banner"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
