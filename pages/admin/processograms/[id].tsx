import withAuth from "@/components/HOC/with-auth";
import DefaultLayout from "@/components/layouts";
import { AdminLayout } from "@/components/admin/admin-layout";
import { useRouter } from "next/router";
import { ProcessogramDetail } from "pages-components/admin/dashboard/ProcessogramDetail";

const AdminElementPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <DefaultLayout>
      <AdminLayout>
        {!!id && <ProcessogramDetail processogram_id={String(id)} />}
      </AdminLayout>
    </DefaultLayout>
  );
};

export default withAuth(AdminElementPage);
