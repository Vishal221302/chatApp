import React, { useState } from "react";
import { Tabs, Tab, Row, Col, Nav } from "react-bootstrap";
import UpdateDetails from "./UpdateDetails";

function EditUser(props) {
  const{user}=props
  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="overview">
        <Row>
          <Col sm={3} className="left_tab_sections">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="overview">Profile</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="overview">
                <UpdateDetails user={user} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default EditUser;
