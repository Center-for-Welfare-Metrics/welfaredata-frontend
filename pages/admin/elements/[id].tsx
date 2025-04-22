import withAuth from "@/components/HOC/with-auth";
import DefaultLayout from "@/components/layouts";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Text } from "@/components/Text";
import { useRouter } from "next/router";
import Link from "next/link";
import { FlexColumn } from "@/components/desing-components/Flex";

const AdminElementPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <DefaultLayout>
      <AdminLayout>
        {!!id && (
          <FlexColumn align="center">
            <Text variant="h2">Page under development</Text>
            <Link href={`/admin`}>
              <Text variant="h2">Go back</Text>
            </Link>
          </FlexColumn>
        )}
      </AdminLayout>
    </DefaultLayout>
  );
};

export default withAuth(AdminElementPage);
