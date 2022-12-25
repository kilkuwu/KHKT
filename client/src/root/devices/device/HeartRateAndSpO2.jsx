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
  MonitorHeart,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useState } from "react";
import { DoubleAxisChart } from "./CustomCharts";

export default function HeartRateAndSpO2({ hrSpO2s }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [chartOpen, setChartOpen] = useState(false);

  const { heartRate = 0, spO2 = 0 } = hrSpO2s[hrSpO2s.length - 1] || {};

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
          <MonitorHeart />
        </ListItemIcon>
        <ListItemText primary={"Nhịp tim và SpO2"} />
        <Tooltip title="Mở đồ thị">
          <IconButton onClick={handleChartOpen}>
            <BarChartRounded />
          </IconButton>
        </Tooltip>
        {!isCollapsed ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {!hrSpO2s.length && (
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
            <ListItemText primary={heartRate} secondary={"Nhịp tim"} />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary={spO2} secondary={"SpO2"} />
          </ListItem>
        </List>
        <Collapse in={chartOpen} timeout="auto" unmountOnExit>
          <DoubleAxisChart
            data={hrSpO2s}
            title={"Đồ thị nhịp tim và độ bão hòa O2"}
            yAxisLeftLabel={"Nhịp tim (BPM)"}
            yAxisRightLabel={"SpO2 (%)"}
            dataKey1={"heartRate"}
            dataKey2={"spO2"}
            legendTitle1={"Nhịp tim"}
            legendTitle2={"SpO2"}
          />
        </Collapse>
      </Collapse>
    </>
  );
}
