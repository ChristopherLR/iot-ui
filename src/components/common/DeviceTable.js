import React from 'react'
import { Table } from 'react-bootstrap'

const entry = (device) => {
  console.log(device)
  return (
    <tr>
      <td>{device.id}</td>
      <td>{device.device_name}</td>
      <td>{new Date(Number(device.creation_date)).toString()}</td>
    </tr>
  )
}

function DeviceTable(props) {
  const { devices } = props;

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Device Name</th>
          <th>Creation Date</th>
        </tr>
      </thead>
      <tbody>
        { devices.map((device) => { return entry(device) })}
      </tbody>
    </Table>
  )
}

export { DeviceTable };