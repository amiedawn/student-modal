import React from "react";

const ReadTable = ({ students, handleEditStudentForm }) => {
  return (
    <>
      {students.map((student) => (
        <tr key={student.id}>
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.address}</td>
          <td>
            <button
              type="button"
              className="me-3 btn btn-primary ml-auto d-block mb-2"
              data-bs-toggle="modal"
              data-bs-target="#editModalForm"
              onClick={(e) => handleEditStudentForm(e, student)}
            >
              Update / Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ReadTable;
