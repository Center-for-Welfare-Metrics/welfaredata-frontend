import ContextMenu from "@/context/context-menu";
import { useContext, useEffect, useState } from "react";
import { Body } from "../../processogram-menu-styled";
// import { needSetInformations, showOnScreen } from '@/utils/processogram'
import { Container, Title } from "./body-styled";
import Thumb from "./thumb";

import { IMedia } from "@/utils/processogram";

const Media = () => {
  const { contextMenu, temporary } = useContext(ContextMenu);

  const [medias, setMedias] = useState<IMedia[]>([]);

  useEffect(() => {
    if (contextMenu.document) {
      // setMedias([...contextMenu.document[getPossibleFieldReference()].medias,...contextMenu.document?.medias])
    } else {
      setMedias(temporary.medias);
    }
  }, []);

  return (
    <Body>
      <Title>
        {/* { voca.capitalize(showOnScreen('name',(contextMenu.document || temporary),getPossibleFieldReference())) } */}
      </Title>
      <Container>
        {medias.map((media) => (
          <Thumb key={media?._id} media={media} />
        ))}
      </Container>
    </Body>
  );
};

export default Media;
