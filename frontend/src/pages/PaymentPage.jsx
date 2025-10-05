import DashboardHeader from "@/components/DashboardHeader";

const PaymentPage = () => {
  return (
    <>
      <DashboardHeader title="Payments" />
      <div>
        <h1 className="m-4 text-2xl font-bold">Payment Page</h1>
        <p className="m-4 text-lg">
          This is the payment page of the application.
        </p>
      </div>
    </>
  );
};

export default PaymentPage;
