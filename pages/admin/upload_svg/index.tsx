import { AdminLayout } from "@/components/admin/admin-layout";
import DefaultLayout from "@/components/layouts";
import { UploadSvg } from "pages-components/admin/UploadSvg";

const UploadSvgPage = () => {
  return (
    <DefaultLayout>
      <AdminLayout>
        <UploadSvg />
      </AdminLayout>
    </DefaultLayout>
  );
};

export default UploadSvgPage;
