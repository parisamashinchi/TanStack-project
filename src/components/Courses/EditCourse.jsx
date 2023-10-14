import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchCourse, updateCourse , queryCLient} from "../../util/http";

import Modal from "../UI/Modal.jsx";
import CourseForm from "./CourseForm.jsx";
import ErrorBlock from "../UI/ErrorBlock";

export default function EditCourse() {
  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses", params.id],
    queryFn: ({ signal }) => fetchCourse({ signal, id: params.id }),
  });

  const {mutate} = useMutation({
    mutationFn: updateCourse,
    onMutate: async (data) => {
      const newCourse = data.course;

      await queryCLient.cancelQueries({ queryKey:['courses', params.id] });
      const previousCourse =  queryCLient.getQueryData(['courses', params.id]);

      queryCLient.setQueryData(['courses', params.id], newCourse);

      return {previousCourse};
    },
    onError: (error,data, context) => {
      queryCLient.setQueryData(['courses', params.id], context.previousCourse )
    },
    onSettled:() => {
      queryCLient.invalidateQueries(['courses', params.id])
    }
  })

  function handleSubmit(formData) {
    mutate({id: params.id , course: formData});
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }
  let content;

  if (isLoading) {
    content = <p>fetching course info .....</p>;
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="fetching course detail failed"
          message={
            error.info?.message || "fetching course failed please try again"
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }
  if (data) {
    content = (
      <CourseForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </CourseForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
