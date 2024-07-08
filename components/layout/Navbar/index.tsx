import Image from "next/image";
import Link from "next/link";
import React from "react";

const menus = [
  { name: "Thời trang nam" },
  { name: "Thời trang nữ" },
  { name: "Túi xách" },
  { name: "Nón" },
];

const Navbar = () => {
  return (
    <div className="bg-white fixed top-0 left-0 w-full shadow-2xl z-50">
      <div className="container mx-auto py-6 bg-white flex">
        <div className="flex gap-10">
          {menus.map((item, index) => (
            <Link href={"/"} key={index}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex gap-10 ml-auto">Cart</div>
        <Link href={"/"} className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
