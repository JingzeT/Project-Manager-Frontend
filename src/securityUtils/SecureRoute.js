import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SecureRoute = ({ 
    component: Component, 
    security
}) => {
    if(security.validToken) {
        return <Component />
    } else {
        return <Navigate to='/login' />
    }
};

SecureRoute.propTypes = {
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security
});

export default connect(mapStateToProps)(SecureRoute);