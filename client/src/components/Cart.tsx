import { Avatar } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/cartType";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { cart, decrementQuantity, incrementQuantity ,removeFromTheCart} = useCartStore();
  let totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  }, 0);
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="flex justify-end">
        <Button
          variant="link"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          Clear All
        </Button>
      </div>
      <Table className="dark:bg-gray-800 dark:border-gray-700">
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-800 dark:text-gray-200">
              Items
            </TableHead>
            <TableHead className="text-gray-800 dark:text-gray-200">
              Title
            </TableHead>
            <TableHead className="text-gray-800 dark:text-gray-200">
              Price
            </TableHead>
            <TableHead className="text-gray-800 dark:text-gray-200">
              Quantity
            </TableHead>
            <TableHead className="text-gray-800 dark:text-gray-200">
              Total
            </TableHead>
            <TableHead className="text-right text-gray-800 dark:text-gray-200">
              Remove
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: CartItem,index) => (
            <TableRow key={index}>
              <TableCell className="w-12 h-12">
                <Avatar>
                  <AvatarImage src={item.image} alt="" className="object-cover w-full h-full rounded-full" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decrementQuantity(item._id)}
                    
                    variant={"outline"}
                    className="rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    size={"icon"}
                  >
                    <Minus />
                  </Button>
                  <Button
                    disabled
                    variant={"outline"}
                    className="font-bold border-none bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    size={"icon"}
                  >
                    {item.quantity}
                  </Button>
                  <Button
                    onClick={() => incrementQuantity(item._id)}
                    variant={"outline"}
                    className="rounded-full bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 text-black font-semibold transition duration-200 transform hover:scale-105 active:scale-95 dark:bg-yellow-500 dark:text-white"
                    size={"icon"}
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{item.price * item.quantity}</TableCell>
              <TableCell className="text-right">
                <Button
                onClick={() =>removeFromTheCart(item._id)}
                  size={"sm"}
                  className="rounded-full bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 text-black font-semibold transition duration-200 transform hover:scale-105 active:scale-95 dark:bg-yellow-500 dark:text-white"
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5} className="text-gray-800 dark:text-gray-200">
              Total
            </TableCell>
            <TableCell className="text-right text-gray-800 dark:text-gray-200">
              {totalAmount}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 text-black font-semibold transition duration-200 transform hover:scale-105 active:scale-95 dark:bg-yellow-500 dark:text-white"
        >
          Proceed To Checkout
        </Button>
        <CheckoutConfirmPage open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Cart;
