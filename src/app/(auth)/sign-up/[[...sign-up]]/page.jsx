import { SignIn, SignUp } from "@clerk/nextjs";
import React from "react";

function SignUpComp() {
  return (
    <div className="flex h-[calc(100vh-96px)] w-full justify-center items-center">
      <SignUp/>
    </div>
  );
}

export default SignUpComp;
