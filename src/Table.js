import axios from "axios";
import React, { useState, useEffect } from "react";
import nextId from "react-id-generator";
import ReadTable from "./ReadTable";

const Table = () => {
  const [students, setStudents] = useState([]);

  const [addStudent, setAddStudent] = useState({
    id: 1,
    name: "",
    address: "",
  });

  // get id
  const [editStudentId, setEditStudentId] = useState(null);
  
  const [editFormData, setEditFormData] = useState({
    id: 1,
    name: "",
    address: "",
  });


  // get values from form
  const handleChange = (input) => (e) => {
    e.preventDefault();
    console.log(addStudent);
    setAddStudent({ ...addStudent, [input]: e.target.value });
  };

  // add data to table
  const handleAddStudent = (e) => {
    e.preventDefault();
    let incrId = nextId();
    const newStudent = {
      id: incrId,
      name: addStudent.name,
      address: addStudent.address,
    };

    const newStudents = [...students, newStudent];
    setStudents(newStudents);
  };

  // edit data value
  const handleEditChange = (input) => (e) => {
      e.preventDefault();
      setEditFormData({...editFormData, [input]: e.target.value});
  };

  // save form data
  const handleFormSave = e => {
      e.preventDefault();
      
      const saveStudent = {
          id: editStudentId,
          name: editFormData.name,
          address: editFormData.address
      }

      const newStudents = [...students];

      const formIndex = students.findIndex((student) => student.id === editStudentId);
      newStudents[formIndex] = saveStudent;

      setStudents(newStudents);
      setEditStudentId(null);

  }

  // edit modal data
  const handleEditStudentForm = (e, student) => {
      e.preventDefault();
      setEditStudentId(student.id);

      const formValues = {
          id: student.id,
          name: student.name,
        address: student.address
      }
      setEditFormData(formValues);
  }

  // delete data
  const handleDelete = (e) => {
      e.preventDefault();

      const newStudents = [...students];
      const formIndex = students.findIndex((student) => student.id === editStudentId);

      newStudents.splice(formIndex, 1);

      setStudents(newStudents);
  }



  // get data from db
  const fetchUrl = "http://localhost:9090/student/getAll";
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(fetchUrl);
      setStudents(data.data);
    }
    fetchData();
  }, [fetchUrl]);
  console.log(students);

  return (
    <div>
      <div className="d-flex flex-row">
        <button
          type="button"
          className="me-3 btn btn-primary ml-auto d-block mb-2"
          data-bs-toggle="modal"
          data-bs-target="#addModalForm"
        >
          Add Student
        </button>

        {/* <form className="row g-3 ms-auto">  //search form
          <div className="col-auto">
            <input
              type="text"
              className="form-control ms-auto"
              placeholder="search data"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form> */}
      </div>

      <table className="table table-bordered border-primary table-responsive">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <ReadTable students={students} handleEditStudentForm={handleEditStudentForm} />

        </tbody>
      </table>

      {/*Add Modal Design */}
      <div
        className="modal fade"
        id="addModalForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Student
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddStudent}>
                <div className="mb-3">
                  <label className="form-label">ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    placeholder="ID"
                    required
                    onChange={handleChange("id")}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    required
                    onChange={handleChange("name")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Address"
                    required
                    onChange={handleChange("address")}
                  />
                </div>
                <div className="modal-footer d-block">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-warning float-end"
                  >
                    Submit Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/*Edit Modal Design */}
      <div
        className="modal fade"
        id="editModalForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Student
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* <form onSubmit={handleAddStudent}> */}
              <form onSubmit={handleFormSave}>
                <div className="mb-3">
                  <label className="form-label">ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    placeholder="ID"
                    required
                    value={editFormData.id}
                    onChange={handleEditChange("id")}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    required
                    value={editFormData.name}
                    onChange={handleEditChange("name")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Address"
                    required
                    value={editFormData.address}
                    onChange={handleEditChange("address")}
                  />
                </div>
                <div className="modal-footer d-block">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success float-end"
                  >
                    Save Changes
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-danger float-start"
                    onClick={handleDelete}
                  >
                    Delete Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
