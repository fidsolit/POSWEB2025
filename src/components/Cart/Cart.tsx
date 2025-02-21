import React, { useEffect, useState } from "react";
import { ExtendedProductProp } from "@/types/cart";
import { supabase } from "@/libs/supabase";
import { toast } from "react-hot-toast";

interface CartCardProps {
  cartItems: ExtendedProductProp[];
  handleRemoveItemFromCart: (index: any) => void;
}

const CartCard = ({ cartItems, handleRemoveItemFromCart }: CartCardProps) => {
  const [selected, setSelected] = useState<ExtendedProductProp[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setSelected([...cartItems]);
    return () => {
      selected;
    };
  }, [cartItems]);

  const handleIncrement = (index: number) => {
    const updatedSelected = [...selected];
    updatedSelected[index].quantity += 1;
    setSelected(updatedSelected);
  };

  const handleDecrement = (index: number) => {
    const updatedSelected = [...selected];
    updatedSelected.forEach((_, i) => {
      const itemInCart = updatedSelected[i];
      if (updatedSelected[index].id === itemInCart.id) {
        updatedSelected[index].quantity -= 1;
        setSelected(updatedSelected);
        if (itemInCart.quantity < 1) {
          handleRemoveItemFromCart(index);
          setSelected(cartItems);
        }
      }
    });
  };

  const calculateTotal = () => {
    return selected.reduce((total, item) => {
      return total + item.quantity * item.selling_price;
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);

      // Get current user
      //temporary removed 2 21 2025
      // const {
      //   data: { user },
      //   error: userError,
      // } = await supabase.auth.getUser();

      // if (userError || !user) {
      //   throw new Error("Please login to place an order");
      // }

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: "sampleID01",
          total_amount: calculateTotal(),
          status: "pending",
        })
        .select()
        .single();

      if (orderError || !order) {
        throw new Error("Failed to create order");
      }

      // Create order items
      const orderItems = selected.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.selling_price,
        subtotal: item.quantity * item.selling_price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        throw new Error("Failed to create order items");
      }

      toast.success("Order placed successfully!");
      // Clear cart (you'll need to implement this function)
      handleRemoveItemFromCart(-1); // Assuming -1 clears all items
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to place order",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative h-fit rounded-sm border border-stroke bg-white pt-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Cart
        <span className="block text-xs opacity-50">
          {selected.length} items in cart
        </span>
      </h4>

      <div className="grid grid-rows-3 gap-4">
        <div className="row-span-2 flex-1 overflow-y-auto">
          {selected.map((chat, key) => (
            <li
              key={chat.id}
              className="group flex flex-col space-y-3 p-3 text-left sm:flex-row sm:space-x-1 sm:space-y-0"
            >
              <div className="relative flex flex-1 flex-col justify-between">
                <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                  <div className="pr-8 sm:pr-5">
                    <p className="text-base font-semibold uppercase">
                      {chat.name}
                    </p>
                    <p className="text-gray-400 mx-0 mb-0 mt-1 text-sm">
                      <span className="block">Exp: {chat.expiry_date}</span>
                      <span className="block">
                        Sub: {chat.quantity * chat.selling_price} x{" "}
                        {chat.quantity}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                    <p className="text-gray-400 mx-0 mb-0 mt-1 text-sm">
                      Php {chat.selling_price}
                    </p>
                  </div>
                </div>

                <div className="absolute right-0 top-0 hidden group-hover:flex sm:bottom-0 sm:top-auto">
                  <div className="input input-xs input-ghost flex items-center">
                    <button
                      className="bg-secondary px-5"
                      onClick={() => handleDecrement(key)}
                    >
                      -
                    </button>
                    <input
                      className="w-7 border text-center"
                      value={chat.quantity}
                      readOnly
                    />
                    <button
                      className="bg-secondary px-5"
                      onClick={() => handleIncrement(key)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>

        <div className="h-fit self-end">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-100 w-full rounded-l p-6">
              <hr className="my-4" />
              <div className="flex items-center justify-between">
                <span className="font-bold">Total:</span>
                <span className="font-bold">Php: {calculateTotal()}</span>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  className={`btn btn-success w-full ${isProcessing ? "cursor-not-allowed opacity-50" : ""}`}
                  onClick={handleCheckout}
                  disabled={isProcessing || selected.length === 0}
                >
                  {isProcessing ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
