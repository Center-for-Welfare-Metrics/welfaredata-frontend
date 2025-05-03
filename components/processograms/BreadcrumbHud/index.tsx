import { FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import useDebounce from "@/utils/hooks/useDebounce";
import { transparentize } from "polished";
import { ChevronRight } from "react-feather";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { ProcessogramHierarchy } from "types/processogram";

type Props = {
  hierarchy: ProcessogramHierarchy[];
  onClick: (id: string) => void;
};

export const BreadcrumbHud = ({ hierarchy, onClick }: Props) => {
  const debouncedHierarchy = useDebounce(hierarchy, 250);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(id);
  };

  return (
    <Container>
      <FlexRow gap={0.25}>
        {debouncedHierarchy.map((item, index, array) => (
          <FlexRow key={item.id} gap={0.25} justify="flex-start">
            {array.length - 1 === index ? (
              <CurrentName>
                <Text variant="body1">{item.name}</Text>
              </CurrentName>
            ) : (
              <ClickableName onClick={handleClick(item.rawId)}>
                <Text variant="body1">{item.name}</Text>
              </ClickableName>
            )}
            {index < debouncedHierarchy.length - 1 && (
              <ChevronRight size={16} color={ThemeColors.white} />
            )}
          </FlexRow>
        ))}
      </FlexRow>
    </Container>
  );
};

const CurrentName = styled.div`
  border-bottom: 1px solid ${ThemeColors.white};
`;

const ClickableName = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  padding: 0;
  &:hover {
    border-bottom: 1px solid ${ThemeColors.white};
  }
`;

const Container = styled.div`
  background-color: ${transparentize(0.4, ThemeColors.black)};
  padding-inline: 1rem;
  padding-block: 0.5rem;
`;
