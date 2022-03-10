import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default class ErrorPage extends Component {
  render() {
    console.log('404');
    return (
      // <div>不好意思，未發現此路徑，請聯絡網站管理員。</div>
      <div className="page-wrap d-flex flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col className="text-center" md={12}>
              <span className="display-1 d-block">404</span>
              <div className="mb-4 lead">The page you are looking for was not found.</div>
            </Col>
          </Row>
        </Container>
      </div>
      
    )
  }
}
