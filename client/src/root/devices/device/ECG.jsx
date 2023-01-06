import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore, ShowChart } from "@mui/icons-material";
import { useState } from "react";
import { OneAxisOneLineChart } from "./CustomCharts";

export default function ECG({ ECGs }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  console.log(ECGs);
  const handleClick = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ bgcolor: "#fafafa" }}>
        <ListItemIcon>
          <ShowChart />
        </ListItemIcon>
        <ListItemText primary={"ECG"} />
        {!isCollapsed ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
        {!ECGs.length && (
          <Typography
            align="center"
            color="error"
            variant="h6"
            fontWeight="400"
            mt={1}
          >
            Không có dữ liệu
          </Typography>
        )}
        <OneAxisOneLineChart
          data={ECGs}
          title={"Điện tâm đồ"}
          yAxisLabel={"ECG (mV)"}
          dataKey1={"ECG"}
        />
      </Collapse>
    </>
  );
}
