import { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PanelistComponent from "./Panelist";
import Leads from "./Leads";

const Panels = () => {
  const [value, setValue] = useState<string>("panel");
  // Manage tabs
  const tabListData = [
    { value: "panel", label: "Panel" },
    { value: "lead", label: "Leads" },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleTabChange}>
          {tabListData.map((tab, index) => (
            <Tab
              key={index}
              sx={{ textTransform: "capitalize" }}
              label={tab.label}
              value={tab.value}
              defaultValue={"panel"}
            />
          ))}
        </TabList>
      </Box>
      <TabList>
        <TabPanel value="panel" sx={{ px: 0 }}>
          <PanelistComponent />
        </TabPanel>
        <TabPanel value="lead" sx={{ px: 0 }}>
          <Leads />
        </TabPanel>
      </TabList>
    </TabContext>
  );
};

export default Panels;
