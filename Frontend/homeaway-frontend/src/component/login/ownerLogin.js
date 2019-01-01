import React, {Component} from 'react';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import LoginForm from './loginForm';

class OwnerLogin extends Component {
    state ={
        msg: ''
    }   
    login =(values) =>{
        values["type"] = "owner";
        //axios.defaults.withCredentials = true;
        axios.post("/login",values)
        .then(response=>{
                console.log(response.data)
                this.props.fetchLogin(response)
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('email',response.data.email)
                localStorage.setItem("type", response.data.type);
                this.setState({msg:""})
                this.props.history.push('/ownerhome')
        })  
        .catch(err=>{
            this.setState({msg:"Username/Password is not correct"})
        })
    }
    render(){
        let redirectVar = null;
        return (
            <div className='container-fluid'>
            {redirectVar}
            <Navbar logoFlag={true}/>
            <div className="col-md-6 col-sm-6" style={{marginTop:'20px'}}>
            <a id="personyzeContent" style={{background: "url('//csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png') no-repeat top right", outline:'none'}}></a>
            </div>
            <div className="col-offset-sm-6 col-sm-4" style={{border:'1px solid grey',margin:'20px',padding:'20px'}}>
                {this.state.msg!==""?
                <div className="alert alert-danger fade in">
        			<a href="#" className="close" data-dismiss="alert"></a>
        			<strong>Error!</strong> {this.state.msg}
    		</div>:null}
                <h2 style={{color:'#666',fontSize:'22px',fontWeight:'300',borderBottom: '1px solid #dbdbdb'}}>Owner Login</h2>
                <LoginForm onSubmit={this.login}/> 
                <div className='row'/>
                <div className="checkbox">
                <label><input type="checkbox"/> Keep me signed in</label>
                </div>
                <h4>Need an owner account?<Link to='/ownersignup'>  Sign Up</Link></h4>
            </div>
            <Footer/>
            </div>
        )
    }
}
OwnerLogin.propTypes = {
    fetchLogin: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired  
}

function mapStateToProps(state){
    return {login: state.login, error:state.login.error}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(OwnerLogin);