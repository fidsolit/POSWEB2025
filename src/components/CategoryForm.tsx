"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/libs/supabase";

interface CategoryFormProps {
  onCategoryAdded: () => void;
}

const CategoryForm = ({ onCategoryAdded }: CategoryFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    //  try {
    //   const { error } = await supabase.from("products").insert({
    //     name: formData.name,
    //     cost_price: parseFloat(formData.costPrice),
    //     selling_price: parseFloat(formData.sellingPrice),
    //     quantity_in_stock: parseInt(formData.quantityInStock),
    //     expiry_date: formData.expiryDate,
    //     category_id: formData.categoryId || null, // Allow null if no category selected
    //   });

    try {
      const { error } = await supabase
        .from("categories")
        .insert({ name: categoryName });

      if (error) throw error;

      setCategoryName("");
      setIsOpen(false);
      onCategoryAdded();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category. Please try again.");
    } finally {
      setLoading(false);
      console.log("Category added successfully");
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-sm text-primary hover:underline"
      >
        + Add New Category
      </button>
    );
  }

  return (
    <div className="mt-2 rounded-sm border border-stroke p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="mb-2.5 block text-black dark:text-white"
            htmlFor="categoryName"
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
