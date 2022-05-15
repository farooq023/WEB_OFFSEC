import React, {  useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    Container,
    Button,
    FormGroup,
    Label,
    InputGroup,
    InputGroupAddon,
    Input,
    InputGroupText,
} from "reactstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { adminlogin } from '../../actions/adminauth';
import Widget from "../../components/Widget";

const Login = ({ login, isAuthenticated,adminlogin }) => {

  const [formData, setFromData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const onChange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if(isChecked){
      await adminlogin(email, password)
    }
    else{
       await login(email, password);
    }
  };

  if (isAuthenticated) {
    if(isChecked){
      return <Redirect to='/admindashboard'/>;
    }
    else{
      return <Redirect to='/dashboard'/>;
    }
  }

  return (
    <div className="auth-page">

      <Container>
        <Widget
          className="widget-auth mx-auto"
          title={<h3 className="mt-0">Login to Web Offensive Security</h3>}
        >
          <p className="widget-auth-info">Use your registered email to sign in.</p>
          <form onSubmit={(e) => onSubmit(e)}>
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
                  onChange={(e) => onChange(e)}
                  type="password"
                  required
                  name="password"
                  placeholder="Password"
                />
              </InputGroup>
            </FormGroup>

            <div style={{marginLeft: '20px', marginBottom:'10px'}}>
              <Input
              type="checkbox"
              checked={isChecked}
              onChange={handleOnChange}
              />Sign-in as Admin
            </div>

            {/* This part of webpage will be implemented after 60% evaluation. (Farooq Tariq)
            <Link className="d-block text-left mb-2" to="register">
              Forgot Password?
            </Link> */}

            <div className="bg-widget auth-widget-footer">
              
              <Button
                type="submit"
                color="success"
                className="auth-btn"
                size="sm"
                style={{ color: "#fff" }}
              >
                {"Login"}
              </Button>

              <p className="widget-auth-info mt-4">
                Not an Agent?
              </p>
              <Link className="d-block text-center mb-4" to="register">
                Become an agent now!
              </Link>
            </div>
          </form>
        </Widget>
      </Container>
      </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  adminlogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login,adminlogin })(Login);