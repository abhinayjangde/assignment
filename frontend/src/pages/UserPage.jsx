import DashboardHeader from "@/components/DashboardHeader";

const UserPage = () => {
  return (
    <>
      <DashboardHeader title="Users" />
      <div>
        <h1 className="m-4 text-2xl font-bold">User Page</h1>
        <p className="m-4 text-lg">This is the user page of the application.</p>
      </div>
    </>
  );
};

export default UserPage;
