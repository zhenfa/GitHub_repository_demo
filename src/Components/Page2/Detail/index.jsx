import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { BsStar } from 'react-icons/bs';

export default class Detail extends Component {
  render() {
    let response = this.props.response
    return (
      <Container >
        <Row key={response.id}>
          <Col>
            <Card style={{ width: '100%', marginTop: '10px' }}>
              <Card.Body>
                <Card.Title>
                  <p>{response.full_name}</p>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{response.description}</Card.Subtitle>
                <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
                  <BsStar style={{ marginRight: '5px' }} />
                  {response.stargazers_count}
                </Card.Text>
                <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
                  Move to Github ：<a href={`https://github.com/${response.full_name}`} target="_blank">{response.full_name}</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}
