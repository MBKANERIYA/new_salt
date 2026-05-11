import React from 'react'

const Helmet = (props) =>{
    document.title = "SALTANDGLITZ - "+ props.title;
    return <div>{props.children}</div>
 }

export default Helmet   