import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

export default class Form extends Component {
    // create states here
    state = {
        name: '',
        email: '',
        message: '',
        sent: false,
        successMsg: ''
    }

    // handle changes in inputs in form
    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    // form submission (handle submission event)    
    formSubmit = (e) => {
        e.preventDefault();

        let data = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message
        }

        // create a post request using axios
        axios.post('/api/forma', data)
            .then(res => {
                this.setState({
                    sent: true,
                    successMsg:
                            <div>
                                <h1>Message Sent!</h1>
                            </div>
                },

                    // this is the function called to reset the form to original after submitting the message
                    this.resetForm())
            })
            .catch(() => {
                // in case of error, log an error message
                console.log('Message not sent.');
            })
    }

    // set initial data (reset form back to empty inputs)
    resetForm = () => {
        this.setState({
            name: '',
            email: '',
            message: ''
        })

        // status of message sent should be false again after previous submission
        setTimeout(() => {
            this.setState({
                sent: false
            })
        }, 3000)
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <h1>
                        Contact Form
                    </h1>
                </header>
                {/* Form starts here */}
                <form onSubmit={this.formSubmit}>
                    <input
                        name='name'
                        placeholder='Full Name'
                        type='text'
                        value={this.state.name}
                        onChange={this.handleName}
                        required
                    ></input>
                    <br></br>
                    <input
                        name='email'
                        placeholder='Email Address'
                        type='email'
                        value={this.state.email}
                        onChange={this.handleEmail}
                        required
                    ></input>
                    <br></br>
                    <textarea
                        name='message'
                        placeholder='Your Message...'
                        type='textarea'
                        value={this.state.message}
                        onChange={this.handleMessage}
                        required
                    ></textarea>
                    <br></br>
                    {this.state.successMsg}
                    <br></br>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
