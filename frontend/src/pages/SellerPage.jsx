import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { addProduct, products } from "@/http/api";
import ProductCard from "@/components/ProductCard";
import "react-toastify/dist/ReactToastify.css";

const SellerPage = () => {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  const query = useQuery({ queryKey: ["products"], queryFn: products });
  const myProducts = query.data?.data.data || [];

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      if (!data.data.success) {
        toast.error(data.data.message || "Failed to add product");
        return;
      }
      toast.success("Product added successfully!");
      // Reset form
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      priceRef.current.value = "";
      categoryRef.current.value = "";
      setImageFile(null);
      // Reset file input
      document.getElementById("image").value = "";
      query.refetch(); // Refresh product list
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add product");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("category", categoryRef.current.value);
    if (imageFile) {
      formData.append("imageURL", imageFile);
    }

    mutation.mutate(formData);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <DashboardHeader title="Seller Dashboard" />

      <div className="p-6">
        <Tabs defaultValue="add-product" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
            <TabsTrigger value="my-products">My Products</TabsTrigger>
          </TabsList>

          {/* Add Product Tab */}
          <TabsContent value="add-product" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>
                  Fill in the details to add a new product to your inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      ref={nameRef}
                      id="name"
                      type="text"
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="description">Description *</Label>
                    <Input
                      ref={descriptionRef}
                      id="description"
                      type="text"
                      placeholder="Enter product description"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      ref={priceRef}
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Enter price"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="category">Category *</Label>
                    <select
                      ref={categoryRef}
                      id="category"
                      className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Books">Books</option>
                      <option value="Home & Garden">Home & Garden</option>
                      <option value="Sports">Sports</option>
                      <option value="Toys">Toys</option>
                      <option value="Health & Beauty">Health & Beauty</option>
                      <option value="Food & Beverages">Food & Beverages</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="image">Product Image *</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      required
                    />
                    {imageFile && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {imageFile.name}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full"
                  >
                    {mutation.isPending ? "Adding Product..." : "Add Product"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Products Tab */}
          <TabsContent value="my-products" className="mt-6">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  My Products ({myProducts.length})
                </h2>
                <Button variant="outline" onClick={() => query.refetch()}>
                  Refresh
                </Button>
              </div>

              {query.isLoading && <p>Loading products...</p>}
              {query.isError && (
                <p className="text-red-500">Error loading products</p>
              )}

              {!query.isLoading &&
                !query.isError &&
                myProducts.length === 0 && (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">
                      No products added yet. Add your first product to get
                      started!
                    </p>
                  </Card>
                )}

              {!query.isLoading && !query.isError && myProducts.length > 0 && (
                <div className="flex flex-wrap -m-4">
                  {myProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default SellerPage;
