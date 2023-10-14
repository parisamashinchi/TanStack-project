import { Link } from 'react-router-dom';

export default function CourseItem({ course }) {
  return (
    <article className="course-item">
      <img src={`http://localhost:3000/${course.image}`} alt={course.title} />
      <div className="course-item-content">
        <div>
          <h2>{course.title}</h2>
          <p className="course-item-duration">Duration:{course.duration}hr</p>
        </div>
        <p>
          <Link to={`/courses/${course.id}`} className="button">
            View Details
          </Link>
        </p>
      </div>
    </article>
  );
}
