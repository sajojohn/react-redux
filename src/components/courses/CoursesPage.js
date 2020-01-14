import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorAction";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
class CoursesPage extends React.Component {
  componentDidMount() {
    const { authors, courses, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch((err) => {
        alert("loading courses failed " + err);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch((err) => {
        alert("loading authors failed " + err);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
};
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId).name,
            };
          }),
    authors: state.authors,
  };
}

function mapDispacthToProps(dispatch) {
  return {
    actions: { loadCourses: bindActionCreators(courseActions.loadCourses, dispatch), loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch) },
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(CoursesPage);
