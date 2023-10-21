import { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { DeleteUserByID, getUserList } from "../../Service/UserServices";
import { ToastError, ToastSuccess } from "../../CommonComponents/Toasters";
import BreadcrumPath from "../../CommonComponents/BreadCrum";
import UserDetailsModal from "../../Models/UserDetailsModal";

function UserDetails() {
  const pageNav = [
    {
      name: "Home",
      link: "/home",
      active: false,
    },
    {
      name: "Users",
      link: "/users",
      active: true,
    },
  ];
  const [ShowHide, setShowHide] = useState(false);
  const [fetchUserAllData, setfetchUserAllData] = useState([]);
  const [user_ID, setUser_ID] = useState("");

  async function fetchFormData() {
    let res = await getUserList();
    if (res.data) {
      setfetchUserAllData(res.data);
    } else {
      setfetchUserAllData([]);
    }
  }

  useEffect(() => {
    fetchFormData();
  }, []);

  async function DeleteData(id) {
    let input = {
      userId: id,
    };
    let res = await DeleteUserByID(input);
    if (res.data) {
      fetchFormData();
      ToastSuccess("User Deleted Successfully.");
    } else {
      ToastError(res.data.message);
    }
  }

  return (
    <>
      <BreadcrumPath pageNav={pageNav} />
      <Container className="" fluid>
        <Row>
          <Card>
            <Card.Body>
              <Row xs={1} md={2} className="g-4">
                {fetchUserAllData && fetchUserAllData ? (
                  fetchUserAllData.map((itm, idx) => (
                    <Col md="3">
                      <Card style={{ width: "20rem" }} className="d-flex">
                        <Card.Img
                          variant="top"
                          src={`https://picsum.photos/300/200?${itm.name}`}
                        />
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item>
                            <b>Name : </b> {itm.name}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <b>Email : </b> {itm.email}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <b>Password : </b> {itm.password}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <b>City : </b> {itm.city}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <b>State : </b> {itm.state}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <b>Zip : </b> {itm.zip}
                          </ListGroup.Item>
                          {/* <ListGroup.Item>
                          <b>Address : </b> {itm.address1} {"," + itm.address2}{" "}
                        </ListGroup.Item> */}
                        </ListGroup>

                        <Card.Body className="d-flex">
                          <Button
                            variant="info"
                            onClick={() => {
                              setUser_ID(itm._id);
                              setShowHide(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            className="ms-2"
                            onClick={() => DeleteData(itm._id)}
                          >
                            Delete
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <h5>No Data</h5>
                )}
              </Row>
              <Row className="mt-5 mb-5">
                <Col md={5}></Col>
                <Col md={2}>
                  <Button
                    onClick={() => {
                      setShowHide(true);
                      fetchFormData();
                    }}
                  >
                    Add New User
                  </Button>
                </Col>
                <Col md={5}></Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>

        {ShowHide && (
          <UserDetailsModal
            user_ID={user_ID}
            fetchFormData={fetchFormData}
            show={ShowHide}
            onHide={() => {
              setShowHide(false);
              setUser_ID("");
            }}
          />
        )}
      </Container>
    </>
  );
}

export default UserDetails;
