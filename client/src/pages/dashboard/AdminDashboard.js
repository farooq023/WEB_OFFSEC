import React from 'react';
import { Button } from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import img from '../../assets/assess.jfif';
import img3 from '../../assets/report2.jpg';

const AdminDashboard = ({ auth: { user } }) => {
  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      {/* <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.email}
      </p> */}

      <h1 style={{ textAlign: 'center' }}>
        {' '}
        <b className="large text-primary">Admin Dashboard</b>{' '}
      </h1>
      <br />
      <br />
      <br />
      <br />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <a href="/ongoing">
          <img src={img} width="125" height="125" alt="" />
        </a>

        <a
          className="lead"
          href="/assessmentresults"
          style={{ marginLeft: '7%', marginRight: '7%' }}
        >
          <img src={img} width="125" height="125" alt="gbh" />
        </a>

        <a href="/getreport">
          <img src={img3} width="125" height="125" alt="" />
        </a>
      </div>

      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}
      >
        <Button
          href="/ongoing"
          style={{ backgroundColor: 'dark', color: 'black' }}
        >
          Ongoing Assessments
        </Button>
        <Button
          href="/assessmentresults"
          style={{
            backgroundColor: 'dark',
            color: 'black',
            marginLeft: '5%',
            marginRight: '5%'
          }}
        >
          Assessment Results
        </Button>
        <Button
          href="/getreport"
          style={{ backgroundColor: 'dark', color: 'black' }}
        >
          Get Assessment Report
        </Button>
      </div>
    </div>
  );
};

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminDashboard);