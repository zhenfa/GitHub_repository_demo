import React, { Component } from 'react'
import ReactDOM from 'react-dom';
//引用路由組件
import{ Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { WrapComps } from './Components/WrapComps'

import App from './App'
import Page1 from './Pages/Page1'
import Page2 from './Pages/Page2'
import ErrorPage from './Pages/Page404'
//引入Store
import store from './Redux/store'
//引用bootstrap css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Main extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route exact={true} path="/users/:username/repos" element={<Page1 />}></Route>
          {/* <Route exact={true} path="/users/:username/repos/:repo" element={<Page2 {...this.props}/>}></Route> */}

          <Route exact={true} path="/users/:username/repos/:repo" element={ <WrapComps element={ Page2 } />}></Route>

          {/* 匹配不到路由狀況 */}
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </Router>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);

store.subscribe(()=>{
  ReactDOM.render(<Main />, document.getElementById('root'))
})