import DashboardHeader from "@/components/DashboardHeader";

const DashboardPage = () => {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <div>
        <h2 className="m-4 text-2xl font-bold">Welcome to the Home Page</h2>
        <p className="m-4 text-lg">
          This is the home page of the application. Use the sidebar to navigate
          through different sections.
        </p>
      </div>
    </>
  );
};

export default DashboardPage;
