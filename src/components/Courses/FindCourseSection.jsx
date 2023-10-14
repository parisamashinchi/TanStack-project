import { useState, useRef, useContext , useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchCourses, queryCLient} from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import CourseItem from './CourseItem.jsx';
import { CourseContext } from '../context/CourseContext.jsx';

export default function FindCourseSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();
  const {update} = useContext(CourseContext)

  const {data} = useQuery({
    queryKey:['courses', {searchTerm: searchTerm}],
    queryFn: ({signal, queryKey }) => fetchCourses({signal, ...queryKey[1]}),
  })
  
  useEffect(()=>{
    update({course: data})
  },[data])

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }
 
  return (
    <section className="content-section" id="all-courses-section">
      <header>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search courses"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
    </section>
  );
}
