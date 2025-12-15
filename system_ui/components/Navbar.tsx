"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import Link from "next/link";

const Navbar = () => {
  const { user, otpRequired, logout } = useAuth();
  const { patientData } = useDashboardStats();

  return (
    <nav className="sticky top-0 z-50 w-full bg-green-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={"/images/logo.png"}
            alt="Logo"
            className="h-10 w-10 mr-2 rounded-full"
          />
          <span className="text-xl font-bold">Ben Mental Health Care</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 items-center">
          <Link
            className="text-white hover:underline hover:underline-offset-4 transition-all duration-300"
            href="/">
            Home
          </Link>
          <Link
            className="text-white hover:underline hover:underline-offset-4 transition-all duration-300"
            href="/therapists">
            Therapists
          </Link>
          <Link
            className="text-white hover:underline hover:underline-offset-4 transition-all duration-300"
            href="/self-check">
            Self-Check
          </Link>
          <Link
            className="text-white hover:underline hover:underline-offset-4 transition-all duration-300"
            href="/resources">
            Resources
          </Link>

          {user && !otpRequired ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/avatar1.png"
                    alt="Avatar"
                    className="h-8 w-8 rounded-full border border-green-600"
                  />
                  <span className="ml-2 text-white font-semibold">
                    {patientData?.firstName} {patientData?.lastName}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>
                  <Link
                    className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300"
                    href="/dashboard">
                    Dashboard
                  </Link>

                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300"
                    href="/dashboard/#">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600 hover:underline hover:underline-offset-4 transition-all duration-300">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login">
              <Button
                className="bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-200"
              >
                Get Started
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-200">
                Menu
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Link
                  className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300"
                  href="/">
                  Home
                </Link>

              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300"
                  href="/therapists">
                  Therapists
                </Link>

              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300"
                  href="/self-check">
                  Self-Check
                </Link>

              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300"
                  href="/resources">
                  Resources
                </Link>
              </DropdownMenuItem>
              {user && !otpRequired ? (
                <>
                  <DropdownMenuItem>
                    <Link
                      className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300"
                      href="/dashboard">
                      Dashboard
                    </Link>

                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300"
                      href="/dashboard/#">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600 hover:underline hover:underline-offset-4 transition-all duration-300">
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  <Link
                    href="/login">
                    <Button
                      className="bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-200"
                    >
                      Get Started
                    </Button>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
