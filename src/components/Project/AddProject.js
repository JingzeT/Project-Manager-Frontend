import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createProject } from '../../actions/projectActions';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';

const AddProject = ({ createProject, errors }) => {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    projectName:"",
    projectIdentifier:"",
    description:"",
    start_date:"",
    end_date:"",
    errors: {}
  });
  

  const onChange = e => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  }



  const onSubmit = e => {
    e.preventDefault();
    const newProject = {
      projectName: dataForm.projectName,
      projectIdentifier: dataForm.projectIdentifier,
      description: dataForm.description,
      start_date: dataForm.start_date,
      end_date: dataForm.end_date
    };

    createProject(newProject, navigate);

  };

  //life cycle hooks
  useEffect(() => {
    setDataForm({...dataForm, errors: errors });  
  }, [errors])

  
  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Create Project form</h5>
            <hr />
            <form onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                  <input 
                  type="text" 
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.projectName
                  })}
                  placeholder="Project Name" 
                  name='projectName'
                  value={dataForm.projectName}
                  onChange={e => onChange(e)}
                  />
                  {errors.projectName && (
                      <div className="invalid-feedback">
                        {errors.projectName}
                      </div>
                    )}
              </div>
              <br />
              <div className="form-group">
                  <input 
                  type="text" 
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.projectIdentifier
                  })}
                  placeholder="Unique Project ID" 
                  name='projectIdentifier'
                  value={dataForm.projectIdentifier}
                  onChange={e => onChange(e)}
                  />
                  {errors.projectIdentifier && (
                      <div className="invalid-feedback">
                        {errors.projectIdentifier}
                      </div>
                    )}
              </div>
              <br />
              <div className="form-group">
                  <textarea 
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.description
                  })}
                  placeholder="Project Description"
                  name='description'
                  value={dataForm.description}
                  onChange={e => onChange(e)}
                  />
                  {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                  <input 
                  type="date" 
                  className="form-control form-control-lg" 
                  name="start_date" 
                  value={dataForm.start_date}
                  onChange={e => onChange(e)}
                  />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                  <input 
                  type="date" 
                  className="form-control form-control-lg" 
                  name="end_date" 
                  value={dataForm.end_date}
                  onChange={e => onChange(e)}
                  />
              </div>

              <input 
              type="submit" 
              className="btn btn-primary btn-block mt-4" 
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
  
};

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProject }
)(AddProject); // AddProject is son