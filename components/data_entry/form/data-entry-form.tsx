import { useContext, useEffect, useState } from "react";
import {
  Container,
  Body,
  Tabs,
  Tab,
  CustomLoader,
  FetchingDiv,
  FetchingTitle,
  Warning,
} from "./data-entry-form-styled";
import BasicTab from "@/components/data_entry/form/tabs/basic";
import MediaTab from "@/components/data_entry/form/tabs/media/media";
import { CommonTabs, DictAlternativeNames } from "@/utils/consts";
import voca from "voca";
import DataEntryContext from "@/context/data-entry";
import { Title } from "@/components/data_entry/form/tabs/tab-commons-styled";
import theme from "theme/schema.json";
import { TabTypes } from "@/utils/enum_types";

import SVG from "react-inlinesvg";
import { SvgPath } from "@/utils/assets_path";
import Modal from "@/components/common/modal";
import ReferenceSettings from "../reference-settings";

const DataEntryForm = () => {
  const [tab, setTab] = useState<TabTypes>("description");

  const [settingsOpen, setSettingsOpen] = useState(false);

  const { contentInformation, specie, onFetch } = useContext(DataEntryContext);

  return (
    <Container>
      <Body load={false}>
        {
          <>
            <div style={{ display: !onFetch ? "block" : "none" }}>
              <Title
                warning={
                  contentInformation?.ref_alternative_name ? true : false
                }
              >
                {voca.titleCase(contentInformation?.levelName || "species")} :{" "}
                {voca.titleCase(
                  contentInformation?.ref_alternative_name ||
                    contentInformation?.ref_name ||
                    DictAlternativeNames[specie?._id]
                )}
                {contentInformation &&
                  contentInformation.levelName !== "production system" && (
                    <SVG
                      src={SvgPath({
                        folder: "minimal-icons",
                        file_name: "settings",
                      })}
                      onClick={() => setSettingsOpen(true)}
                    />
                  )}
              </Title>
              {tab === "description" && <BasicTab />}
              {tab === "media" && <MediaTab />}
            </div>
            <FetchingDiv style={{ display: onFetch ? "flex" : "none" }}>
              <FetchingTitle>Fetching data... Please Wait</FetchingTitle>
              <CustomLoader
                color={theme.default.colors.blue}
                type="ThreeDots"
                height={100}
                width={100}
              />
            </FetchingDiv>
            <Modal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)}>
              <ReferenceSettings />
            </Modal>
          </>
        }
      </Body>
      <Tabs>
        {CommonTabs.map((this_tab) => (
          <Tab
            onClick={() => setTab(this_tab)}
            active={this_tab === tab}
            key={this_tab}
          >
            {voca.capitalize(this_tab)}
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

export default DataEntryForm;
