import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alerts';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';

import { Container, Button, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';
import Widget from "../../components/Widget";


const  Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFromData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [passErr, setPassError] = useState(null);
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setPassError("Password does not match");
    }
    else {
      setPassError(null);
        register(name, email, password);
    } 
  };
  
  
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }


  return (
    <div className="auth-page">
      <Container>
        <Widget
          className="widget-auth mx-auto"
          title={<h3 className="mt-0">Agent Registration</h3>}
        >
          <p className="widget-auth-info">Use your email to sign up.</p>
          <form onSubmit={(e) => onSubmit(e)}>

          <FormGroup>
              <Label for="name">Name</Label>
              <InputGroup className="input-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="la la-lock text-white" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id="name"
                  className="input-transparent pl-3"
                  value={name}
                  onChange={(e) => onChange(e)}
                  type="name"
                  required
                  name="name"
                  placeholder="Name"
                />
              </InputGroup>
            </FormGroup>

            <FormGroup className="mt">
              <Label for="email">Email</Label>
              <InputGroup className="input-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="la la-user text-white" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id="email"
                  className="input-transparent pl-3"
                  value={email}
                  onChange={(e) => onChange(e)}
                  type="email"
                  required
                  name="email"
                  placeholder="Email"
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <InputGroup className="input-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="la la-lock text-white" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id="password"
                  className="input-transparent pl-3"
                  value={password}
                  onChange={(e) => {
                    setPassError(null)
                    onChange(e)}}
                  type="password"
                  required
                  name="password"
                  placeholder="Password"
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label for="password2">Re-enter assword</Label>
              <InputGroup className="input-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="la la-lock text-white" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id="password"
                  className="input-transparent pl-3"
                  value={password2}
                  onChange={(e) => {
                    setPassError(null)
                    onChange(e)}}
                  type="password"
                  required
                  name="password2"
                  placeholder="Password"
                />
              </InputGroup>
              <small style={{color: 'red'}}>{passErr ? passErr : ""}</small>
            </FormGroup>

            <div className="bg-widget auth-widget-footer">
              <Button
                type="submit"
                color="success"
                className="auth-btn"
                size="sm"
                style={{ color: "#fff" }}
              >
                {"Register"}
              </Button>
              <p className="widget-auth-info mt-4">
                Already Registered?
              </p>
              <Link className="d-block text-center mb-4" to="login">
                Sign-in
              </Link>
            </div>
          </form>
        </Widget>
      </Container>
      </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
