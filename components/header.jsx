import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo-black.png";
import {
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import { Button } from "./ui/button";
import { flushAllTraces } from "next/dist/trace";

const Header = async ({ isAdminPage = false }) => {
  const isAdmin = false;

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href={isAdminPage ? "/admin" : "/"}
          className="flex items-center space-x-2"
        >
          <Image
            src={logo}
            alt="Vehiql logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
          {isAdminPage && <span className="text-gray-500">Admin</span>}
        </Link>

        <div className="flex items-center space-x-4">
          {isAdminPage ? (
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft size={18} />
                <span className="hidden md:inline ">Back to App</span>
              </Button>
            </Link>
          ) : (
            <SignedIn>
              <Link href="/saved-cars">
                <Button >
                  <Heart size={18} />
                  <span className="hidden md:inline ">Saved Cars</span>
                </Button>
              </Link>

              {!isAdmin ? (
                <Link href="/reservations">
                  <Button className="bg-white hover:bg-gray-100 border border-gray-300">
                    <CarFront size={18} className="text-black" />
                    <span className="hidden md:inline text-black">
                      My Reservations
                    </span>
                  </Button>
                </Link>
              ) : (
                <Link href="/admin">
                  <Button className="bg-white hover:bg-gray-100 border border-gray-300">
                    <Layout size={18} className="text-black" />
                    <span className="hidden md:inline text-black">
                      Admin Portal
                    </span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button className="bg-white hover:bg-gray-100 border border-gray-300">
                <span className="text-black">Login</span>
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={{
              elements:{
                avatarBox: "w-14 h-14",
              },
            }} />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
