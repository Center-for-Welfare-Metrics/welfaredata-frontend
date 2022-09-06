import Modal, { IModal } from "@/components/common/modal";
import { IUser } from "@/context/user";

import { FormEvent, useContext, useEffect, useState } from "react";
import { Container, FormHeader } from "./users-styled";

import FormInput from "@/components/common/inputs/form-input";

import CheckPasswordStrength from "check-password-strength";
import StrongPasswordBar from "@/components/miscellaneous/strong-password-bar";
import {
  DangerButton,
  SuccessButton,
  WarningButton,
} from "@/components/common/buttons/default-button-styled";

import adminUsersApi from "queries/admin/users";

import toast from "react-hot-toast";
import { ActionButtons } from "@/components/common/modal/modal-styled";
import { IRole } from "@/context/roles";
import BoxSelect from "@/components/common/selects/box-select";
import PrivilegesContext from "@/context/privileges_context";

const Validator = require("validatorjs");

interface UserModal extends IModal {
  user?: IUser;
  onSuccess(): void;
}

const UserModal = ({ onClose, isOpen, user, clear, onSuccess }: UserModal) => {
  const { roles } = useContext(PrivilegesContext);

  const [_id, setId] = useState(undefined);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [userRole, setUserRole] = useState<IRole>(null);

  const [password, setPassword] = useState("");

  const [password_confirmation, setPasswordConfirmation] = useState("");

  const [error, setError] = useState<any>({});

  const [passwordStrength, setPasswordStrength] = useState("");

  const { onFetch, setOnFetch } = useContext(PrivilegesContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setUserRole(user.role);
      setId(user?._id);
    }
  }, [user]);

  useEffect(() => {
    if (password) {
      setPasswordStrength(CheckPasswordStrength(password).value);
    } else {
      setPasswordStrength("");
    }
  }, [password]);

  const hasUser = () => {
    return _id !== undefined;
  };

  const localClear = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setError({});
    setUserRole(null);
    setId(undefined);
    if (clear) clear();
  };

  const create = () => {
    if (passwordStrength === "Weak") {
      setError({ password: "Password too weak!" });
    } else {
      let validation = new Validator(
        { name, email, password, password_confirmation, role: userRole?._id },
        {
          email: "required|email",
          password: "min:6|confirmed|max:32|required",
          name: "required",
          role: "required",
        }
      );

      validation.passes(() => {
        setOnFetch(true);
        adminUsersApi
          .create({
            name,
            email,
            password,
            password_confirmation,
            role: userRole?._id,
          })
          .then(() => {
            setOnFetch(false);
            toast.success("User created successfully!");
            onSuccess();
            onClose();
          })
          .catch((error) => {
            console.error(error);
          });
      });

      validation.fails(() => {
        setError(validation.errors.errors);
      });
    }
  };

  const changeUserRole = (role: IRole) => {
    if (userRole && userRole?._id === role?._id) {
      setUserRole(null);
    } else {
      setUserRole(role);
    }
  };

  const update = () => {
    setOnFetch(true);
    adminUsersApi
      .update(_id, {
        role: userRole?._id,
      })
      .then(() => {
        setOnFetch(false);
        toast.success("User updated successfully!");
        onSuccess();
        onClose();
      });
  };

  const successClick = (event: FormEvent) => {
    event.preventDefault();
    if (hasUser()) {
      update();
    } else {
      create();
    }
  };

  return (
    <Modal
      overflowY={hasUser() ? "hidden" : "auto"}
      onClose={onClose}
      isOpen={isOpen}
      clear={localClear}
    >
      <form method="post" onSubmit={successClick}>
        <Container>
          <FormHeader>Role</FormHeader>
          <BoxSelect
            value={userRole}
            options={roles}
            prepare={{
              key: "_id",
              render: "name",
            }}
            onChoose={changeUserRole}
            error={error.role}
          />
          <FormHeader>Personal Informations</FormHeader>
          <FormInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error.name}
            required
            name="name"
            disabled={hasUser()}
          />
          <FormHeader>Account Informations</FormHeader>
          <FormInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error.email}
            required
            name="email"
            disabled={hasUser()}
          />
          {!hasUser() && (
            <>
              <FormInput
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error.password}
                required
                name="password"
                type="password"
              />
              <StrongPasswordBar strength={passwordStrength} />
              <FormInput
                label="Password Confirmation"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                error={error.password_confirmation}
                name="password_confirmation"
                type="password"
              />
            </>
          )}
          <ActionButtons>
            <DangerButton type="button" onClick={onClose}>
              Cancel
            </DangerButton>
            {hasUser() ? (
              <WarningButton disabled={onFetch} load={onFetch} type="submit">
                Update User
              </WarningButton>
            ) : (
              <SuccessButton disabled={onFetch} load={onFetch} type="submit">
                Create User
              </SuccessButton>
            )}
          </ActionButtons>
        </Container>
      </form>
    </Modal>
  );
};

export default UserModal;
