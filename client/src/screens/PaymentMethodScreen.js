import React,{useState} from 'react'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {Form,Button,Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {savePaymentMethod} from '../store/actions/cartActions'


const PaymentMethodScreen = ({history,cart:{shippingAddress},savePaymentMethod}) => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    
    if(!shippingAddress){
        history.push('/shipping')
    }

    const submitHandler = e =>{
        e.preventDefault()
        savePaymentMethod(paymentMethod)
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select method</Form.Label>
            <Col>
            <Form.Check type='radio' label='PayPal or Credit Card' id='Paypal' name="paymentMethod" value='PayPal' checked onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
            <Form.Check type='radio' label='Stripe' id='Paypal' name="paymentMethod" value='Stripe' onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
            </Col>
            </Form.Group>
                <Button type='submit'>Continue</Button>
            </Form>
            
        </FormContainer>
    )
}

const mapStateToProps = state=>{
    return{
        cart:state.cart
    }
}

export default connect(mapStateToProps,{savePaymentMethod})(PaymentMethodScreen)
