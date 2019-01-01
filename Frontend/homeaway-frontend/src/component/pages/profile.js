import React,{Component} from 'react';
import Navbar from '../layout/navbar';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import Footer from '../layout/footer';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import ProfileForm from './profileForm';


class Profile extends Component {
    componentDidMount(){
        let data = {email: this.props.login.email}
        //console.log(data)
        this.props.getProfile(data);
    }
    changeHandler=(e)=>{
        let formData = new FormData();
        formData.append('profile_image', e.target.files[0])
        formData.append('email',this.props.login.email)
        console.log(formData);
        this.props.postAvatar(formData);
    }
    updateUser=(values) =>{
        this.props.postProfile(values);
    }
    openDialog =() =>{
        document.getElementById('fileid').click();
     }
    selecter = () => {
        document.getElementById('js-edit-photo').addEventListener('click',this.openDialog);
    }    
    render(){
        let redirectVar = null;
        let changeMsg=null;
        /*if(this.props.login.token === ""){
            console.log("redirect")
            redirectVar = <Redirect to= "/"/>
        }*/
        if(this.props.login.status_profile ==="success"){
            changeMsg="Profile has been updated successfully"
        } 
        if(this.props.login.status_image ==="success"){
            changeMsg="Profile Image has been updated successfully"
        }
        return (
            <div className ="container-fluid">
            {redirectVar}
            <Navbar logoFlag={true} navBlue={true}/>
            <ul className="nav nav-pills" style = {{borderBottom:'1px solid #dfdfdf',marginBottom:'40px'}}>
                <li><Link to="/inbox">Inbox</Link></li>
                <li><Link to="/mytrip">My trips</Link></li>
                <li className='tab'><Link to="/profile">Profile</Link></li>
                <li><Link to="#">Account</Link></li>
            </ul>
            {changeMsg!=null?
            <div className="alert alert-success fade in">
        			<a href="#" className="close" data-dismiss="alert"></a>
        			{changeMsg}
    		</div>:null}
            <div className="text-center">
                <form id='formid' action="" method="POST" enctype="multipart/form-data"> 
                 <img src={(this.props.login.profile_image!=='') ? "images/"+this.props.login.profile_image:'https://odis.homeaway.com/mda01/7f257b13-2434-404e-b967-285a6b7eca02.2.2'} className="avatar img-circle img-thumbnail" alt="avatar" style={{width:'100px',height:'100px'}}/>
                 <input id='fileid' type='file' name='profile_image' onChange={this.changeHandler} hidden ={true} style={{display:'none'}}/>
                 <button id="js-edit-photo" onClick={this.selecter} className="btn btn-default btn-profile" title="Add photo" type="button">
                 <i className="fas fa-pencil-alt"></i>
                </button> 
                </form>
                    <h2>{this.props.login.first_name} {this.props.login.last_name}</h2>
                    <h5>Member since 2018</h5>
            </div>
            <ProfileForm onSubmit={this.updateUser}/>
            <div style = {{margin:'100px',paddingTop:'50px'}}>
                <Footer/>   
            </div>
            </div>

        )
    }
}

Profile.propTypes = {
    login: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    postProfile: PropTypes.func.isRequired,
    postAvatar: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {login: state.login}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);