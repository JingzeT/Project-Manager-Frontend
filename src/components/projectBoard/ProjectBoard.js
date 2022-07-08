import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Backlog from './Backlog';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBacklog } from '../../actions/backlogActions';

const ProjectBoard = ({ backlog, getBacklog, errors }) => {
    const { id } = useParams();
    const { project_tasks } = backlog;
    const [err, setErr] = useState({});
    let BoardContent;

    const boardAlgorithm = (err, project_tasks) => {
        if(project_tasks.length < 1) {
            if(err.projectNotFound) {
                return (
                    <div className='alert alert-danger text-center' role='alert'>
                        {err.projectNotFound}
                    </div>
                )
            } else if(err.projectIdentifier) {
                return (
                    <div className='alert alert-danger text-center' role='alert'>
                        {err.projectIdentifier}
                    </div>
                )
            } else {
                return (
                    <div className='alert alert-info text-center' role='alert'>
                        No Project Tasks on this board
                    </div>
                )
            }
        } else {
            return <Backlog project_tasks={project_tasks}/>
        }
    };

    BoardContent = boardAlgorithm(err, project_tasks);

    useEffect(() => {
        getBacklog(id);
        setErr({ err: errors });
    }, [getBacklog, id, errors]);

  return (
    <div className="container">
        <Link to={`/addProjectTasks/${id}`} className="btn btn-primary mb-3">
            <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        
        {BoardContent}
    </div>
  )
};

ProjectBoard.propTypes = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);