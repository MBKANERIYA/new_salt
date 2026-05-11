import React from 'react'

const Shimmer = ({type }) => {
    return (
        <>
            {type === "banner" ? (
                <div className="shimmer-box shimmer-banner"></div>
            ) : (
                <div className="card shimmer-card border-0">
                    <div className="shimmer-box shimmer-img"></div>
                    <div className="card-body">
                        <div className="shimmer-box shimmer-title"></div>
                        <div className="shimmer-box shimmer-price"></div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Shimmer