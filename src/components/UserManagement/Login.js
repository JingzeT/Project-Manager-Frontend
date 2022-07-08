import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { login } from '../../actions/securityActions';

const Login = ({ login, security, errors }) => {
    const navigate = useNavigate();
    const [dataForm, setDataForm] = useState({
        username: '',
        password: '',
        errors: {}
    });

    const onChange = e => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        const LoginRequest = {
            username: dataForm.username,
            password: dataForm.password
        };

        login(LoginRequest);
    };

    useEffect(() => {
        if(security.validToken) {
            navigate('/dashboard');
        }
        // security.validToken ? navigate('/dashboard') : null;
    }, [security]);

    useEffect(() => {
        setDataForm({ ...dataForm, errors: errors });
    }, [errors]);

  return (
    <div className="login">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.username
                                })} 
                                placeholder="Email Address" 
                                name="username" 
                                value={dataForm.username}
                                onChange={onChange}
                            />
                            {
                                errors.username && (
                                    <div className='invalid-feedback'>{errors.username}</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.password
                                })} 
                                placeholder="Password" 
                                name="password" 
                                value={dataForm.password}
                                onChange={onChange}
                            />
                            {
                                errors.password && (
                                    <div className='invalid-feedback'>{errors.password}</div>
                                )
                            }
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});

export default connect(mapStateToProps, { login })(Login);