import withAuth from "@/components/HOC/with-auth";
import DefaultLayout from "@/components/layouts";
import { AdminLayout } from "@/components/admin/admin-layout";
import { useRouter } from "next/router";
import { ListElements } from "pages-components/admin/dashboard/ListElements";

const AdminSpeciePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <DefaultLayout>
      <AdminLayout>
        {!!id && <ListElements specie_id={String(id)} />}
      </AdminLayout>
    </DefaultLayout>
  );
};

export default withAuth(AdminSpeciePage);
