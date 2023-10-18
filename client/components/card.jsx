import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBCardHeader,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBadge,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Card() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/get-task-with-id",
        { id }
      );
      if (response.data.success) {
        console.log(response.data.results[0]);
        setData(response.data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <section className="gradient-custom-2 vh-100">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol md="12" xl="4">
            <MDBCard>
              <MDBCardHeader className="p-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <MDBIcon fas icon="tasks" className="me-2" />
                  Task
                </h5>

                <Link to={"/"}>
                  <MDBBtn color="danger">Back</MDBBtn>
                </Link>
              </MDBCardHeader>
              <div className="List-container">
                <MDBCardBody className=" m-5 d-flex align-items-center ">
                  <img
                    src={data?.image}
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                  <MDBCardBody>
                    <MDBCardTitle>{data?.heading}</MDBCardTitle>
                    <MDBCardText>{data?.description}</MDBCardText>
                    Priority:
                    <MDBBadge
                      className="mx-2"
                      color={
                        data?.priority === "high"
                          ? "danger"
                          : data?.priority === "medium"
                          ? "warning"
                          : data?.priority === "low"
                          ? "success"
                          : "secondary"
                      }
                    >
                      {data?.priority}
                    </MDBBadge>
                  </MDBCardBody>
                </MDBCardBody>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    // <MDBCard>

    // </MDBCard>
  );
}
