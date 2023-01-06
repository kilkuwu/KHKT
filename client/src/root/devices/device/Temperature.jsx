import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Tooltip,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import {
  BarChartRounded,
  ExpandLess,
  ExpandMore,
  Thermostat,
} from "@mui/icons-material";
import { useState } from "react";
import { DoubleAxisChart } from "./CustomCharts";

export default function Temperature({ temperatures }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [chartOpen, setChartOpen] = useState(false);
  const { ambientTemperature = 0, objectTemperature = 0 } =
    temperatures[temperatures.length - 1] || {};

  const handleClick = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleChartOpen = (e) => {
    e.stopPropagation();
    if (!chartOpen && isCollapsed) setIsCollapsed(false);
    setChartOpen((prev) => !prev);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ bgcolor: "#fafafa" }}>
        <ListItemIcon>
          <Thermostat />
        </ListItemIcon>
        <ListItemText primary={"Chất lượng không khí, nhiệt độ cơ thể"} />
        <Tooltip title="Mở đồ thị">
          <IconButton onClick={handleChartOpen}>
            <BarChartRounded />
          </IconButton>
        </Tooltip>
        {!isCollapsed ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {!temperatures.length && (
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
          <ListItem sx={{ pl: 4 }}>
            <ListItemText
              primary={ambientTemperature}
              secondary={"Chất lượng không khí (PPM)"}
            />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText
              primary={objectTemperature}
              secondary={"Nhiệt độ cơ thể (°C)"}
            />
          </ListItem>
        </List>
        <Collapse in={chartOpen} timeout="auto" unmountOnExit>
          <DoubleAxisChart
            data={temperatures}
            title={"Đồ thị nhiệt độ, chất lượng không khí"}
            yAxisLeftLabel={"Nhiệt độ (°C)"}
            yAxisRightLabel={"Chất lượng không khí (PPM)"}
            dataKey1={"objectTemperature"}
            dataKey2={"ambientTemperature"}
            legendTitle1={"Chất lượng không khí"}
            legendTitle2={"Nhiệt độ cơ thể"}
          />
        </Collapse>
      </Collapse>
    </>
  );
}
