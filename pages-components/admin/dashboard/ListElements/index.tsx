import Link from "next/link";

import { AddButton } from "@/components/AddButton";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { useGetElements } from "@/api/react-query/svg-elements/useGetSvgElements";
import { ElementCard } from "@/components/Cards/ElementCard";
import { ElementCardSkeleton } from "@/components/Cards/ElementCard/skeleton";
import { CtaCreate } from "@/components/CtaCreate";
import { useGetSpecieById } from "@/api/react-query/species/useGetSpecies";
import { useSetCreateElementModal } from "modals/CreateElementModal/hooks";
import { Info, RefreshCw } from "react-feather";
import { ThemeColors } from "theme/globalStyle";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { useSetSpecieDetailsModal } from "modals/SpecieDetailsModal/hooks";

type Props = {
  specie_id: string;
};

export const ListElements = ({ specie_id }: Props) => {
  const {
    data: elements,
    isLoading,
    refetch,
    isFetching,
  } = useGetElements({
    specie_id,
  });

  const { data: specie } = useGetSpecieById({
    specie_id,
  });

  const setCreateElement = useSetCreateElementModal();

  const elementsList = elements ?? [];

  const hasElements = elementsList.length > 0;

  const createElement = () => {
    if (!specie) return;

    setCreateElement({
      specie_id,
      pathname: specie.pathname,
    });
  };

  const handleRefresh = () => {
    refetch();
  };

  const setSpecieDetailsModal = useSetSpecieDetailsModal();

  const openElementDetailsModal = () => {
    if (!specie) return;

    setSpecieDetailsModal({
      specie: {
        description: specie.description,
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
            <Text variant="h2">Species</Text>
          </Link>
          <Text variant="h2">{">"}</Text>
          <Text variant="h2">{specie?.name ?? "--"}</Text>
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
          <Text>Elements {hasElements ? `(${elementsList.length})` : ``}</Text>
          {!!specie && <AddButton onClick={createElement} />}
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
          <IconWrapper>
            <Info
              size={18}
              color={ThemeColors.white}
              cursor="pointer"
              onClick={openElementDetailsModal}
            />
          </IconWrapper>
        </FlexRow>

        {isLoading ? (
          <FlexRow mt={1} gap={1} flexWrap="wrap" justify="flex-start">
            {Array.from({ length: 3 }).map((_, index) => (
              <ElementCardSkeleton key={index} />
            ))}
          </FlexRow>
        ) : (
          <>
            {hasElements ? (
              <FlexRow mt={1} gap={1} flexWrap="wrap" justify="flex-start">
                {elementsList.map((element) => (
                  <ElementCard
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
                {!!specie && (
                  <CtaCreate onClick={createElement}>
                    <Text>
                      No elements found. <br />
                      Click here to create your first element!
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
