import { Link, Outlet } from 'react-router-dom';
import Header from '../Header.jsx';
import CoursesIntroSection from './CoursesIntroSection.jsx';
import NewCoursesSection from './NewCoursesSection.jsx';


export default function Courses() {

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/courses/new" className="button">
          New Course
        </Link>
      </Header>
      <main>
          <CoursesIntroSection />
          <NewCoursesSection />
      </main>
    </>
  );
}
