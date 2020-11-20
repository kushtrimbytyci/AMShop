import React,{useState, useEffect} from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import {hideModalAction} from '../store/actions/modalActions'
import axios from 'axios'
import { connect } from 'react-redux'


const EditAdminProductListModal = ({modal:{showModal}, hideModalAction,name,price,image,brand,countInStock,category,description,id,setProductList}) => {
    const [list, setList] = useState({name,price,image,brand,countInStock,category,description,id})


useEffect(()=>{
  setList({name,price,image,brand,countInStock,category,description,id})
  // eslint-disable-next-line
},[id])

    const changeHandler = e=>{
       setList({...list,[e.target.name]:e.target.value})
    }

    return (
        <>
        <Modal show={showModal} onHide={hideModalAction} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="Text" value={list.name} name='name' onChange={changeHandler}/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
        <Form.Label>Price</Form.Label>
        <Form.Control type="Text" value={list.price} name='price' onChange={changeHandler}/>
        </Form.Group>
        <Form.Group controlId="formBasicName">
        <Form.Label>Image</Form.Label>
        <Form.Control type="Text" value={list.image} name='image' onChange={changeHandler}/>
        </Form.Group>
        <Form.Group controlId="formBasicName">
        <Form.Label>Brand</Form.Label>
        <Form.Control type="Text" value={list.brand} name='brand' onChange={changeHandler}/>
        </Form.Group>
        <Form.Group controlId="formBasicName">
        <Form.Label>Count in stock</Form.Label>
        <Form.Control type="Text" value={list.countInStock} name='countInStock' onChange={changeHandler}/>
        </Form.Group>
        <Form.Group controlId="formBasicName">
        <Form.Label>Category</Form.Label>
        <Form.Control type="Text" value={list.category} name='category' onChange={changeHandler}/>
        </Form.Group>
        <Form.Group controlId="formBasicName">
        <Form.Label>Description</Form.Label>
        <Form.Control type="Text" value={list.description} name='description' onChange={changeHandler}/>
        </Form.Group>
        </Modal.Body>
       
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{
            hideModalAction()
              }}>
            Close
          </Button>
          <Button variant="primary" onClick={async()=>{
                try {
                    await axios.put(`/api/products/update/${id}`,list)
                    const {data} = await axios.get('/api/products')
                    setProductList(data.data)
                    hideModalAction()
                } catch (error) {
                    // ignore in development
                }
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

const mapStateToProps = state=>{
  return {
    modal:state.modal
  }
}
export default connect(mapStateToProps,{hideModalAction})(EditAdminProductListModal)
