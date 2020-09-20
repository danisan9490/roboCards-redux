import React, { Component } from 'react';
import CardList from './CardList/CardList';
import SearchBox from './SearchBox/SearchBox';
import './App.css'
import Scroll from './Scroll/Scroll';
import ErrorBoundry from './ErrorBoundry/ErrorBoundry';
class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ""
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  onSearchChange = (e) => {
    this.setState({ searchfield: e.target.value });
  }

  render() {
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
    })
    if (this.state.robots.length === 0) {
      return <h1 className="tc">Loading...</h1>
    } else {
      return (
        <div className="tc" >
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
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

export default App;