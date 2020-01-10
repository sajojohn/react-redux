import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";

import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  state = {
    course: {
      title: "",
    },
  };
  // this.handleChange = this.handleChange.bind(this);

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };
  handleSubmit = () => {
    event.preventDefault();
    //since we are not adding mapDispacthToProps explicitily, connect funcion automatically adds dispact as a prop to the component
    //this.props.dispatch(courseActions.createCourse(this.state.course));
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input type='text' onChange={this.handleChange} value={this.state.course.title} />
        <input type='submit' value='Save' />
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

function mapDispacthToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(CoursesPage);
