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
import { getAllUsers } from "@/http/api";
import { Skeleton } from "@/components/ui/skeleton";

const UserPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const users = data?.data?.data || [];

  return (
    <>
      <DashboardHeader title="Users Management" />

      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Users ({users.length})</CardTitle>
            <CardDescription>
              Manage and view all registered users in the system
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
                Error loading users
              </p>
            )}

            {!isLoading && !isError && users.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No users found
              </p>
            )}

            {!isLoading && !isError && users.length > 0 && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.isVerified ? (
                            <Badge variant="success" className="bg-green-500">
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Not Verified</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString(
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

export default UserPage;
