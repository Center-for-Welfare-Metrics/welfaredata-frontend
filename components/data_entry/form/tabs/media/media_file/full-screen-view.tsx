import { Content, InnerContent } from "./full-screen-view-styled";

import { FadedModalBackground } from "@/components/common/modal/modal-styled";

interface IFullScreenView {
  children?: React.ReactNode;
  onClose(evt?: any): void;
  onContextMenu?(evt: any): void;
}

const FullScreenView = ({
  children,
  onClose,
  onContextMenu,
}: IFullScreenView) => {
  return (
    <>
      <Content onClick={(e: any) => e.stopPropagation()}>
        <InnerContent
          onContextMenu={(e: any) => {
            e.stopPropagation();
          }}
        >
          {children}
        </InnerContent>
      </Content>
      <FadedModalBackground
        onContextMenu={onContextMenu}
        isOpen={true}
        onClick={onClose}
      />
    </>
  );
};

export default FullScreenView;
