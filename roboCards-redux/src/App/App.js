import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardList from './CardList/CardList';
import SearchBox from './SearchBox/SearchBox';
import './App.css'
import Scroll from './Scroll/Scroll';
import ErrorBoundry from './ErrorBoundry/ErrorBoundry';

import { setSearchField, requestRobots } from '../actions'

const mapStateToProps = state => {
  return {
    searchField: state.searchRobotReducer.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}


class App extends Component {

  componentDidMount() {
    this.props.onRequestRobots()
  }

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
    if (isPending) {
      return <h1 className="tc">Loading...</h1>
    } else {
      return (
        <div className="tc" >
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      )
    }

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);