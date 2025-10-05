import DashboardHeader from "@/components/DashboardHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store";
import { IconUsers, IconShoppingCart, IconChartBar } from "@tabler/icons-react";

const DashboardPage = () => {
  const { role } = useAuthStore((state) => state);

  const adminCards = [
    {
      title: "Total Users",
      icon: IconUsers,
      description: "Manage all registered users",
      link: "/admin/users",
    },
    {
      title: "Total Sellers",
      icon: IconShoppingCart,
      description: "View and manage sellers",
      link: "/admin/sellers",
    },
    {
      title: "Payments",
      icon: IconChartBar,
      description: "Track payment transactions",
      link: "/admin/payments",
    },
  ];

  const sellerCards = [
    {
      title: "My Products",
      icon: IconShoppingCart,
      description: "View and manage your products",
      link: "/seller/products",
    },
  ];

  const cards = role === "admin" ? adminCards : sellerCards;

  return (
    <>
      <DashboardHeader
        title={`${role === "admin" ? "Admin" : "Seller"} Dashboard`}
      />

      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold capitalize">Welcome, {role}!</h2>
          <p className="text-muted-foreground mt-2">
            {role === "admin"
              ? "Manage your application from this dashboard"
              : "Manage your products and inventory from here"}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <a href={card.link}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <card.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {role === "admin" ? (
                  <>
                    <li>• View and manage all users in the system</li>
                    <li>• Monitor seller activities and product listings</li>
                    <li>• Track payment transactions and revenue</li>
                    <li>• Use the sidebar to navigate between sections</li>
                  </>
                ) : (
                  <>
                    <li>• Add new products using the "Add Product" tab</li>
                    <li>• View all your listed products in "My Products"</li>
                    <li>• Update product information as needed</li>
                    <li>• Monitor your product performance</li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
