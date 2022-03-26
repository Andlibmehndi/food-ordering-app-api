import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { login } from '../../Redux/Action/loginAction'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import loginImg from './login.png'
const FormItem = Form.Item;


class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.loginData !== this.props.loginData){
            const response = nextProps.loginData;
            if(response.success){
                message.success(response.message);
                setTimeout(() => {
                    this.props.history.push('restaurant')
                }, 1000);
            }else{
                message.error(response.message)
            }
        }
    }

    componentDidMount(){
        localStorage.clear();
    }

    handleSubmit = e => {
        e.preventDefault();
        const loginRequest = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(loginRequest)
    };

    handleEmail = e => {
        this.setState({ email: e.target.value });
    };

    handlePassword = e => {
        this.setState({ password: e.target.value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className={"lContainer"}>
                    <div className="lItem">
                        <div className="loginImage">
                            <img src={loginImg} width="300" style={{ position: 'relative' }} alt="login" />
                        </div>
                        <div className="loginForm">
                            <h2>Login</h2>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('email', {
                                        rules: [
                                            { type: 'email', message: 'The input is not valid E-mail!' },
                                            { required: true, message: 'Please input your E-mail!' },
                                        ],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            placeholder="email"
                                            onChange={this.handleEmail}
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator("password", {
                                        rules: [{ required: true, message: "Please enter your Password" }]
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                                            type="password"
                                            placeholder="Password"
                                            onChange={this.handlePassword}
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                    >
                                        Log in
                                    </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                    <div className="footer">
                        <a href="" target="_blank" rel="noopener noreferrer" className="footerLink">Powered by React</a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loginData: state.login.loginResult
})

const mapDispatchToProps = {
    login
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login)))
