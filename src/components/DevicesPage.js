import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Card } from 'react-bootstrap'
import { useAppContext } from '../contexts'
import { Header } from './common';
import { Table } from 'react-bootstrap'

const allDevicessq = gql`
query AllDevices {
  allDevices {
    nodes {
      deviceKey
      deviceName
      id
      userId
      creationDate
    }
  }
}`

const updateUserId = gql`
mutation MyMutation($deviceKey: String!, $userId: Int) {
  updateDeviceByDeviceKey(
    input: {deviceKey: $deviceKey, devicePatch: {userId: $userId}}
  ) {
    device {
      deviceKey
      deviceName
    }
  }
}`

function rowClicked(device_key, updateDevice){
  console.log(device_key + " : " + userId);
  updateDevice({
    variables: {
        deviceKey: device_key,
        userId: userId
    }
  });
}

const displayList = (device, i, updateDevice) => {
  let [month, date, year] = new Date(device.creationDate).toLocaleDateString("en-US").split("/")
  return (
    <tr onClick={(e) => rowClicked(device.deviceKey, updateDevice)} key={device.id}>
      <td className="large-dot" style={{color: (device.userId == userId ? 'green' : 'red')}}>⬤</td>
      <td>{device.id}</td>
      <td>{device.deviceName}</td>
      <td>{date}/{month}/{year}</td>
      <td>{device.userId}</td>
    </tr>
  )

}
var userId = -1;
function DevicesPage(props){
    const { user } = useAppContext();
    const { device } = useParams();
    const { loading: field_loading, data: field_data, error: field_error } = useQuery(allDevicessq, {
      pollInterval: 500,
    })
      
    const [ updateDevice, { data: mutate_data }] = useMutation(updateUserId)

    if(user && user.user && user.user.id) {userId = user.user.id;}
    if (!user || !user.user) return <Redirect to="/login" />
    if (field_loading) return "Loading";

    return (
        <>
            <Header user={user.user} />
            <div className="mt-5" style={{ display: 'flex', justifyContent: 'center'}}>
                <div style={{ width: "80%" }}>
                    
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>ID</th>
                      <th>Device Name</th>
                      <th>Creation Date</th>
                      <th>Current User</th>
                    </tr>
                  </thead>
                  <tbody>
                  { field_data.allDevices.nodes.map((x,i) => displayList(x,i,updateDevice )) }

                  </tbody>
                </Table>
                </div>
            </div>
        </>
    )
}

export { DevicesPage };