import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Separator } from "./ui/separator";
import { useThemeStore } from "@/store/useThemeStore";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";

const Navbar = () => {
  const { setTheme } = useThemeStore();
  const { user, loading, logout } = useUserStore();
  const { cart } = useCartStore();
  

  //const admin = true;
  //const loading = false;

  return (
    <div className="max-w-full mx-auto">
      <div className="flex items-center justify-between h-14">
        <Link to="/">
          <h1 className="font-bold md:font-extrabold text-2xl text-red-500 animate-bounce">
            TotatoEats :)
          </h1>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-900 dark:text-gray-100 font-bold hover:text-red-500 transition"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="text-gray-900 dark:text-gray-100 font-bold hover:text-red-500 transition"
            >
              Profile
            </Link>
            <Link
              to="/order/status"
              className="text-gray-900 dark:text-gray-100 font-bold hover:text-red-500 transition"
            >
              Order
            </Link>
            {user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="text-gray-900 dark:text-gray-100 font-bold hover:text-red-500 transition">
                    Dashboard
                  </MenubarTrigger>
                  <MenubarContent className="absolute bg-white dark:bg-gray-800 border dark:border-gray-700 z-50 min-w-[100px] shadow-md rounded-md">
                    <Link to="/admin/restaurant">
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to="/admin/menu">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/order">
                      <MenubarItem>Order</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-5 w-5 transition-all dark:hidden" />
                  <Moon className="h-5 w-5 hidden transition-all dark:block" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                side="bottom"
                className="absolute bg-white dark:bg-gray-800 border dark:border-gray-700 z-50 min-w-[100px] shadow-md rounded-md "
              >
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="dark:text-gray-100"
                >
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="dark:text-gray-100"
                >
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-gray-900 dark:text-gray-100" />
              {cart.length > 0 && (
                <Button
                  size={"icon"}
                  className="absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-red-500 hover:bg-red-400 active:bg-red-600 text-black"
                >
                  {cart.length}
                </Button>
              )}
            </Link>
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="profilephoto" />
              <AvatarFallback className="dark:text-gray-100">Cn</AvatarFallback>
            </Avatar>
            <Button
              disabled={loading} // ✅ Prevents multiple clicks
              onClick={logout}
              className="bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 w-full text-black font-semibold py-2 rounded-lg shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Logout"
              )}
            </Button>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          {/* Mobile responsive */}
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const { setTheme } = useThemeStore();
  const { user, logout, loading } = useUserStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className=" flex flex-row items-center justify-between mt-2">
          <SheetTitle>NituEats</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/order/status"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <ShoppingCart />
            <span>Cart (0)</span>
          </Link>
          {user?.admin && (
            <>
              <Link
                to="/admin/menu"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <SquareMenu />
                <span>Menu</span>
              </Link>
              <Link
                to="/admin/restaurant"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <UtensilsCrossed />
                <span>Restaurant</span>
              </Link>
              <Link
                to="/admin/order"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <PackageCheck />
                <span>Restaurant Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>

        <SheetFooter className="flex flex-col gap-4">
          <>
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>Cn</AvatarFallback>
              </Avatar>
              <h1 className="font-bold">nitu Mernstack</h1>
            </div>
          </>

          <SheetClose asChild>
            <Button
              disabled={loading} // ✅ Prevents multiple clicks
              onClick={logout}
              className="bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 w-full text-black font-semibold py-2 rounded-lg shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Logout"
              )}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
