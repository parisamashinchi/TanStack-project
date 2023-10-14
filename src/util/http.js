import { QueryClient } from "@tanstack/react-query";

export const queryCLient = new QueryClient();

export async function fetchCourses({ signal, searchTerm , max}) {
  let url = "http://localhost:3000/courses";
  if (searchTerm && max) {
    url += "?search=" + searchTerm + '&max=' + max;
  } else if (searchTerm) {
    url += '?search=' + searchTerm
  } else if (max) {
    url += '?max=' + max
  }

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the courses");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { courses } = await response.json();

  return courses;
}

export async function createNewCourse(courseData) {
  let url = "http://localhost:3000/courses";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(courseData),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating new courses");
    error.code = error.status;
    error.info = await response.json();
    throw error;
  }

  const { course } = await response.json();
  return course;
}

export async function fetchSelectableImages({ signal }) {
  let url = "http://localhost:3000/courses/images";

  const response = await fetch(url, { signal });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images");
    error.code = error.status;
    error.info = await response.json();
    throw error;
  }
  const { images } = await response.json();

  return images;
}

export async function fetchCourse({ signal, id }) {
  let url = `http://localhost:3000/courses/${id}`;

  const response = await fetch(url, { signal });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching course ");
    error.code = error.status;
    error.info = await response.json();
    throw error;
  }

  const { course } = await response.json();
  return course;
}

export async function deleteCourse({ id }) {
  let url = `http://localhost:3000/courses/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting course");
    error.code = error.status;
    error.info = await response.json();
    throw error;
  }
  return response.json();
}

export async function updateCourse({ id, course }) {
  let url = `http://localhost:3000/courses/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({ course }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const error = new Error("An error occurred while updating course");
    error.code = error.status;
    error.info = await response.json();
    throw error;
  }
  return await response.json();
}
