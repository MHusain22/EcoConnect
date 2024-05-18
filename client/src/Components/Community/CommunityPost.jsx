import React from 'react'

const CommunityPost = ({posts}) => {
  return (
   
        <>
            {posts.map((item) => (
                <>
                    <p>{item.description}</p>
                    <img height="100px" width="200px" src={item.cover} alt="" />
                    
                </>

            ))}
        </>
  
  )
}

export default CommunityPost