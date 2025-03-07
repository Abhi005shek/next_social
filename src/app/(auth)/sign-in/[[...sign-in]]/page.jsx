import { SignIn } from "@clerk/nextjs";
import React from "react";

function SignInComp() {
  return (
    <div className="flex h-[calc(100vh-96px)] mt-6 w-full justify-center items-center">
      <SignIn />
    </div>
  );
}

export default SignInComp;
