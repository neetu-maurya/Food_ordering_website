import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import EditMenu from "./EditMenu";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const AddMenu = () => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [error, setError] = useState<Partial<MenuFormSchema>>({});
  const { loading, createMenu } = useMenuStore();
  const { restaurant } = useRestaurantStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);

    if (!result.success) {
      setError(result.error.formErrors.fieldErrors as Partial<MenuFormSchema>);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }

      await createMenu(formData); // ✅ Removed duplicate call

      setOpen(false); // ✅ Close modal after submission
      setInput({ name: "", description: "", price: 0, image: undefined });
      setError({}); // ✅ Reset errors after success
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl text-gray-900 dark:text-gray-200">
          Available Menus
        </h1>

        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
              setInput({
                name: "",
                description: "",
                price: 0,
                image: undefined,
              });
              setError({});
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-yellow-300 hover:bg-yellow-200 text-black font-semibold transition-transform hover:scale-105 active:scale-95">
              <Plus className="mr-2" />
              Add New Dish
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restaurant stand out.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter menu name"
                />
                {error.name && (
                  <span className="text-xs text-red-600">{error.name}</span>
                )}
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter menu description"
                />
                {error.description && (
                  <span className="text-xs text-red-600">
                    {error.description}
                  </span>
                )}
              </div>

              <div>
                <Label>Price (Rupees)</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={changeEventHandler}
                  placeholder="Enter menu price"
                />
                {error.price && (
                  <span className="text-xs text-red-600">{error.price}</span>
                )}
              </div>

              <div>
                <Label>Upload Menu Image</Label>
                <Input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                />
                {error && (
                  <span className="text-xs text-red-600">
                    {error.image?.name}
                  </span>
                )}
              </div>

              <DialogFooter className="mt-5">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-yellow-300 hover:bg-yellow-200 text-black font-semibold transition-transform hover:scale-105 active:scale-95"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Submit Dish"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Display Menus */}
      {restaurant?.menus.map((menu: any, idx: number) => (
        <div key={idx} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={menu.image}
              alt={menu.name}
              className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h1>
              <p className="text-gray-600 dark:text-white">
                {menu.description}
              </p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-red-600">{menu.price} ₹</span>
              </h2>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true);
              }}
              size="sm"
              className="bg-yellow-300 hover:bg-yellow-200 text-black font-semibold transition-transform hover:scale-105 active:scale-95 flex items-center"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}

      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
