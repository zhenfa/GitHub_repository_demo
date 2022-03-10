import React, { PureComponent } from 'react'
import List from '../../Components/Page1/List'
import Loading from '../../Components/Loaing'
import Swal from 'sweetalert2'
import { Container, Row, Col, Button, Navbar, Form, FormControl } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { createSearchContentAction } from '../../Redux/Actions/stateAction'
import store from '../../Redux/store'

export default class Page1 extends PureComponent {

  /*
    searchContent ( string ) : 搜尋條件
    response ( Object )      : 請求回傳數據
    page ( int )             : 當前頁數索引
    isLoading ( bool )       : 確認是否正在 Loading，用於等待載入頁面數據
    isLoadingMore ( bool )   : 確認是否正在 Loading，用於等待載入更多數據
    isEnd ( bool )           : 確認數據否還需要發出更多的請求
  */
  state = { searchContent: '', response: {}, page: 1, isLoading: true, isLoadingMore: false, isEnd: false }

  //組件掛載後，初始化數據
  componentDidMount() {
    let { searchContent } = store.getState();
    axios.get(`https://api.github.com/users/${searchContent}/repos`,
      {
        params: {
          sort: 'id',
          per_page: 10,
          page: this.state.page
        }
      }
    )
      .then((response) => {
        //初始化資料，並且關閉 loading 畫面
        this.setState({ response: response.data, isLoading: false, searchContent: store.getState().searchContent })
        //判斷是否監聽 scroll 事件，當回傳資料等於 10 筆時，表示可能還有下一頁
        if (Object.keys(response.data).length === 10) {
          window.addEventListener('scroll', this.handleScroll)
        }
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
        this.setState({  isLoading: false, searchContent: store.getState().searchContent })
      })
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  //綁定輸入資料至 state 管理
  changeEvent = (e) => {
    this.setState({ searchContent: e.target.value })
  }


  clickEvent = (e) => {
    let searchContent = this.state.searchContent;
    if (searchContent === '') {
      alert('不可輸入空字串')
      e.preventDefault();
      return;
    }
    //點擊後將 searchContent 交至 redux 管理
    store.dispatch(createSearchContentAction({ searchContent: searchContent }))
    axios.get(`https://api.github.com/users/${searchContent}/repos`,
      {
        params: {
          sort: 'id',
          per_page: 10,
          page: 1
        }
      }
    )
      .then((response) => {
        //初始化資料
        this.setState({ response: response.data, isLoadingMore: false, isEnd: false, page: 1 })
        //判斷是否監聽 scroll 事件，當回傳資料等於 10 筆時，表示可能還有下一頁
        if (Object.keys(response.data).length === 10) {
          window.addEventListener('scroll', this.handleScroll)
        }
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

  // 監聽滾動事件
  handleScroll = async (e) => {
    let searchContent = store.getState().searchContent
    let scrollTop = e.target.documentElement.scrollTop
    let scrollHeight = e.target.documentElement.scrollHeight
    let clientHeight = e.target.documentElement.clientHeight
    const isBottom = (scrollTop + clientHeight + 20) > scrollHeight

    //判斷滾動是否到底並且是否還須加載數據
    if (isBottom && !this.state.isEnd) {
      //取消滾動監聽事件，防止多次觸發 function
      window.removeEventListener('scroll', this.handleScroll, false);
      //開啟加載更多動畫
      this.setState({ isLoadingMore: true, page: this.state.page * 1 + 1 })
      //操作dom滾到最底
      window.scrollTo(0, document.body.scrollHeight);

      await axios.get(`https://api.github.com/users/${searchContent}/repos`,
        {
          params: {
            sort: 'id',
            per_page: 10,
            page: this.state.page
          }
        }
      )
        .then((response) => {
          let jsonData = []
          if (Object.keys(response.data).length === 0) {
            this.setState({ isEnd: true, isLoadingMore: false })
          } else if (Object.keys(response.data).length < 10) {
            setTimeout(() => {
              jsonData.push(...this.state.response, ...response.data)
              this.setState({ isEnd: true, isLoadingMore: false, response: jsonData })
            }, 500);
          } else {
            setTimeout(() => {
              jsonData.push(...this.state.response, ...response.data)
              this.setState({ isLoadingMore: false, response: jsonData })
              window.addEventListener('scroll', this.handleScroll)
            }, 500);
          }
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
                    value={this.state.searchContent}
                    onChange={this.changeEvent}
                  />
                  <Link to={`/users/${store.getState().searchContent}/repos`} onClick={this.clickEvent}>
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
              (this.state.isLoading) ? <Loading /> : <List response={this.state.response} />
            }
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {
              (this.state.isLoadingMore) ? <Loading /> : <div></div>
            }
          </Col>
        </Row>
      </Container>
    )
  }
}
