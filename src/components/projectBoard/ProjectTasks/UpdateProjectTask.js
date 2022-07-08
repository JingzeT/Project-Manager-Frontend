import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getProjectTask, updateProjectTask } from '../../../actions/backlogActions';
import PropTypes from 'prop-types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const UpdateProjectTask = ({ getProjectTask, updateProjectTask, project_task, errors }) => {
    const { backlog_id, pt_id } = useParams();
    const navigate = useNavigate();
    const [dataForm, setDataForm] = useState({
        "id": project_task.id,
        "projectSequence": "",
        "summary": "",
        "acceptanceCriteria": "",
        "status": "",
        "priority": "",
        "dueDate": "",
        "projectIdentifier": "",
        "created_At": project_task.created_At,
        errors: {}
    });

    useEffect(() => {
        getProjectTask(backlog_id, pt_id, navigate);
        // setDataForm({...dataForm,
        //     projectSequence: project_task.projectSequence,
        //     summary: project_task.summary,
        //     acceptanceCriteria: project_task.acceptanceCriteria,
        //     status: project_task.status,
        //     priority: project_task.priority,
        //     dueDate: project_task.dueDate,
        //     projectIdentifier: project_task.projectIdentifier,
        //     create_At: project_task.create_At,
        //     errors: errors
        // });
        setDataForm({...dataForm, 
            projectIdentifier: project_task.projectIdentifier, 
            projectSequence: project_task.projectSequence,
            created_At: project_task.created_At,
            id: project_task.id, 
            errors: errors});
    }, [getProjectTask, project_task, errors]);

    const onChange = e => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();

        const UpdateProjectTask = {
            id: dataForm.id,
            projectSequence: dataForm.projectSequence,
            summary: dataForm.summary,
            acceptanceCriteria: dataForm.acceptanceCriteria,
            status: dataForm.status,
            priority: dataForm.priority,
            dueDate: dataForm.dueDate,
            projectIdentifier: dataForm.projectIdentifier,
            create_At: dataForm.create_At
        };

        updateProjectTask(dataForm.projectIdentifier, dataForm.projectSequence, UpdateProjectTask, navigate);
    };

  return (
    <div className="add-PBI">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to={`/projectBoard/${dataForm.projectIdentifier}`} className="btn btn-light">
                        Back to Project Board
                    </Link>
                    <h4 className="display-4 text-center">Update Project Task</h4>
                    <p className="lead text-center">Project Name: {dataForm.projectIdentifier} | 
                        Project Task ID: {dataForm.projectSequence}{" "} </p>
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

UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    updateProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project_task: state.backlog.project_task,
    errors: state.errors
})

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(UpdateProjectTask);