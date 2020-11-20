import React,{useState} from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import axios from 'axios'
import {connect} from 'react-redux'
import {showModalAction,hideModalAction} from '../store/actions/modalActions'
import { useEffect } from 'react'

const EditAdminUserListModal = ({modal:{showModal},hideModalAction,name,email,role,id,setUserList}) => {
  const [userInfo, setUserInfo] = useState({name,email,role,id})

  useEffect(()=>{
    setUserInfo({name,email,role,id})
    // eslint-disable-next-line
  },[id])


  const changeHandler = e=>{
    if(e.target.name==='role'){
      console.log(e.target.checked===true?'admin':'user')
      setUserInfo({...userInfo,role:e.target.checked===true?'admin':'user'})
      console.log(e.target.checked,userInfo.role)
    }else{
      setUserInfo({...userInfo,[e.target.name]:e.target.value})
    }
  }


  return (
    <>
      <Modal show={showModal} onHide={()=>{hideModalAction()
    setUserInfo({name,email,role,id})  }}>
      <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId={userInfo.name}>
        <Form.Label>Name</Form.Label>
        <Form.Control type="Text" value={userInfo.name} name='name' onChange={changeHandler}/>
        </Form.Group>
        <Form.Group controlId={userInfo.email}>
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" value={userInfo.email} name='email' onChange={changeHandler}/>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Is Admin?" name='role' value={userInfo.role} checked={userInfo.role==='admin'?true:false} onChange={changeHandler} />
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
                    await axios.put(`/api/update/${id}`,userInfo)
                    const {data} = await axios.get('/api/getallusers')
                    setUserList(data.data)
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
  );   
}


const mapStateToProps = state=>{
  return {
    modal:state.modal
  }
}

export default connect(mapStateToProps,{showModalAction,hideModalAction})(EditAdminUserListModal)
