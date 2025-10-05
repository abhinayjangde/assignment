import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { products, profile } from "@/http/api";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const { setRole } = useAuthStore((state) => state);
  const profileQuery = useQuery({ queryKey: ["profile"], queryFn: profile });
  const query = useQuery({ queryKey: ["products"], queryFn: products });
  const allProducts = query.data?.data.data || [];
  // setRole(profileQuery.data.data.user);
  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-3xl font-bold my-5 uppercase">All products</h1>
          {query.isLoading && <p>Loading products...</p>}
          {query.isError && <p>Error loading products</p>}
          <div className="flex flex-wrap -m-4">
            {allProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
