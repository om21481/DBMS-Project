import React, { useState } from 'react'
import axios from 'axios'

const PostAxios = () => {
    const [userName, createUser] = useState('')
  //   const onSubmit = async (e) => {
  //     e.preventDefault()
  //     // const post = { userName: userName }
  //     try {
  //       const res = await axios.post('http://localhost:3001/users', post)
  //       console.log(res.data)
  //     } catch (e) {
  //       alert(e)
  //     }
  //   }
  
      const fun1 = async() =>{
          const response = await axios.post("http://localhost:9000/post");
          console.log(response.data);

          const response2 = await axios.get("http://localhost:9000/post");
          console.log(response2.data);
      }
    return (
      // <div className="container mt-2">
      //   <h2>React HTTP Post Request Example</h2>
      //   <form onSubmit={onSubmit}>
      //     <div className="mb-2 mt-3">
      //       <input
      //         type="text"
      //         placeholder="Name"
      //         className="form-control"
      //         onChange={(event) => {
      //           createUser(event.target.value)
      //         }}
      //         value={userName}
      //       />
      //     </div>
      //   </form>
      // </div>
          <button onClick={() => fun1()}>Create</button>
    )
  }

export default PostAxios;


// axios({
//   method: 'get',
//   url: `https://api.someurl.com/subject/v2/resource/somevalue`,
//   withCredentials: false,
//   params: {
//     access_token: SECRET_TOKEN,
//   },
// });
