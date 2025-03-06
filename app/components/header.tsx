"use client";
import Link from "next/link";
import NavLink from "./nav-link";
import { removeAccessToken } from "../utils/action";


interface HeaderProps {
  user?: {
    username: string;
  };
}

const links = [
  { href: "/", label: "Home" },
  { href: "/our-team", label: "Our Team" },
  { href: "/about-us", label: "About Us" },
];

const auth = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export default function Header(user: any) {
  const logout = () => {
    removeAccessToken();
  };

  return (
    <header className="bg-white/50">
      <nav className="container mx-auto flex justify-between items-center py-4">
        <Link href="/">Bank</Link>

        <ul className="flex gap-4">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </ul>

        <ul className="flex gap-4">
          {user && user.user? (
            <>
            <li>
              <div className="text-black">{user.user.username}</div>
            </li>
            <li>
              <div className="cursor-pointer" onClick={() => logout()}>
                Log Out
              </div>
              </li>
            </>
            
          ) : (
            auth.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))
          )}
        </ul>
      </nav>
    </header>
  );
}
