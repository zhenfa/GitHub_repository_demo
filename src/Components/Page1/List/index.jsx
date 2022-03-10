import React, { PureComponent } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BsStar } from 'react-icons/bs';
import store from '../../../Redux/store'

export default class List extends PureComponent {

  render() {
    let response = this.props.response
    return (
      <Container >
        <Row style={{ marginTop: '10px' }}>
          <Col md={12}>
            <h1>Hearder : {store.getState().searchContent}</h1>
            <hr />
          </Col>
        </Row>
        {
          Object.keys(response).length === 0 ?
            <div>
              <h3>Search result : 0</h3>
            </div> :
            response.map((item) => {
              return <Row key={item.id}>
                <Col>
                  <Card style={{ width: '100%', marginTop: '10px' }}>
                    <Card.Body>
                      <Card.Title>
                        <Link to={`/users/${item.owner.login}/repos/${item.name}`}>
                          {item.name}
                        </Link>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{item.description}</Card.Subtitle>
                      <Card.Text style={{ display: 'flex', alignItems: 'center' }}>
                        <BsStar style={{ marginRight: '5px' }} />{item.stargazers_count}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            })
        }
      </Container>
    )
  }
}
