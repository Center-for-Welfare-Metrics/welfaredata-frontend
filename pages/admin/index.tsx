import { Text } from "@/components/Text";
import { useGetSpecies } from "queries/react-query/species/useGetSpecies";
import { useCreateSpecie } from "queries/react-query/species/useSpecies";
import styled from "styled-components";
import { useState } from "react";
import { Specie } from "types/species";

const AdminIndex = () => {
  const { data: species, isLoading } = useGetSpecies();
  const createSpecieMutation = useCreateSpecie();
  const [newSpecieName, setNewSpecieName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSpecie = async () => {
    if (!newSpecieName.trim()) return;

    const pathname = newSpecieName.toLowerCase().replace(/\s+/g, "-");

    try {
      await createSpecieMutation.mutateAsync({
        body: {
          name: newSpecieName,
          pathname,
        },
      });

      // Reset form and refetch species
      setNewSpecieName("");
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to create specie:", error);
    }
  };

  return (
    <Container>
      <Title>Species Management</Title>
      {isLoading ? (
        <Text>Loading species...</Text>
      ) : (
        <>
          <SpeciesList>
            {species && species.length > 0 ? (
              species.map((specie: Specie) => (
                <SpecieItem key={specie._id}>
                  <SpecieName>{specie.name}</SpecieName>
                  <SpeciePathname>/{specie.pathname}</SpeciePathname>
                </SpecieItem>
              ))
            ) : (
              <Text>No species found</Text>
            )}
            <AddButton onClick={() => setShowAddForm(true)}>
              + Add New Specie
            </AddButton>
          </SpeciesList>

          {showAddForm && (
            <AddForm>
              <FormTitle>Add New Specie</FormTitle>
              <InputGroup>
                <Label>Specie Name</Label>
                <Input
                  type="text"
                  value={newSpecieName}
                  onChange={(e) => setNewSpecieName(e.target.value)}
                  placeholder="Enter specie name"
                />
              </InputGroup>
              <ButtonGroup>
                <CancelButton onClick={() => setShowAddForm(false)}>
                  Cancel
                </CancelButton>
                <SubmitButton
                  onClick={handleAddSpecie}
                  disabled={createSpecieMutation.isLoading}
                >
                  {createSpecieMutation.isLoading ? "Adding..." : "Add Specie"}
                </SubmitButton>
              </ButtonGroup>
            </AddForm>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const SpeciesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const SpecieItem = styled.div`
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SpecieName = styled.div`
  font-weight: 500;
`;

const SpeciePathname = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const AddButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  background-color: #2c7be5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1a68d1;
  }
`;

const AddForm = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  max-width: 600px;
`;

const FormTitle = styled.h3`
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const CancelButton = styled.button`
  padding: 0.6rem 1.5rem;
  background-color: #f8f9fa;
  color: #444;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e9ecef;
  }
`;

const SubmitButton = styled.button`
  padding: 0.6rem 1.5rem;
  background-color: #2c7be5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:disabled {
    background-color: #a0bfea;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #1a68d1;
  }
`;

export default AdminIndex;
