import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Line,
  Tooltip as CTooltip,
  Label,
  BarChart,
  Bar,
} from "recharts";
import { Box, Card, CardContent, Typography } from "@mui/material";

export function DoubleAxisChart({
  data,
  title,
  yAxisLeftLabel,
  yAxisRightLabel,
  legendTitle1,
  legendTitle2,
  dataKey1,
  dataKey2,
}) {
  return (
    <Box
      height={"500px"}
      m={2}
      bgcolor={"#f5f5f5"}
      pb={10}
      pt={2}
      borderRadius={4}
    >
      <Typography
        align="center"
        variant="h6"
        fontWeight={"medium"}
        fontStyle={"italic"}
        py={2}
      >
        {title}
      </Typography>
      <ResponsiveContainer width="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis
            yAxisId="left"
            domain={[
              (dataMin) => Math.floor(dataMin),
              (dataMax) => Math.ceil(dataMax),
            ]}
          >
            <Label
              style={{ textAnchor: "middle", fontStyle: "italic" }}
              position={"insideLeft"}
              angle={-90}
              value={yAxisLeftLabel}
            />
          </YAxis>
          <YAxis
            yAxisId="right"
            domain={[
              (dataMin) => Math.floor(dataMin),
              (dataMax) => Math.ceil(dataMax),
            ]}
            orientation="right"
          >
            <Label
              style={{ textAnchor: "middle", fontStyle: "italic" }}
              position={"insideRight"}
              angle={90}
              value={yAxisRightLabel}
            />
          </YAxis>
          <CTooltip />
          <Legend />
          <Line
            isAnimationActive={false}
            yAxisId="left"
            type="monotone"
            dataKey={dataKey1}
            name={legendTitle1}
            stroke="#8884d8"
            strokeWidth={"4px"}
          />
          <Line
            isAnimationActive={false}
            yAxisId="right"
            type="monotone"
            dataKey={dataKey2}
            name={legendTitle2}
            stroke="#82ca9d"
            strokeWidth={"3px"}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export function OneAxisChart({
  data,
  title,
  yAxisLabel,
  legendTitle1,
  legendTitle2,
  dataKey1,
  dataKey2,
}) {
  return (
    <Box
      height={"500px"}
      m={2}
      bgcolor={"#f5f5f5"}
      pb={10}
      pt={2}
      borderRadius={4}
    >
      <Typography
        align="center"
        variant="h6"
        fontWeight={"medium"}
        fontStyle={"italic"}
        py={2}
      >
        {title}
      </Typography>

      <ResponsiveContainer width="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis
            domain={[
              (dataMin) => Math.floor(dataMin),
              (dataMax) => Math.ceil(dataMax),
            ]}
          >
            <Label
              style={{ textAnchor: "middle", fontStyle: "italic" }}
              position={"insideLeft"}
              angle={-90}
              value={yAxisLabel}
            />
          </YAxis>
          <CTooltip />
          <Legend />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey={dataKey1}
            name={legendTitle1}
            stroke="#8884d8"
            strokeWidth={"4px"}
          />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey={dataKey2}
            name={legendTitle2}
            stroke="#82ca9d"
            strokeWidth={"3px"}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Card sx={{ bgcolor: "#f5f5f5" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {label}
          </Typography>

          <Typography variant="body2" mb={1}>
            {payload[0].payload.date.toLocaleTimeString("vi-VN", {
              hour12: false,
            })}
          </Typography>
          <Typography variant="subtitle1" color={payload[0].fill}>
            {`${payload[0].name}: ${payload[0].value}`}
          </Typography>
          <Typography variant="subtitle1" color={payload[1].fill}>
            {`${payload[1].name}: ${payload[1].value}`}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export function DateBarChart({
  data,
  title,
  yAxisLabel,
  legendTitle1,
  legendTitle2,
  dataKey1,
  dataKey2,
}) {
  return (
    <Box
      height={"500px"}
      m={2}
      bgcolor={"#f5f5f5"}
      pb={10}
      pt={2}
      borderRadius={4}
    >
      <Typography
        align="center"
        variant="h6"
        fontWeight={"medium"}
        fontStyle={"italic"}
        py={2}
      >
        {title}
      </Typography>

      <ResponsiveContainer width="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis>
            <Label
              style={{ textAnchor: "middle", fontStyle: "italic" }}
              position={"insideLeft"}
              angle={-90}
              value={yAxisLabel}
            />
          </YAxis>
          <CTooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey={dataKey1} name={legendTitle1} fill="#8884d8" />
          <Bar dataKey={dataKey2} name={legendTitle2} fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
