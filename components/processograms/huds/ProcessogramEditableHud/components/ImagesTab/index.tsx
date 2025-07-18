import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

import { ProcessogramHierarchy } from "types/processogram";
import { ThemeColors } from "theme/globalStyle";

import { SearchImagesTab } from "./components/Tabs/SearchImages";
import { Gallery } from "./components/Tabs/Gallery";

type Props = {
  hierarchy: ProcessogramHierarchy[];
  processogramId: string;
  currentElement: string;
};

export const ImagesTab = ({
  hierarchy,
  processogramId,
  currentElement,
}: Props) => {
  const [tab, setTab] = useState<"search" | "gallery">("search");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue as "search" | "gallery");
  };

  return (
    <Box height="100%">
      <Tabs
        value={tab}
        onChange={handleTabChange}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: ThemeColors.blue,
          },
          "& .MuiTab-root": {
            color: ThemeColors.gray,
            "&.Mui-selected": {
              color: ThemeColors.blue,
            },
          },
        }}
      >
        <Tab label="Search Images" value="search" />
        <Tab label="Gallery" value="gallery" />
      </Tabs>

      <Box sx={{ height: "calc(100% - 50px)" }}>
        {tab === "search" && (
          <SearchImagesTab
            currentElement={currentElement}
            hierarchy={hierarchy}
            processogramId={processogramId}
          />
        )}
        {tab === "gallery" && (
          <Gallery
            currentElement={currentElement}
            processogramId={processogramId}
          />
        )}
      </Box>
    </Box>
  );
};
