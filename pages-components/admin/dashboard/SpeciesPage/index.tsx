import Link from "next/link";
import { useRouter } from "next/router";

import { AddButton } from "@/components/AddButton";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { CtaCreate } from "@/components/CtaCreate";
import { useGetSpecieById } from "@/api/react-query/species/useGetSpecies";
import { Edit, RefreshCw, Trash } from "react-feather";
import { ThemeColors } from "theme/globalStyle";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { useGetProductionModules } from "@/api/react-query/production-modules/useGetProductionModules";
import { ProductionModuleCard } from "@/components/Cards/ProductionModuleCard";
import { ProductionModuleCardSkeleton } from "@/components/Cards/ProductionModuleCard/skeleton";
import { useSetCreateProductionModuleModal } from "modals/CreateProductionModuleModal/hooks";
import { useSetUpdateSpecieModal } from "modals/UpdateSpecieModal/hooks";
import { useSetDeleteSpecieModal } from "modals/DeleteSpecieModal/hooks";

type Props = {
  specie_id: string;
};

export const SpeciesPage = ({ specie_id }: Props) => {
  const {
    data: productionModules,
    isLoading,
    refetch,
    isFetching,
  } = useGetProductionModules({
    specie_id,
  });

  const router = useRouter();

  const { data: specie } = useGetSpecieById({
    specie_id,
  });

  const setCreateProductionModule = useSetCreateProductionModuleModal();

  const productionModulesList = productionModules ?? [];

  const hasProductionModules = productionModulesList.length > 0;

  const createProductionModule = () => {
    if (!specie) return;

    setCreateProductionModule({
      specie_id,
    });
  };

  const handleRefresh = () => {
    refetch();
  };

  const setUpdateSpecieModal = useSetUpdateSpecieModal();

  const openUpdateSpecieModal = () => {
    if (!specie) return;

    setUpdateSpecieModal({
      specie: {
        _id: specie._id,
        name: specie.name,
        pathname: specie.pathname,
        description: specie.description,
      },
    });
  };

  const setDeleteSpecieModal = useSetDeleteSpecieModal();

  const openDeleteSpecieModal = () => {
    if (!specie) return;

    setDeleteSpecieModal({
      specieId: specie._id,
      specieName: specie.name,
      onDelete: () => {
        router.push("/admin");
      },
    });
  };

  return (
    <FlexColumn
      justify="flex-start"
      align="flex-start"
      width="100%"
      px={4}
      mt={2}
    >
      <FlexColumn>
        <FlexRow justify="flex-start">
          <Link href="/admin">
            <Text variant="h2">Dashboard</Text>
          </Link>
          <Text variant="h2">{">"}</Text>
          <Text variant="h2">{specie?.name ?? "--"}</Text>
          <IconWrapper>
            <Edit
              size={18}
              color={ThemeColors.white}
              cursor="pointer"
              onClick={openUpdateSpecieModal}
            />
          </IconWrapper>
          <IconWrapper>
            <Trash
              size={18}
              color={ThemeColors.red}
              cursor="pointer"
              onClick={openDeleteSpecieModal}
            />
          </IconWrapper>
        </FlexRow>
        {specie && (
          <Text variant="body1">
            Visit page:{" "}
            <Link
              href={{
                pathname: "/processograms/[specie]",
                query: {
                  specie: specie.pathname,
                },
              }}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "underline",
                color: "#0070f3",
              }}
            >
              {`/processograms/${specie?.pathname}`}
            </Link>
          </Text>
        )}
      </FlexColumn>
      <FlexColumn align="flex-start" width="100%" mt={2}>
        <FlexRow>
          <Text>
            Production Modules{" "}
            {hasProductionModules ? `(${productionModulesList.length})` : ``}
          </Text>
          {!!specie && <AddButton onClick={createProductionModule} />}
          {isFetching ? (
            <ClipLoader size={18} color={ThemeColors.white} loading />
          ) : (
            <IconWrapper>
              <RefreshCw
                color={ThemeColors.white}
                cursor="pointer"
                size={18}
                onClick={handleRefresh}
              />
            </IconWrapper>
          )}
        </FlexRow>

        {isLoading ? (
          <FlexRow mt={1} gap={1} flexWrap="wrap" justify="flex-start">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProductionModuleCardSkeleton key={index} />
            ))}
          </FlexRow>
        ) : (
          <>
            {hasProductionModules ? (
              <FlexRow mt={1} gap={1} flexWrap="wrap" justify="flex-start">
                {productionModulesList.map((productionModule) => (
                  <ProductionModuleCard
                    key={productionModule._id}
                    _id={productionModule._id}
                    description={productionModule.description}
                    specie_id={productionModule.specie_id}
                    name={productionModule.name}
                    image_url=""
                  />
                ))}
              </FlexRow>
            ) : (
              <>
                {!!specie && (
                  <CtaCreate onClick={createProductionModule}>
                    <Text>
                      No production modules found. <br />
                      Click here to create your first production module!
                    </Text>
                  </CtaCreate>
                )}
              </>
            )}
          </>
        )}
      </FlexColumn>
    </FlexColumn>
  );
};

const IconWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }
`;
