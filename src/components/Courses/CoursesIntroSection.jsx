import { Link } from 'react-router-dom';

import meetupImg from '../../assets/meetup.jpg';
import FindCourseSection from '../Courses/FindCourseSection.jsx'

export default function CoursesIntroSection() {
  return (
    <section
      className="content-section"
      id="overview-section"
      style={{ backgroundImage: `url(${meetupImg})` }}
    >
      <h2>
        Unlock Your Potential with  <br />
        <strong>Our Online Courses</strong>
      </h2>
      <p>Empower Your Learning Journey with Our Diverse Online Courses and Reach Your Educational Goals!</p>
      <FindCourseSection />
    </section>
  );
}
