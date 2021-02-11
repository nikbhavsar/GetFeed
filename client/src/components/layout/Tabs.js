import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Profiles from '../profile/Profiles';
import Followers from '../profile/Followers';
import Following from '../profile/Following';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    borderWidth: 1,
  },
  indicator: {
    backgroundColor: '#EE6763',
    color: 'black',
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          classes={{ indicator: classes.indicator }}
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs example'>
          <Tab label='Suggations' {...a11yProps(0)} />
          <Tab label='Followers' {...a11yProps(1)} />
          <Tab label='Following' {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}>
        <TabPanel
          className='tab-panel'
          value={value}
          index={0}
          dir={theme.direction}>
          <Profiles />
        </TabPanel>
        <TabPanel
          className='tab-panel'
          value={value}
          index={1}
          dir={theme.direction}>
          <Followers />
        </TabPanel>
        <TabPanel
          className='tab-panel'
          value={value}
          index={2}
          dir={theme.direction}>
          <Following />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
