import {useQuery } from '@tanstack/react-query';
import { useContext ,useEffect, useState} from 'react';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import CourseItem from './CourseItem.jsx';
import {fetchCourses} from '../../util/http.js';
import {CourseContext}  from '../context/CourseContext.jsx';
import isEmpty from 'lodash/isEmpty'

export default function NewCoursesSection() {
  let content; 
  const {state, update} = useContext(CourseContext);
  const [searchedData, setSearchData] = useState({});
  const {data, isLoading, isError, error} = useQuery({
    queryKey:['courses', {max: 3}],
    queryFn: ({signal, queryKey}) => fetchCourses({signal, ...queryKey[1]}),
  })

  useEffect(() => {
    setSearchData(data)
  }, [data]);
  
  useEffect(() => {
    if(!isEmpty(state.course)){
      setSearchData(state.course)
    }
  }, [searchedData, state.course ]);


  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error?.info.message || "Failed to fetch courses" } />
    );
  }

  if (!isEmpty(searchedData)) {
    content = (
      <ul className="courses-list">
        {searchedData.map((course) => (
          <li key={course.id}>
            <CourseItem course={course} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-courses-section">
      <header>
        <h2>New courses</h2>
      </header>
      {content}
    </section>
  );
}
