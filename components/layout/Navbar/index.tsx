import { SearchBar } from "@/components/SearchBar";
import { useCart } from "@/context/CartContext";
import { Badge } from "antd";
import Image from "next/image";
import Link from "next/link";

const menus = [
  { name: "Thời trang nam" },
  { name: "Thời trang nữ" },
  { name: "Túi xách" },
  { name: "Nón" },
];

const Navbar = () => {
  const { totalQuantity } = useCart();
  return (
    <div className="bg-white/80 backdrop-blur-xl fixed top-0 left-0 w-full shadow-md z-50">
      <div className="container mx-auto py-6 flex items-center">
        <div className="flex gap-10">
          {menus.map((item, index) => (
            <Link href={"/"} key={index}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex gap-5 ml-auto">
          <SearchBar />
          <Link href={"/cart"}>
            <div className="size-10 hover:bg-gray-200 aspect-square cursor-pointer duration-300 rounded-md flex items-center justify-center">
              <Badge
                overflowCount={99}
                size="small"
                count={totalQuantity}
                className="w-fit p-0"
                classNames={{ indicator: "!px-[3px]" }}
              >
                <Image
                  src={"/images/icons/cart.svg"}
                  width={25}
                  height={25}
                  alt={""}
                />
              </Badge>
            </div>
          </Link>
        </div>
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
