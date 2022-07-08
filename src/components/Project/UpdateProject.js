import React, { useEffect, useState } from "react";
import { getProject, createProject } from "../../actions/projectActions";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import classnames from "classnames";

const UpdateProject = ({ getProject, createProject, project, errors }) => {
    const { id } = useParams();
    const navigate = useNavigate();

        
    const [dataForm, setDataForm] = useState({
        id: project.id,
        projectName: "",
        projectIdentifier: id,
        description: "",
        start_date: "",
        end_date: "",
        errors: {}
    });


    useEffect(() => {
        getProject(id, navigate);
        setDataForm({...dataForm, id: project.id, errors: errors});
    }, [getProject, project, errors]); // set "id" as long as get project



    const onChange = e => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();

        const updateProject = {
            id: dataForm.id,
            projectName: dataForm.projectName,
            projectIdentifier: dataForm.projectIdentifier,
            description: dataForm.description,
            start_date: dataForm.start_date,
            end_date: dataForm.end_date
        };

        createProject(updateProject, navigate);
    }

    return (
        <div className="project">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Update Project form</h5>
                        <hr />
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.projectName
                                        })}
                                    placeholder="Project Name"
                                    name="projectName"
                                    value={dataForm.projectName}
                                    onChange={onChange} />
                                    {errors.projectName && (
                                        <div className="invalid-feedback">{errors.projectName}</div>
                                    )}
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    placeholder={id}
                                    disabled
                                    name="projectIdentifier"
                                    value={dataForm.projectIdentifier}
                                    onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <textarea 
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.description
                                        })} 
                                    placeholder="Project Description"
                                    name="description"
                                    value={dataForm.description}
                                    onChange={onChange} />
                                    {errors.description && (
                                        <div className="invalid-feedback">{errors.description}</div>
                                    )}
                            </div>
                            <h6>Start Date</h6>
                            <div className="form-group">
                                <input 
                                    type="date" 
                                    className="form-control form-control-lg" 
                                    name="start_date"
                                    value={dataForm.start_date}
                                    onChange={onChange} />
                            </div>
                            <h6>Estimated End Date</h6>
                            <div className="form-group">
                                <input 
                                    type="date" 
                                    className="form-control form-control-lg" 
                                    name="end_date"
                                    value={dataForm.end_date}
                                    onChange={onChange} />
                            </div>
                            <input type="submit" className="btn btn-primary btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project.project,
    errors: state.errors
});

export default connect(mapStateToProps, { getProject, createProject })(UpdateProject);