import React,{useState} from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import {hideCreateProductModalAction} from '../store/actions/modalActions'
import axios from 'axios'
import { connect } from 'react-redux'
import Spinner from './Spinner'


const CreateProductAdminModal = ({modal:{showCreateProductModal}, hideCreateProductModalAction,setProductList}) => {
    const [list, setList] = useState({name:'',price:'',image:'',brand:'',countInStock:'',category:'',description:'',id:''})
    const [uploading, setUploading] = useState(false)

    const changeHandler = e=>{
       setList({...list,[e.target.name]:e.target.value})
    }

    const uploadFileHandler =async (e)=>{
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image',file)
      setUploading(true)

      try {
        const config = {
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }
        const {data} = await axios.post('/api/upload',formData,config)
        setList({...list,image:data})  
        setUploading(false)
      } catch (error) {
        console.log(error)
      }
    }

    
    return (
        <>
        <Modal show={showCreateProductModal} onHide={hideCreateProductModalAction} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Show</Modal.Title>
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
        <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}>
        </Form.File>
        {uploading && <Spinner/>}
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
            hideCreateProductModalAction()
              }}>
            Close
          </Button>
          <Button variant="primary" onClick={async()=>{
                try {
                    await axios.post('/api/products/add/singleproduct',list)
                    const {data} = await axios.get('/api/products')
                    setProductList(data.data)
                    hideCreateProductModalAction()
                    setList({name:'',price:'',image:'',brand:'',countInStock:'',category:'',description:'',id:''})
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
export default connect(mapStateToProps,{hideCreateProductModalAction})(CreateProductAdminModal)
