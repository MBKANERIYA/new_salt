import React from 'react'
import Uprofile from './Uprofile'
import Wishlist from '../Pages/Process/Wishlist'

const Uwishlist = () => {
  return (
    <div>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 m-0 p-0'>
                    <div>
                        <Uprofile />
                    </div>
                </div>
                <div className='col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12'>
                    <div className='wishlist_uprofile'>
                        <Wishlist />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Uwishlist