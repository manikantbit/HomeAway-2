import React, {Component} from 'react';
import usFlag from './us-flag.png';
import {blueLogo,whiteLogo,blueBird,whiteBird} from '../config';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import {Link} from 'react-router-dom';

class NavbarOwner extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout(){
        console.log("Logout")
        localStorage.clear();
        this.props.logout(function(response){
            if(this.props.out.status ==="success"){
            this.props.history.push('/logout');
            }
        })
    }
    render(){
        let toggleLogin = null;
        let inbox = null;
        var navLinks = null;
        const token = localStorage.getItem('token')
        if(token !=="") {
            inbox = (<li><Link to='/inbox' className = "nav-blue" ><i class="far fa-envelope"></i></Link></li>)
            navLinks = (
                <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">My Account <i className="fas fa-caret-down"></i></a>
                <ul className="dropdown-menu">
                <li><Link to='/inbox'>Inbox</Link></li>
                <li><Link to='/ownerhome'>Dashboard</Link></li>
                <li><Link to="/ownerhome">Property Details</Link></li>
                <li><Link to="#">Property Archive</Link></li>
                <li><Link to="/addnewprop">Add New Property</Link></li>
                <li><Link to="/logout" onClick={this.logout} className="logout-btn">Sign out</Link></li>
                </ul>
                </li>
                {inbox}
                 <li><i className="far fa-bell fa-2x" style={{margin:'10px'}}></i></li>
                 <a href='#'><img alt="" src = {blueBird}/></a>
                 </ul>
            )
        }
        return (
            <div className="container-fluid" style={{borderBottom:'1px solid grey'}}>
            <nav className="navbar" style={{marginTop:'25px'}}>
                <div className = "navbar-header">
                <a href="#" style={{width:'20px',height:'30px', paddingRight:'20px'}}><i class="fas fa-bars fa-2x"></i></a>
                <Link to= '#' title = "HomeAway.com">
                     <img alt="Homeaway Logo" src = {blueLogo}></img>
                 </Link>
                 </div>
                 {navLinks}
            
            </nav>
            </div>
        )
    }
}
NavbarOwner.propTypes = {
    logout: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired  
}

function mapStateToProps(state){
    return {login: state.login, out:state.login}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NavbarOwner);