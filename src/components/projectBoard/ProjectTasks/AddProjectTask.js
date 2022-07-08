import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { addProjectTask } from '../../../actions/backlogActions';
import PropTypes from 'prop-types';
import { useEffect } from 'react';


const AddProjectTask = ({ addProjectTask, errors }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dataForm, setDataForm] = useState({
        "summary": "",
        "acceptanceCriteria": "",
        "status": "",
        "priority": 0,
        "dueDate": "",
        projectIdentifier: id,
        errors: {}
    });

    const onChange = e => {
        setDataForm({...dataForm, [e.target.name]: e.target.value});
    };

    const onSubmit = e => {
        e.preventDefault();

        const newDataForm = {
            summary: dataForm.summary,
            acceptanceCriteria: dataForm.acceptanceCriteria,
            status: dataForm.status,
            priority: dataForm.priority,
            dueDate: dataForm.dueDate
        };

        addProjectTask(dataForm.projectIdentifier, newDataForm, navigate);
    };

    useEffect(() => {
        setDataForm({ ...dataForm, errors: errors });
    }, [errors]);

  return (
    <div className="add-PBI">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to={`/projectBoard/${id}`} className="btn btn-light">
                        Back to Project Board
                    </Link>
                    <h4 className="display-4 text-center">Add Project Task</h4>
                    <p className="lead text-center">Project Name + Project Code</p>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.summary
                                })}
                                name="summary" 
                                placeholder="Project Task summary" 
                                value={dataForm.summary}
                                onChange={onChange}
                            />
                        {
                            errors.summary && (
                                <div className='invalid-feedback'>{errors.summary}</div>
                            )
                        }
                        </div>
                        <div className="form-group">
                            <textarea 
                                className="form-control form-control-lg" 
                                placeholder="Acceptance Criteria" 
                                name="acceptanceCriteria" 
                                value={dataForm.acceptanceCriteria}
                                onChange={onChange}
                            />
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                            <input 
                                type="date" 
                                className="form-control form-control-lg" 
                                name="dueDate" 
                                value={dataForm.dueDate}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <select 
                                className="form-control form-control-lg" 
                                name="priority"
                                value={dataForm.priority}
                                onChange={onChange}
                            >
                                <option value={0}>Select Priority</option>
                                <option value={1}>High</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Low</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select 
                                className="form-control form-control-lg" 
                                name="status"
                                value={dataForm.status}
                                onChange={onChange}
                            >
                                <option value="">Select Status</option>
                                <option value="TO_DO">TO DO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
};

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { addProjectTask })(AddProjectTask);