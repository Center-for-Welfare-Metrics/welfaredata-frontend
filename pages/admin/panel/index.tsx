import { AdminLayout } from "@/components/admin/admin-layout";
import DefaultLayout from "@/components/layouts";
import { Text } from "@/components/Text";
import { CopyButton } from "@/components/CopyButton";
import UserContext from "@/context/user";
import { useContext } from "react";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { useGetRegistrationCode } from "@/api/react-query/admin/useGetRegistrationCode";
import withAuth from "@/components/HOC/with-auth";

function AdminPanelPage() {
  const { user } = useContext(UserContext);

  const { data } = useGetRegistrationCode(user?.super);

  if (!user?.super)
    return (
      <DefaultLayout>
        <AdminLayout>
          <Text variant="h1">
            You do not have permission to access this page.
          </Text>
        </AdminLayout>
      </DefaultLayout>
    );

  const getRegistrationRoute = () => {
    const host = window.location.host;
    return host + `/register?code=${data?.registrationCode}`;
  };

  return (
    <DefaultLayout>
      <AdminLayout>
        <FlexColumn>
          <Text variant="h1" mt={1}>
            Welcome to the Admin Panel, {user.name.split(" ")[0]}!
          </Text>
          <FlexRow mt={1} justify="flex-start">
            <CopyButton
              buttonStyle="primary"
              onCopy={(uuid) => console.log("Copied UUID:", uuid)}
              content={getRegistrationRoute()}
            >
              Copy Registration Path
            </CopyButton>
            <Text variant="body2">{getRegistrationRoute()}</Text>
          </FlexRow>
        </FlexColumn>
      </AdminLayout>
    </DefaultLayout>
  );
}

export default withAuth(AdminPanelPage);
