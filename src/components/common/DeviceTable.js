import React from 'react'
import { Table } from 'react-bootstrap'

const entry = (device) => {
  console.log(device.node.creationDate)
  let [month, date, year] = new Date(device.node.creationDate).toLocaleDateString("en-US").split("/")
  return (
    <tr key={device.node.id}>
      <td>{device.node.id}</td>
      <td>{device.node.deviceName}</td>
      <td>{date}/{month}/{year}</td>
    </tr>
  )
}

function DeviceTable(props) {
  const { devices } = props;

  console.log(devices)
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