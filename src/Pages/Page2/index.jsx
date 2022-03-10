import React, { Component } from 'react'
import Detail from '../../Components/Page2/Detail'
import Loading from '../../Components/Loaing'
import { Container, Row, Col, Button, Navbar, Form, FormControl } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { createSearchContentAction } from '../../Redux/Actions/stateAction'
import store from '../../Redux/store'

export default class Page2 extends Component {

  state = { response: {}, isLoading: true }

  componentDidMount() {
    let { username, repo } = this.props.params
    axios(`https://api.github.com/repos/${username}/${repo}`)
      .then((response) => {
        this.setState({ response: response.data, isLoading: false })
      })
      .catch((error) => {
        Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        }).fire({
          icon: 'error',
          title: `${error.message}`
        })
      })
  }
  changeEvent = (e) => {
    store.dispatch(createSearchContentAction({ searchContent: e.target.value }))
  }

  render() {
    return (
      <Container >
        <Row>
          <Col md={12}>
            <Navbar bg="dark" variant="dark" expand="lg" style={{ borderRadius: '10px' }}>
              <Container fluid>
                <Navbar.Brand>Github Search</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search Github"
                    className="me-2"
                    aria-label="Search Github"
                    value={store.getState().searchContent}
                    onChange={this.changeEvent}
                  />
                  <Link to={`/users/${store.getState().searchContent}/repos`}>
                    <Button size="lg">Go</Button>
                  </Link>
                </Form>
              </Container>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {
              (this.state.isLoading) ? <Loading /> : <Detail {...this.state} />
            }
          </Col>
        </Row>
      </Container>
    )
  }
}
