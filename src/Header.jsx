import './Header.css'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import About from './About'
import Home from './Home'
import React from 'react'

const meImg = require('./images/me.png')
const title = 'David Brown\'s Blog'
const subtitle = 'This is where I express all my inter most thoughts about all the things.'
const pages = 'Pages'
const linkx = [
  {
    comp: (
      <About />
    ),
    text: 'About',
    to: '/about'
  },
  {
    comp: (
      <Home />
    ),
    text: 'Home',
    to: '/'
  }
]

// eslint-disable-next-line max-lines-per-function
const Header = () => (
  <div id="root-header">
    <div id="title-root">
      <img
        alt="David Brown"
        id="me-image"
        src={meImg}
      />
      <div id="header-left-title">
        <div id="header-right-title" >
          <h1>
            {title}
          </h1>
          <h2>
            {subtitle}
          </h2>
        </div>
      </div>
    </div>
    <div id="menus-root">
      <div id="router-root">
        <Router>
          <div className="dropdown">
            <button
              className="dropbtn"
              type="button"
            >
              {pages}
            </button>
            <div className="dropdown-content">
              {linkx.map((value) => (
                <Link
                  key={`link-${value.to}`}
                  to={value.to}
                >
                  {value.text}
                </Link>))}
            </div>
          </div>
          <Switch>
            {linkx.map((value) => (
              <Route
                key={`route-${value.to}`}
                path={value.to}
              >
                {value.comp}
              </Route>
            ))}
          </Switch>
        </Router>
      </div>
    </div>
  </div>
)
export default Header
