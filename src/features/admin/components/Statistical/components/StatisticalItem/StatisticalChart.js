import { Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react';
import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const StatisticalChart = (props) => {
  const {
    data: { name, data, eachUnit },
  } = props;
  const theme = useTheme();
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {name}
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary}>
            <Label value={eachUnit} offset={0} position="insideBottom" />
          </XAxis>
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Revenues (VND)
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

StatisticalChart.propTypes = {};

export default StatisticalChart;
