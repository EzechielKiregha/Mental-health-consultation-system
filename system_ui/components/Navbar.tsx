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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/therapists", label: "Therapists" },
    { href: "/self-check", label: "Self-Check" },
    { href: "/resources", label: "Resources" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white text-gray-800 shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src={"/images/logo.png"}
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-lg font-bold text-green-700 hidden sm:inline">USCOR for Mental Health</span>
        </Link>

        {/* Desktop Navigation Links - Centered */}
        <div className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="text-gray-700 font-medium hover:text-green-600 transition-colors duration-200 relative group"
              href={link.href}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Right Section - User or Login */}
        <div className="flex items-center gap-4">
          {user && !otpRequired ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors duration-200">
                  <img
                    src="/images/avatar1.png"
                    alt="Avatar"
                    className="h-8 w-8 rounded-full border-2 border-green-600"
                  />
                  <span className="hidden sm:inline text-gray-700 font-medium text-sm">
                    {patientData?.firstName || "User"}
                  </span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-800">
                    {patientData?.firstName} {patientData?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">Logged in</p>
                </div>
                <DropdownMenuItem asChild>
                  <Link
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer rounded-md"
                    href="/dashboard"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9" />
                    </svg>
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer rounded-md"
                    href="/dashboard/#"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer rounded-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                Get Started
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      className="text-gray-700 cursor-pointer"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {user && !otpRequired && <DropdownMenuSeparator />}
                {user && !otpRequired ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        className="text-gray-700 cursor-pointer"
                        href="/dashboard"
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        className="text-gray-700 cursor-pointer"
                        href="/dashboard/#"
                      >
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="text-green-600 font-semibold cursor-pointer">
                      Get Started
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
