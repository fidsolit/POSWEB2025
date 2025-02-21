"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { supabase } from "@/libs/supabase";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import CategoryForm from "@/components/CategoryForm";

const AddStocksPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [formData, setFormData] = useState({
    name: "",
    costPrice: "",
    sellingPrice: "",
    quantityInStock: "",
    expiryDate: "",
    categoryId: "",
  });

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("name");

    if (data) {
      setCategories(data);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("products").insert({
        name: formData.name,
        cost_price: parseFloat(formData.costPrice),
        selling_price: parseFloat(formData.sellingPrice),
        quantity_in_stock: parseInt(formData.quantityInStock),
        expiry_date: formData.expiryDate,
        // category_id: formData.categoryId || null, // Allow null if no category selected
        category_id: "6345b5a1-650e-413f-9e6f-3d720f4d9a60",
      });

      if (error) throw error;

      router.push("/sales"); // Redirect to products page after successful creation
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="New Stock" />

        <div className="grid-cols- grid gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Product Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="name"
                      >
                        Product Name
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="costPrice"
                      >
                        Cost Price
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name="costPrice"
                        id="costPrice"
                        value={formData.costPrice}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="sellingPrice"
                    >
                      Selling Price
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                      name="sellingPrice"
                      id="sellingPrice"
                      value={formData.sellingPrice}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="quantityInStock"
                    >
                      Quantity in Stock
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                      name="quantityInStock"
                      id="quantityInStock"
                      value={formData.quantityInStock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="expiryDate"
                    >
                      Expiry Date
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="date"
                      name="expiryDate"
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-5.5">
                    <div className="mb-3 flex items-center justify-between">
                      <label
                        className="block text-sm font-medium text-black dark:text-white"
                        htmlFor="categoryId"
                      >
                        Category
                      </label>
                      <CategoryForm onCategoryAdded={fetchCategories} />
                    </div>
                    <select
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="categoryId"
                      id="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      // required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                      onClick={() => router.push("/sales")}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90 disabled:opacity-50"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddStocksPage;
