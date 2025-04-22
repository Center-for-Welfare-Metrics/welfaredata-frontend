import withAuth from "@/components/HOC/with-auth";
import DefaultLayout from "@/components/layouts";

const Home = () => {
  return <DefaultLayout />;
};

export default withAuth(Home);
