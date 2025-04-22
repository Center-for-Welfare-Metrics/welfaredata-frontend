import withAuth from "@/components/HOC/with-auth";
import DefaultLayout from "@/components/layouts";
import { AdminLayout } from "@/components/admin/admin-layout";
import styled from "styled-components";
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

const Container = styled.div`
  padding: 2rem;
`;

export default withAuth(AdminIndex);
