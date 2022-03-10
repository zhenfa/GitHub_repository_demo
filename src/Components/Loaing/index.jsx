import React, { Component } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'

export default class Loading extends Component {
  render() {
    return (
      <Container style={{margin:'20px'}}>
        <Row>
          <Col md={12} style={{textAlign:'center'}}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    )
  }
}
