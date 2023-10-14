import { useState } from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { fetchCourse, deleteCourse, queryCLient } from "../../util/http.js";

import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";

export default function CourseDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses", params.id],
    queryFn: ({ signal }) => fetchCourse({ signal, id: params.id }),
  });

  const {
    mutate,
    isLoading: isLoadingDeleting,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["courses"],
        refetchType: "none",
      });
      navigate("/courses");
    },
  });

  const handleDelete = () => {
    mutate({ id: params.id });
  };

  const handleStartDelete = () => {
    setIsDeleting(true);
  };

  const handleStopDelete = () => {
    setIsDeleting(false);
  };

  let content;

  if (isLoading) {
    content = (
      <div id="course-details-content">
        <p> Fetching course detail</p>
      </div>
    );
  }
  if (isError) {
    content = (
      <div id="course-details-content">
        <ErrorBlock
          title="fetching course detail error"
          message={error.info?.message || "Failed to fetch course detail"}
        />
      </div>
    );
  }
  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="course-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="course-details-info">
            <h2>{data.title}</h2>
            <div>Duration: {data.duration} hr</div>
            <p id="course-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>
            Do you really want to delete this course? This action cannot be
            undone.
          </p>
          {isLoadingDeleting && <p>deleting ...</p>}
          {!isLoadingDeleting && (
            <div className="form-actions">
              <button onClick={handleStopDelete} className="button-text">
                Cancel
              </button>
              <button onClick={handleDelete} className="button">
                Delete
              </button>
            </div>
          )}
          {isErrorDeleting && (
            <ErrorBlock
              title="Failed to delete course"
              message={
                deleteError.info?.message || "Failed to delete course try again"
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/courses" className="nav-item">
          View all courses
        </Link>
      </Header>
      <article id="course-details">{content}</article>
    </>
  );
}
