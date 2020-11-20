import React from 'react'
import {Alert} from 'react-bootstrap'
const Message = ({variant,children}) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

// If for any reason we don't send the variant prop, as default variant:'info' will be used, otherwise it will be overwritten.
Message.defaultProps = {
    variant:'info'
}

export default Message
