import {
  MDBCard,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBadge,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddList = () => {
  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setpriority] = useState("low");
  const [dateTime, setDateTime] = useState(new Date());
  const [file, setFile] = useState("/Profile_balnk.webp");

  const navigate = useNavigate();

  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setFile(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post("http://localhost:3000/add-task", {
        heading,
        priority,
        desc,
        dateTime,
        file,
      });
      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const now = new Date();

    const formattedDateTime = now.toISOString().slice(0, 16);

    setDateTime(formattedDateTime);
  }, []);
  return (
    <section className="gradient-custom-2 vh-100">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol md="12" xl="10">
            <MDBCard>
              <MDBCardHeader className="p-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <MDBIcon fas icon="circle-plus" className="me-2" />
                  Add Task
                </h5>
                <Link to={"/"}>
                  <MDBBtn color="danger">Back</MDBBtn>
                </Link>
              </MDBCardHeader>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div
                  className="List-container d-flex flex-column  justify-content-around"
                  style={{
                    paddingRight: "10%",
                    paddingLeft: "10%",
                    paddingTop: "2%",
                    paddingBottom: "2%",
                  }}
                >
                  <MDBInput
                    label="Heading"
                    id="form1"
                    type="text"
                    onChange={(e) => setHeading(e.target.value)}
                    required
                  />
                  <MDBInput
                    label="Description"
                    id="form1"
                    type="text"
                    onChange={(e) => setDesc(e.target.value)}
                    required
                  />

                  <MDBDropdown>
                    <MDBDropdownToggle color="secondary">
                      {priority}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link onClick={() => setpriority("high")}>
                        <MDBBadge color="danger">High priority</MDBBadge>
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        link
                        onClick={() => setpriority("medium")}
                      >
                        <MDBBadge color="warning">Medium priority</MDBBadge>
                      </MDBDropdownItem>
                      <MDBDropdownItem link onClick={() => setpriority("low")}>
                        <MDBBadge color="success">Low priority</MDBBadge>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>

                  <MDBInput
                    label="End Date"
                    type="datetime-local"
                    id="datetime"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                  />

                  <img
                    src={file}
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                  <input
                    type="file"
                    id="customFile"
                    width={"200px"}
                    accept="image/*"
                    onChange={convertToBase64}
                    required
                  />

                  <div>
                    <MDBBtn color="success" type="submit">
                      Add Task
                    </MDBBtn>
                  </div>
                </div>
              </form>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default AddList;
