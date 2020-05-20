import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import colorfull from '@api/palette/colorfull';
import Divider from '@material-ui/core/Divider';
import { withStyles, Grid } from '@material-ui/core';
import municipalActivitesLogo from '@images/logo.png';
import { data1, data2 } from '@api/chart/chartMiniData';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import pink from '@material-ui/core/colors/pink';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import styles from '@components/Widget/widget-jss';
import {CounterTrading} from '@components';
const colorsPie = [purple[500], blue[500], cyan[500], pink[500]];

class MunicipalStats extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="column">
        <div style={{ marginBottom: '18px' }}>
          <Typography className={classes.smallTitle} variant="button">
            <MonetizationOn className={classes.leftIcon} />
            Datos
          </Typography>
          <Divider className={classes.divider} />

          <PieChart width={350} height={200}>
            <Pie
              data={data2}
              cx={120}
              cy={90}
              dataKey="value"
              innerRadius={40}
              outerRadius={80}
              fill="#FFFFFF"
              paddingAngle={5}
              label
            >
              {data2.map((entry, index) => (
                <Cell
                  key={index.toString()}
                  fill={colorsPie[index % colorsPie.length]}
                />
              ))}
            </Pie>
            <Legend
              iconType="circle"
              align="right"
              verticalALign="middle"
              iconSize={10}
              layout="vertical"
            />
          </PieChart>
        </div>

        <CounterTrading
          color={colorfull[4]}
          unitBefore=""
          start={0}
          end={3}
          duration={3}
          title="Actividades Municipales"
          logo={municipalActivitesLogo}
          position="up"
          value={5.6}
          lowest={1}
          highest={7}
        >
          <LineChart width={240} height={60} data={data1}>
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#FFFFFF"
              strokeWidth={2}
            />
          </LineChart>
        </CounterTrading>
      </Grid>
    );
  }
}
MunicipalStats.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MunicipalStats);
