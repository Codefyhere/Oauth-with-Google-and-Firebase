"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import firebaseLogo from "../../public/firebase.png";
import googleLogo from "../../public/google.png";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from "../../firebaseConfig";


const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any | undefined>();
  const handleSignup = () => {
    setLoading(true)
    const provider = new GoogleAuthProvider()
    const auth = getAuth(app)
    signInWithPopup(auth, provider)
    .then((res) => {
      console.log(res)
      setUser(res.user)
    })
    .catch((error) => {
      console.log(error.message)
    })
    .finally(()=>{
      setLoading(false)
    })
  };

  return (
    <main className={poppins.className}>
      {user === undefined ? (
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <h1 className="font-medium text-xl uppercase">Google OAuth with</h1>
            <Image height={40} alt="firebase-logo" src={firebaseLogo} />
          </div>
          <div className="relative flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-tr from-blue-900 to-purple-900 rounded-md cursor-pointer hover:translate-y-[.1rem] hover:opacity-80">
            {loading && (
              <div className="absolute top-1/2 right-4 -translate-y-1/2">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
            <button
              className="flex items-center gap-2"
              disabled={loading}
              onClick={handleSignup}
            >
              <h1 className="font-medium text-lg">Signup with</h1>
              <Image
                className="bg-white p-1 rounded-full"
                height={25}
                alt="firebase-logo"
                src={googleLogo}
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10">
          <p className="bg-gradient-to-tr px-5 py-2 rounded-md  from-blue-900 to-purple-900 text-white font-medium text-lg">
            Logged in Successfully
          </p>
          <div className="flex items-center gap-4">
            <Avatar
              alt="user"
              src={user.photoURL}
              sx={{ width: 100, height: 100 }}
            />
            <div>
              <p>
                <span className="text-blue-500">Name: </span>
                {user.displayName}
              </p>
              <p>
                <span className="text-blue-500">Email: </span>
                <span>{user.email}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
