import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { createSearchContentAction } from '../Redux/Actions/stateAction'
import store from '../Redux/store'
import './index.css'

export default class App extends Component {

  // 狀態保存於該組件內
  state = { searchContent: '' }

  // 路由更變時提交狀態至store管理，改善change事件組件重新re-render問題
  submitEvent = (e) => {
    let searchContent = this.state.searchContent;
    if (searchContent === '') {
      alert('不可輸入空字串')
      e.preventDefault();
      return
    }
    store.dispatch(createSearchContentAction({ 'searchContent': searchContent }))
  }
  changeEvent = (e) => {
    this.setState({ searchContent: e.target.value })
  }

  render() {
    return (
      <Container fluid className="diagonal-gradient" style={{ height: '100vh' }}>
        <div className="index-search-wrap">
          <Row>
            <Col md={12}>
              <h1 className="index-title">Github search react example<br />For the best interview</h1>
              <p className="index-description">For best regard, it's excited for me to do this project with Dcard's team</p>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <input onChange={this.changeEvent} className="form-control form-control-lg" size="lg" type="text" placeholder='username....' />
            </Col>
            <Col md={4}>
              <Link role="button" to={`/users/${this.state.searchContent}/repos`} onClick={this.submitEvent}>
                <Button size="lg">Search for github</Button>
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
}
