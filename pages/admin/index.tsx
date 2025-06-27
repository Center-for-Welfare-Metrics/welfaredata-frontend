import withAuth from "@/components/HOC/with-auth";
import DefaultLayout from "@/components/layouts";
import { AdminLayout } from "@/components/admin/admin-layout";
import { ListSpecies } from "pages-components/admin/dashboard/ListSpecies";

const AdminIndex = () => {
  return (
    <DefaultLayout>
      <AdminLayout>
        <ListSpecies />
      </AdminLayout>
    </DefaultLayout>
  );
};

export default withAuth(AdminIndex);
