import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client';
import { Form, FormControl, Button, FormLabel, FormGroup } from 'react-bootstrap'
import { useAppContext } from '../contexts/state'
import "../styles/app.scss"
import { Redirect, useHistory } from 'react-router-dom'

// const query = gql`
//   query User($username: String!, $password: String!){
//     user(username: $username, password: $password){
//       id
//       username
//       firstname
//       lastname
//       devices {
//         id
//         device_name
//         creation_date
//       }
//     }
//   }
// `

const query = gql`
query MyQuery($username: String!) {
  userByUsername(username: $username) {
    firstname
    id
    lastname
    nodeId
    username
    devicesByUserId {
      edges {
        node {
          id
          creationDate
          deviceKey
          deviceName
        }
      }
    }
  }
}
`

function LoginPage (props) {
  const history = useHistory();
  const [username, set_username] = useState('')
  const [password, set_password] = useState('')
  const [ getUser, { loading, data }] = useLazyQuery(query)
  const { dispatch, user } = useAppContext();

  function handle_submit(user, pass){
      getUser({
          variables: {
              username: user
          }
      })
  }

  useEffect(() => {
    if (data){
      console.log(data)
        dispatch({
            type: "LOGIN_USER",
            payload: data.userByUsername,
        })
    }
  }, [loading])

  if (loading) return <>Loading...</>

  if (user.user) history.push("/user/home")

  return (
    <div className="login-wrap">
      <Form className="form-signin" onSubmit={handle_submit}>
        <img className="mb-4" alt="" width="200" height="200" src="/iot-pic.svg" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <FormGroup>
          <FormLabel>Username</FormLabel>
          <FormControl type="text" className="mr-sm-2" onChange={(e) => set_username(e.target.value)}/>
        </FormGroup>
        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormControl type="password" className="mr-sm-2" onChange={(e) => set_password(e.target.value)}/>
        </FormGroup>
        <br />
        <Button className="btn-lg btn-block" variant="secondary" onClick={() => handle_submit(username, password)}>Sign In</Button> 
      </Form>
      { loading && <p>loading..</p> }
    </div>
  )
}

export { LoginPage };