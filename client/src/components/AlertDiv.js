import React from 'react';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

const AlertDiv = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Alert className='error-alert' severity='error' key={alert.id}>
      {alert.msg}
    </Alert>
  ));

const mapStateToProps = (state) => ({ alerts: state.alert });

export default connect(mapStateToProps)(AlertDiv);
