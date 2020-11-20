import React,{useState,useEffect} from 'react'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {login} from '../store/actions/userAction'

const LoginScreen = ({history,login,location,user:{isAuthenticated,error,loading}}) => {
    const[userdata, setUserdata] = useState({email:'',password:''})

    
    const changeHandler = e =>{
        setUserdata({...userdata,[e.target.name]:e.target.value})
    }

    const submitHandler= e =>{
        e.preventDefault()
        login(userdata)
    }

    useEffect(()=>{
        if(isAuthenticated){
            history.push('/cart')
        }
        // eslint-disable-next-line
    },[isAuthenticated])

    return (
        <FormContainer>
                <h1>Sign in</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label>
                            Email address
                        </Form.Label>
                    <Form.Control value={userdata.email} type='email' placeholder='Enter email' name='email' onChange={changeHandler}>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>
                            Password
                        </Form.Label>
                    <Form.Control value={userdata.password} type='password' placeholder='Enter password' name='password' onChange={changeHandler}>
                    </Form.Control>
                    </Form.Group>
                        {error&&<Message variant='danger'>{error}</Message>}
                    <Button type='submit' variant='primary' className='btn-block'>Login</Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                    New customer? 
                    <Link className='ml-2 font-weight-bold' to='/register'>Register</Link>
                    </Col>
                </Row>
        </FormContainer>
    )
}

const mapStateToProps = state=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps,{login})(LoginScreen)
