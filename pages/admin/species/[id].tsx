import withAuth from "@/components/HOC/with-auth";
import DefaultLayout from "@/components/layouts";
import { AdminLayout } from "@/components/admin/admin-layout";
import styled from "styled-components";
import { Text } from "@/components/Text";
import { useRouter } from "next/router";

const AdminSpeciePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <DefaultLayout>
      <AdminLayout>
        <Container>
          <Text>Specie page: {id}</Text>
        </Container>
      </AdminLayout>
    </DefaultLayout>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

export default withAuth(AdminSpeciePage);
