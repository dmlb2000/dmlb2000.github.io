import './App.css'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import About from './About'
import Footer from './Footer'
import Header from './Header'
import Home from './Home'
import React from 'react'

const App = () => {
  const compPathMap = {
    about: About
  }
  const routeList = []
  for (const [
    // eslint-disable-next-line no-unused-vars
    key,
    // eslint-disable-next-line no-unused-vars
    value
  ] of Object.entries(compPathMap)) {
    routeList.push((
      <Route
        component={value}
        key={`root-route-${key}`}
        path={`/${key}`}
      />
    ))
  }
  return (
    <div className="root-float">
      <Router>
        <Header />
        <Route
          component={Home}
          exact
          path="/"
        />
        {routeList}
        <Footer />
      </Router>
    </div>
  )
}

export default App
