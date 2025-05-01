import withAuth from "@/components/HOC/with-auth";
import DefaultLayout from "@/components/layouts";
import { AdminLayout } from "@/components/admin/admin-layout";
import { useRouter } from "next/router";
import { SpeciesPage } from "pages-components/admin/dashboard/SpeciesPage";

const AdminSpeciePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <DefaultLayout>
      <AdminLayout>
        {!!id && <SpeciesPage specie_id={String(id)} />}
      </AdminLayout>
    </DefaultLayout>
  );
};

export default withAuth(AdminSpeciePage);
