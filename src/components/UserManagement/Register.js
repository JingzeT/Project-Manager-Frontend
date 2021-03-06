import React, { useEffect, useState } from 'react';
import { createNewUser } from '../../actions/securityActions';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Register = ({ createNewUser, errors, security }) => {
    const navigate = useNavigate();
    const [dataForm, setDataForm] = useState({
        username: '',
        fullName: '',
        password: '',
        confirmPassword: '',
        errors: {}
    });

    useEffect(() => {
        if(security.validToken) {
            navigate('/dashboard');
        }
        // security.validToken ? navigate('/dashboard') : null;
    }, [security]);

    useEffect(() => {
        setDataForm({ ...dataForm, errors: errors });
    }, [errors]);


    const onChange = e => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        const newUser = {
            username: dataForm.username,
            fullName: dataForm.fullName,
            password: dataForm.password,
            confirmPassword: dataForm.confirmPassword
        };

        createNewUser(newUser, navigate);
    }


  return (
    <div className="register">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your Account</p>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.fullName
                                })} 
                                placeholder="Full Name" 
                                name="fullName"
                                value={dataForm.fullName}
                                onChange={onChange}
                            />
                            {
                                errors.fullName && (
                                    <div className='invalid-feedback'>{errors.fullName}</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <input 
                                type="email" 
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.username
                                })} 
                                placeholder="Email Address (Username)" 
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
                                errors.confirmPassword && (
                                    <div className='invalid-feedback'>{errors.confirmPassword}</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.confirmPassword
                                })}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={dataForm.confirmPassword}
                                onChange={onChange}
                             />
                             {
                                errors.confirmPassword && (
                                    <div className='invalid-feedback'>{errors.confirmPassword}</div>
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

Register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security
});

export default connect(mapStateToProps, { createNewUser })(Register);