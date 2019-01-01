import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import SignupForm from './signupForm';

class Form extends Component {
    state={
        msg:'',
        navigate: null,
    }
    createUser=(values) =>{
        let obj = this;
        values['type'] = this.props.type;
        //axios.defaults.withCredentials = true;
        //this.props.fetchSignup(values);
        axios.post('/signup',values)
        .then(response=>{
            console.log(response.status)
            localStorage.setItem('token',response.data.token);
            localStorage.setItem("email",response.data.email);
            localStorage.setItem("type", response.data.type);
            console.log(response.data.type)
            if(response.data.type === "user") {
                this.setState({navigate: (<Redirect to='/signuphome'/>)})
            } else {
                this.setState({navigate: (<Redirect to='/ownerhome'/>)})
            }
            obj.props.fetchLogin(response)
        })
        .catch(err=>{
            this.setState({msg:"Email ID already exists"})
        })
    }
    render() {
        return (
                <div>
                {this.state.msg!='' ?
                <div className="alert alert-danger fade in">
        			<a href="#" className="close" data-dismiss="alert"></a>
        			<strong>Error!</strong> {this.state.msg}
    			</div> :null}
                {this.state.navigate}
                <SignupForm onSubmit={this.createUser}/>
                <div className='row'/>
            </div>
        )
    }
}

Form.propTypes = {
    fetchSignup: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired  
}

function mapStateToProps(state){
    return {login: state.login,error: state.login.error}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Form);
