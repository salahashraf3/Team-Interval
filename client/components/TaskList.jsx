import { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBBadge,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

import { Link } from "react-router-dom";

export default function TaskList() {
  const [priority, setpriority] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get-tasks", {});
      if (response.data.success) {
        setData(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    const response = await axios.post(
      "http://localhost:3000/delete-task-with-id",
      { id }
    );
    if (response.data.success) {
      fetchData();
    }
  };
  return (
    <section className="gradient-custom-2 vh-100">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol md="12" xl="10">
            <MDBCard>
              <MDBCardHeader className="p-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <MDBIcon fas icon="tasks" className="me-2" />
                  Task List
                </h5>
                <MDBDropdown>
                  <MDBDropdownToggle color={"link"}>Filter</MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link onClick={() => setpriority("high")}>
                      <MDBBadge color="danger">High priority</MDBBadge>
                    </MDBDropdownItem>
                    <MDBDropdownItem link onClick={() => setpriority("medium")}>
                      <MDBBadge color="warning">Medium priority</MDBBadge>
                    </MDBDropdownItem>
                    <MDBDropdownItem link onClick={() => setpriority("low")}>
                      <MDBBadge color="success">Low priority</MDBBadge>
                    </MDBDropdownItem>
                    <MDBDropdownItem link onClick={() => setpriority("")}>
                      <MDBBadge color="info">All</MDBBadge>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
                <Link to={"/add-list"}>
                  <MDBBtn>Add</MDBBtn>
                </Link>
              </MDBCardHeader>
              <div className="List-container">
                <MDBCardBody>
                  <MDBTable className="mb-0">
                    <MDBTableHead>
                      <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Description</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {data
                        .filter((item) => {
                          return priority.toLowerCase() === ""
                            ? item
                            : item.priority.toLowerCase().includes(priority);
                        })
                        .map((value) => {
                          return (
                            <tr className="fw-normal" key={value.id}>
                              <th>
                                <Link to={`/task/${value.id}`}>
                                  <img
                                    src={value.image}
                                    alt="avatar"
                                    className="shadow-1-strong rounded-circle"
                                    style={{
                                      width: "45px",
                                      height: "45px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  <span
                                    className="ms-2"
                                    style={{ cursor: "pointer" }}
                                  >
                                    {value.heading}
                                  </span>
                                </Link>
                              </th>
                              <td className="align-middle">
                                <span>{value.description}</span>
                              </td>
                              <td className="align-middle">
                                <h6 className="mb-0">
                                  <MDBBadge
                                    className="mx-2"
                                    color={
                                      value.priority === "high"
                                        ? "danger"
                                        : value.priority === "medium"
                                        ? "warning"
                                        : value.priority === "low"
                                        ? "success"
                                        : "secondary"
                                    }
                                  >
                                    {value.priority}
                                  </MDBBadge>
                                </h6>
                              </td>
                              <td className="align-middle">{value.date}</td>
                              <td className="align-middle">
                                <Link to={`/edit-task?id=${value.id}`}>
                                  <MDBIcon
                                    fas
                                    icon="edit"
                                    color="success"
                                    size="lg"
                                    className="me-3"
                                  />
                                </Link>
                                <MDBTooltip tag="a" title="Remove">
                                  <MDBIcon
                                    fas
                                    icon="trash-alt"
                                    color="danger"
                                    size="lg"
                                    className="me-3"
                                    onClick={() => handleDelete(value.id)}
                                  />
                                </MDBTooltip>
                              </td>
                            </tr>
                          );
                        })}
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
