import styled from "styled-components";

type Props = {
  src: string;
  maxHeight?: string;
};

export const ProcessogramStarter = ({ src, maxHeight }: Props) => {
  return (
    <>
      <Image
        src={src}
        style={{
          maxHeight: maxHeight,
        }}
      />
    </>
  );
};

const Image = styled.img`
  width: 100%;
  height: auto;
`;
