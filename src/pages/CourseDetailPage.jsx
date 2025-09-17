import React from "react";
import { useParams } from "react-router-dom";

const CourseDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Course Detail Page</h1>
      <p>Details for Course ID: {id}</p>
    </div>
  );
};

export default CourseDetailPage;
