import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import CourseForm from './CourseForm.jsx';
import { createNewCourse , queryCLient} from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewCourse() {
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: createNewCourse,
    onSuccess:()=> {
      queryCLient.invalidateQueries({queryKey:['courses']})
      navigate('/courses');
    }
  });

  function handleSubmit(formData) {
    mutate({ course: formData });
  }
  return (
    <Modal onClose={() => navigate('../')}>
      <CourseForm onSubmit={handleSubmit}>
        {isLoading && 'Submitting...'}
        {!isLoading && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </CourseForm>
      {isError && (
        <ErrorBlock
          title="Failed to create course"
          message={
            error.info?.message ||
            'Failed to create course. Please check your inputs and try again later.'
          }
        />
      )}
    </Modal>
  );
}