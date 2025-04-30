import { FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { transparentize } from "polished";
import { ChevronRight } from "react-feather";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { Hierarchy } from "types/element-data";

type Props = {
  hierarchy: Hierarchy;
};

export const BreadcrumbHud = ({ hierarchy }: Props) => {
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <FlexRow gap={0.25}>
        {hierarchy.map((item, index) => (
          <FlexRow key={item.id} gap={0.25} justify="flex-start">
            <ClickableName
              onClick={() => {
                alert(`Clicked on ${item.rawId} | under development`);
              }}
            >
              <Text variant="body1">{item.name}</Text>
            </ClickableName>
            {index < hierarchy.length - 1 && (
              <ChevronRight size={16} color={ThemeColors.white} />
            )}
          </FlexRow>
        ))}
      </FlexRow>
    </Container>
  );
};

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
