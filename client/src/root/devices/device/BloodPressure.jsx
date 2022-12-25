import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore, Favorite } from "@mui/icons-material";
import { useState } from "react";
import { DateBarChart } from "./CustomCharts";

export default function BloodPressure({ bloodPressures }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClick = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ bgcolor: "#fafafa" }}>
        <ListItemIcon>
          <Favorite />
        </ListItemIcon>
        <ListItemText primary={"Huyết áp"} />
        {!isCollapsed ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
        {!bloodPressures.length && (
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
        <DateBarChart
          data={bloodPressures.map((bloodPressure) => {
            const {
              value: { systolic, diastolic },
              timestamp,
            } = bloodPressure;
            const date = new Date(timestamp);
            return {
              label: date.toLocaleDateString("vi-VN"),
              date: date,
              systolic,
              diastolic,
            };
          })}
          title={"Đồ thị huyết áp"}
          yAxisLabel={"mmHg"}
          dataKey1={"systolic"}
          dataKey2={"diastolic"}
          legendTitle1={"Huyết áp tâm thu"}
          legendTitle2={"Huyết áp tâm trương"}
        />
      </Collapse>
    </>
  );
}
