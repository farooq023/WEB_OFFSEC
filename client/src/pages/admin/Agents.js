import { connect } from 'react-redux';
import React from 'react';
import { agents } from '../../redux/actions/agents.js';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Agents = ({ agentsData, results, agents, isAgents }) => {
  const onRemove = (email) => {
    axios.delete('/api/agents/' + email);
    getagents();
  };
  const getagents = async () => {
    await agents();
    if (isAgents) {
      return <Navigate to="/agents" />;
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        {' '}
        <b>All Agents</b>
      </h1>
      <br />
      {/* <h4 style={{textAlign: 'center'}}>Your Ongoing Assessments</h4> */}
      <br />
      <br />
      <br />
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isAgents ? (
              agentsData.map((obj) => (
                <tr>
                  <td>{obj.name}</td>
                  <td>{obj.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        onRemove(obj.email);
                      }}
                    >
                      Remove Agent
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <td></td>
            )}
          </tbody>
        </table>
      </div>

      <div>
        {/* <Widget style={{innerWidth:50}}>
        <table class="table"><thead>
        <tr>
            <th scope="col">Vulnerability</th>
            <th scope="col">Severity</th>
            <th scope="col">Url</th>
        </tr>

          </thead>

          <tbody>
              {results.map((obj)=>(<tr>
                <td>{obj.Vulnerability}</td>
                <td>{obj.Severity}</td>
                <td>{obj.URL}</td>
                </tr>))}
          </tbody>
          
          </table>
        </Widget> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  agentsData: state.agents.agents,
  isAgents: state.agents.isAgents
});

Agents.propTypes = {
  agents: PropTypes.func.isRequired,
  isAgents: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { agents })(Agents);
