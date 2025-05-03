import Link from "next/link";

import { AddButton } from "@/components/AddButton";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { useGetProcessograms } from "@/api/react-query/processograms/useGetProcessograms";
import { CtaCreate } from "@/components/CtaCreate";
import { useSetCreateElementModal } from "modals/CreateProcessogramModal/hooks";
import { RefreshCw } from "react-feather";
import { ThemeColors } from "theme/globalStyle";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { ProcessogramCardSkeleton } from "@/components/Cards/ProcessogramCard/skeleton";
import { ProcessogramCard } from "@/components/Cards/ProcessogramCard";
import { useGetProductionModuleById } from "@/api/react-query/production-modules/useGetProductionModules";

type Props = {
  productionModuleId: string;
};

export const ProductionModulePage = ({ productionModuleId }: Props) => {
  const { data: productionModule } = useGetProductionModuleById({
    production_module_id: productionModuleId,
  });

  const {
    data: processograms,
    isLoading,
    refetch,
    isFetching,
  } = useGetProcessograms({
    production_module_id: productionModuleId,
  });

  const setCreateElement = useSetCreateElementModal();

  const processogramsList = processograms ?? [];

  const hasProcessograms = processogramsList.length > 0;

  const createElement = () => {
    if (!productionModule) return;

    setCreateElement({
      specie_id: productionModule.specie_id,
      pathname: productionModule.specie.pathname,
      production_module_id: productionModuleId,
    });
  };

  const handleRefresh = () => {
    refetch();
  };

  // const setSpecieDetailsModal = useSetSpecieDetailsModal();

  // const openElementDetailsModal = () => {
  //   if (!productionModule) return;

  //   setSpecieDetailsModal({
  //     specie: {
  //       description: specie.description,
  //     },
  //   });
  // };

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
          {!!productionModule ? (
            <Link
              href={{
                pathname: "/admin/species/[id]",
                query: {
                  id: productionModule?.specie_id,
                },
              }}
            >
              <Text variant="h2">{productionModule.specie.name}</Text>
            </Link>
          ) : (
            <Text variant="h2">--</Text>
          )}
          <Text variant="h2">{">"}</Text>
          <Text variant="h2">{productionModule?.name ?? "--"}</Text>
          {/* <IconWrapper>
            <Info
              size={18}
              color={ThemeColors.white}
              cursor="pointer"
              onClick={openElementDetailsModal}
            />
          </IconWrapper> */}
        </FlexRow>
        {/* {productionModule && (
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
        )} */}
      </FlexColumn>
      <FlexColumn align="flex-start" width="100%" mt={2}>
        <FlexRow>
          <Text>
            Processograms{" "}
            {hasProcessograms ? `(${processogramsList.length})` : ``}
          </Text>
          {!!productionModule && <AddButton onClick={createElement} />}
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
              <ProcessogramCardSkeleton key={index} />
            ))}
          </FlexRow>
        ) : (
          <>
            {hasProcessograms ? (
              <FlexRow mt={1} gap={1} flexWrap="wrap" justify="flex-start">
                {processogramsList.map((element) => (
                  <ProcessogramCard
                    key={element._id}
                    _id={element._id}
                    name={element.name}
                    status={element.status}
                    image_url=""
                  />
                ))}
              </FlexRow>
            ) : (
              <>
                {!!productionModule && (
                  <CtaCreate onClick={createElement}>
                    <Text>
                      No processograms found. <br />
                      Click here to upload your first one.
                      {`(Each processogram should represent only one production system!)`}
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
