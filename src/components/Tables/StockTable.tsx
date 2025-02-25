"use client";

import { ProductProp } from "@/types/productProp";
import { useState } from "react";
import ProductEditFormModel from "../Model/ProductEditFormModel";

const StocksTable = ({ productItems }: { productItems: ProductProp[] }) => {
  const [updatedProductItem, setUpdatedProductItem] = useState<ProductProp>();

  const selectItemForEdit = (item: ProductProp) => {
    setUpdatedProductItem(item);
  };
  // console.log("itemsupdated",updatedProductItem, );

  const clearState = () => {
    setUpdatedProductItem(undefined);
  };

  // Function to handle form submission with updated item
  //  const handleSubmit = (event) => {
  //    event.preventDefault();
  //    // Logic to submit the updated item to a URL
  //    console.log("Updated item:", updatedItem);
  //    // Reset updatedItem state after submission
  //    setUpdatedProductItems(null);
  //  };

  //  // Function to delete item by ID
  //  const deleteItemById = (id) => {
  //    // Logic to delete item from productItems array
  //    // For example:
  //    // const updatedItems = productItems.filter(item => item.id !== id);
  //    // setProductItems(updatedItems);
  //    console.log("Item deleted:", id);
  //  };

  // Function to delete a product item by ID
  // const deleteProductItem = (id: string) => {
  //   const updatedItems = updatedProductItems.filter(item => item.id !== id);
  //   setUpdatedProductItems(updatedItems);
  // };

  // Function to handle form submission
  const handleSubmitq = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Submit updatedProductItems to your URL
    console.log("Submitting updated product items:", updatedProductItem);
  };
  return (
    <>
      <ProductEditFormModel
        clearState={clearState}
        product={updatedProductItem}
      />

      <div className="mt-4 flex-1 md:mt-6 2xl:mt-7.5 ">
        <div className="col-span-3 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto ">
              <thead className=" justify-center">
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Product Name
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Cost
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Selling
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Expiry Date
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Quantity
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Category
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              {productItems && (
                <tbody className="justify-center">
                  {productItems.map((item, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="text-lg  capitalize text-black dark:text-white">
                          {item.name}
                        </h5>
                      </td>

                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.cost_price}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.selling_price}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.expiry_date}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          <p
                            className={`${item.quantity_in_stock === 0 && " w-fit animate-pulse rounded bg-danger px-2"}`}
                          >
                            {item.quantity_in_stock}
                          </p>
                        </p>
                      </td>

                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.category_id}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div className={`flex items-center space-x-2`}>
                          <label
                            htmlFor="my_modal_6"
                            className="btn btn-success btn-sm bg-opacity-10 text-success "
                            onClick={() => selectItemForEdit(item)}
                          >
                            Edit
                          </label>

                          <button className="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-medium text-danger">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default StocksTable;
