"use client";
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
    console.log("cartItems bye fede: ", cartItems);
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

      // Get current user session
      // const {
      //   data: { session },
      //   error: sessionError,
      // } = await supabase.auth.getSession();

      // if (sessionError || !session) {
      //   throw new Error("Please login to place an order");
      // }

      // const user = session.user;

      // Start a try-catch block for the entire transaction
      try {
        // Create order
        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert({
            user_id: "6345b5a1-650e-413f-9e6f-3d710f4d9a60",
            total_amount: calculateTotal(),
            status: "pending",
          })
          .select()
          .single();

        if (orderError) {
          console.error("Order creation error:", orderError);
          throw new Error("Failed to create order");
        }

        if (!order) {
          throw new Error("No order was created");
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
          console.error("Order items creation error:", itemsError);
          throw new Error("Failed to create order items");
        }

        // Update product quantities
        for (const item of selected) {
          const { data: product, error: getProductError } = await supabase
            .from("products")
            .select("quantity_in_stock")
            .eq("id", item.id)
            .single();

          if (getProductError || !product) {
            console.error("Error getting product:", getProductError);
            continue;
          }

          const newQuantity = product.quantity_in_stock - item.quantity;
          if (newQuantity < 0) {
            throw new Error(`Insufficient stock for product: ${item.name}`);
          }

          const { error: updateError } = await supabase
            .from("products")
            .update({ quantity_in_stock: newQuantity })
            .eq("id", item.id);

          if (updateError) {
            console.error("Product update error:", updateError);
            throw new Error(`Failed to update stock for product: ${item.name}`);
          }
        }

        // If we reach here, everything succeeded
        toast.success("Order placed successfully!");
        handleRemoveItemFromCart(-1); // Clear cart
      } catch (transactionError) {
        // Log the error and re-throw it to be caught by the outer catch block
        console.error("Transaction error:", transactionError);
        throw transactionError;
      }
    } catch (error) {
      console.error("Checkout error:", error);
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
