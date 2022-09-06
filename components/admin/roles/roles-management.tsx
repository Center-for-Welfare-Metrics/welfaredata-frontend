import { DefaultButton } from "@/components/common/buttons/default-button-styled";
import { PrimaryCard } from "@/components/common/cards/cards";
import PrivilegesContext from "@/context/privileges_context";
import { IRole } from "@/context/roles";
import { useContext, useEffect, useState } from "react";
import {
  ManagementTitle,
  ManagementCardDefaultContainer,
} from "../admin-layout";
import RoleCard from "./role-card";
import RoleModal from "./role-modal";
import adminRolesApi from "queries/admin/roles";
import toast from "react-hot-toast";
import Dialog from "@/components/common/dialog/dialog";

const RolesManagement = () => {
  const [roleModalIsOpen, setRoleModalIsOpen] = useState(false);

  const [roleOnEdit, setRoleOnEdit] = useState<IRole>(null);

  const [roleOnDelete, setRoleOnDelete] = useState<IRole>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { roles, fetchRoles, setOnFetch } = useContext(PrivilegesContext);

  useEffect(() => {
    if (roleOnEdit) {
      setRoleModalIsOpen(true);
    }
  }, [roleOnEdit]);

  useEffect(() => {
    if (roleOnDelete) {
      setOpenDeleteDialog(true);
    }
  }, [roleOnDelete]);

  const clearOnModalClose = () => {
    setRoleOnEdit(null);
  };

  const onSuccess = (role: IRole) => {
    setOnFetch(true);
    if (role?._id) {
      adminRolesApi
        .update(role?._id, role)
        .then(() => {
          setOnFetch(false);
          setRoleModalIsOpen(false);
          toast.success("Role updated successfully!");
          fetchRoles();
        })
        .catch(() => {
          toast.error("Something gone wrong");
          setOnFetch(false);
        });
    } else {
      adminRolesApi
        .create(role)
        .then(() => {
          setOnFetch(false);
          setRoleModalIsOpen(false);
          toast.success("Role created successfully!");
          fetchRoles();
        })
        .catch(() => {
          toast.error("Something gone wrong");
          setOnFetch(false);
        });
    }
  };

  const deleteRole = () => {
    adminRolesApi
      .delete(roleOnDelete?._id)
      .then(() => {
        toast.success("Role deleted successfully!");
        fetchRoles();
        setOpenDeleteDialog(false);
      })
      .catch(() => {
        toast.error("Something gone wrong");
        setOpenDeleteDialog(false);
      });
  };

  return (
    <>
      <ManagementCardDefaultContainer>
        <ManagementTitle>Roles</ManagementTitle>
        <PrimaryCard>
          {roles.map((role) => (
            <RoleCard
              onDelete={setRoleOnDelete}
              key={role?._id}
              onClick={setRoleOnEdit}
              role={role}
            />
          ))}
        </PrimaryCard>
        <DefaultButton
          onClick={() => {
            setRoleModalIsOpen(true);
          }}
        >
          new role
        </DefaultButton>
      </ManagementCardDefaultContainer>
      <RoleModal
        onSuccess={onSuccess}
        role={roleOnEdit}
        clear={clearOnModalClose}
        onClose={() => setRoleModalIsOpen(false)}
        isOpen={roleModalIsOpen}
      />
      <Dialog
        isOpen={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        clear={() => setRoleOnDelete(null)}
        onConfirm={deleteRole}
        type="danger"
        title={`Do you really want to remove '${roleOnDelete?.name}' role?`}
        subtitle="This action cannot be undone"
        confirmText="Remove"
      />
    </>
  );
};

export default RolesManagement;
