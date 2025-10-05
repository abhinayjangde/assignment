import DashboardHeader from "@/components/DashboardHeader";

const SellerPage = () => {
  return (
    <>
      <DashboardHeader title="Sellers" />
      <div>
        <h1 className="m-4 text-2xl font-bold">Seller Page</h1>
        <p className="m-4 text-lg">
          This is the seller page of the application.
        </p>
      </div>
    </>
  );
};

export default SellerPage;
