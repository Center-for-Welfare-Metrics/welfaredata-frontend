import Link from "next/link";

import { AddButton } from "@/components/AddButton";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { useGetProcessograms } from "@/api/react-query/processograms/useGetProcessograms";
import { CtaCreate } from "@/components/CtaCreate";
import { useSetCreateElementModal } from "modals/CreateProcessogramModal/hooks";
import { Edit, RefreshCw, Trash } from "react-feather";
import { ThemeColors } from "theme/globalStyle";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { ProcessogramCard } from "@/components/Cards/ProcessogramCard";
import { useGetProductionModuleById } from "@/api/react-query/production-modules/useGetProductionModules";
import { useSetUpdateProductionModuleModal } from "modals/UpdateProductionModuleModal/hooks";
import { useSetDeleteProductionModuleModal } from "modals/DeleteProductionModuleModal/hooks";
import { useRouter } from "next/router";
import { Switch } from "@mui/material";
import { ProcessogramCardSize } from "@/components/Cards/ProcessogramCard/const";
import { CardSkeletonLoading } from "@/components/Cards/components/CardSkeletonLoading";

type Props = {
  productionModuleId: string;
};

export const ProductionModulePage = ({ productionModuleId }: Props) => {
  const { data: productionModule } = useGetProductionModuleById({
    production_module_id: productionModuleId,
  });

  const router = useRouter();

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

  const setUpdateProductionModule = useSetUpdateProductionModuleModal();

  const openUpdateProductionModuleModal = () => {
    if (!productionModule) return;

    setUpdateProductionModule({
      productionModule: {
        _id: productionModule._id,
        name: productionModule.name,
        description: productionModule.description || "",
        specie_id: productionModule.specie_id,
      },
    });
  };

  const setDeleteProductionModule = useSetDeleteProductionModuleModal();

  const openDeleteProductionModuleModal = () => {
    if (!productionModule) return;

    setDeleteProductionModule({
      productionModuleId: productionModule._id,
      productionModuleName: productionModule.name,
      onDelete: () => {
        router.replace({
          pathname: "/admin/species/[id]",
          query: {
            id: productionModule.specie_id,
          },
        });
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
          <IconWrapper>
            <Edit
              size={18}
              color={ThemeColors.white}
              cursor="pointer"
              onClick={openUpdateProductionModuleModal}
            />
          </IconWrapper>
          <IconWrapper>
            <Trash
              size={18}
              color={ThemeColors.red}
              cursor="pointer"
              onClick={openDeleteProductionModuleModal}
            />
          </IconWrapper>
        </FlexRow>
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
              <CardSkeletonLoading
                key={index}
                width={ProcessogramCardSize.width}
                height={ProcessogramCardSize.height}
              />
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
                    description={element.description}
                    production_module_id={element.production_module_id}
                    specie_id={element.specie_id}
                    theme={element.theme}
                    status={element.status}
                    is_published={element.is_published}
                    image_url={element.raster_images?.[element.identifier].src}
                  />
                ))}
              </FlexRow>
            ) : (
              <>
                {!!productionModule && (
                  <CtaCreate
                    onClick={createElement}
                    width={ProcessogramCardSize.width}
                    height={ProcessogramCardSize.height}
                  >
                    <Text>
                      No processograms found. <br />
                      Click here to create your first one.
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
