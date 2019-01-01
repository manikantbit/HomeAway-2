import React, { Component } from 'react';
import Router from './component/route';
import {connect} from 'react-redux';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import * as actionCreators from './actions/actionCreators';
import { stat } from 'fs';

var type = require('./actions/types');

class App extends Component {

  state = {
     login : {}
  }

  componentWillMount() {
    let obj = this;

    axios.get("/session")
    .then(response=>{
      console.log(response.data);
      obj.props.sessionAction( response.data );

    })
  
  }

  render() {
    return (
      <div className="App">
        <Router/>
      </div>
    );
  }
}

function mapStateToProps(state) {

   return { user : state.user  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
