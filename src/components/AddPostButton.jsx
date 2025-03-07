"use client";
import { useFormStatus } from "react-dom";

function AddPostButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="mt-2 rounded-md p-2 text-white bg-blue-400 disabled:bg-blue-200 cursor-pointer disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? "Sending" : "Send"}
    </button>
  );
}

export default AddPostButton;
