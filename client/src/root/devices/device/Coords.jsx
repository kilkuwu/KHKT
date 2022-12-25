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
import { Map, ExpandLess, ExpandMore, LocationOn } from "@mui/icons-material";
import { useState } from "react";
import LeafletMap from "./LeafletMap";

export default function Coords({ coordinates }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [chartOpen, setChartOpen] = useState(false);
  const { coordX = 0, coordY = 0 } = coordinates;

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
          <LocationOn />
        </ListItemIcon>
        <ListItemText primary={"Vị trí"} />
        <Tooltip title="Mở đồ thị">
          <IconButton onClick={handleChartOpen}>
            <Map />
          </IconButton>
        </Tooltip>
        {!isCollapsed ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {!coordinates.coordX && (
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
            <ListItemText primary={coordX} secondary={"Tọa độ X"} />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary={coordY} secondary={"Tọa độ Y"} />
          </ListItem>
        </List>
        <Collapse in={chartOpen} timeout="auto" unmountOnExit>
          <LeafletMap position={[coordX, coordY]} />
        </Collapse>
      </Collapse>
    </>
  );
}
