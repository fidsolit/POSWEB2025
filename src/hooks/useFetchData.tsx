// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/libs/supabase";
// import { ProductProp } from "@/types/productProp";

// const useFetchData = (apiUrl: string): ProductProp[] | null => {
//   // Initialize state to hold the fetched data
//   const [packages, setPackages] = useState<ProductProp[] | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data from the API
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         // Parse the JSON response
//         const data: ProductProp[] = await response.json();
//         // Update state with the fetched data
//         setPackages(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     // Call the fetchData function when the component mounts
//     fetchData();

//     // Cleanup function to cancel the fetch request if component unmounts
//     return () => {
//       // cleanup code here
//     };
//   }, [apiUrl]); // Only re-run the effect if apiUrl changes

//   return packages;
// };

// export default useFetchData;

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabase";
import { ProductProp } from "@/types/productProp";

export default function useFetchData() {
  const [data, setData] = useState<ProductProp[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: products, error } = await supabase
          .from("products")
          .select("*")
          .order("name")
          .returns<ProductProp[]>();

        if (error) throw error;

        // Transform the data to match the ProductProp interface
        const transformedProducts = products.map((product) => ({
          id: product.id,
          name: product.name,
          selling_price: product.selling_price,
          cost_price: product.cost_price,
          quantity_in_stock: product.quantity_in_stock,
          category_id: product.category_id,
          expiry_date: product.expiry_date,
          created_at: product.created_at,
        }));

        setData(transformedProducts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        console.error("Error fetching data fede:", error);
      }
    };

    fetchProducts();
  }, []);

  return data;
}
