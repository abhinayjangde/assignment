import DashboardHeader from "@/components/DashboardHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getAllSellers } from "@/http/api";
import { Skeleton } from "@/components/ui/skeleton";

const AdminSellerPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sellers"],
    queryFn: getAllSellers,
  });

  const sellers = data?.data?.data || [];

  return (
    <>
      <DashboardHeader title="Sellers Management" />

      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Sellers ({sellers.length})</CardTitle>
            <CardDescription>
              Manage and view all registered sellers in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}

            {isError && (
              <p className="text-center text-red-500 py-4">
                Error loading sellers
              </p>
            )}

            {!isLoading && !isError && sellers.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No sellers found
              </p>
            )}

            {!isLoading && !isError && sellers.length > 0 && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sellers.map((seller) => (
                      <TableRow key={seller._id}>
                        <TableCell className="font-medium">
                          {seller.name}
                        </TableCell>
                        <TableCell>{seller.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {seller.productCount || 0} products
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {seller.isVerified ? (
                            <Badge variant="success" className="bg-green-500">
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Not Verified</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(seller.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminSellerPage;
