import React from 'react'
import './Sideitem.css';

function Sideitem({Icon , Name , active}) {
  return (
    <>
    <div className={active ? 'sideitem active' : 'sideitem'}>
     <Icon className="icon" />
     <span>{Name}</span>
    </div>
    </>
  )
}

export default Sideitem