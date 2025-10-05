import ProductCard from "@/components/ProductCard";
import { products } from "@/http/api";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const query = useQuery({ queryKey: ["products"], queryFn: products });
  const allProducts = query.data?.data.data || [];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {allProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
