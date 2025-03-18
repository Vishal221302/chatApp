import React from 'react';
import { Tabs, Tab, Row, Col, Nav } from "react-bootstrap";
import Userinfo from '../userData.js/userinfo';

export default function UserDetails(props) {
    const { userdetails } = props;
  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="overview">
        <Row>
          <Col sm={3} className="left_tab_sections">
            <Nav variant="pills" className="flex-column ">
              <Nav.Item>
                <Nav.Link eventKey="overview">Overview</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="media">Media</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="files">Files</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="links">Links</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="overview">
                <Userinfo userdetails={userdetails} />
              </Tab.Pane>
              <Tab.Pane eventKey="media">Media</Tab.Pane>
              <Tab.Pane eventKey="files">Files</Tab.Pane>
              <Tab.Pane eventKey="links">Links</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
