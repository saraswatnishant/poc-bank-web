import { Tabs, Tab } from "@mui/material";
import { ActionBarType } from "../../utility/types";
const ActionBar = ({ value, tabs, handleTabChange }: ActionBarType) => {
  return (
    <Tabs
      value={value.toLocaleLowerCase()}
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="Action Bar"
      onChange={handleTabChange}
    >
      {tabs.map((tab) => (
        <Tab key={tab.name} value={tab.value} label={tab.name} />
      ))}
    </Tabs>
  );
};

export default ActionBar;
