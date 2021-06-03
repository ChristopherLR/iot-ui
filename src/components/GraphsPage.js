import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom'
import { gql, useLazyQuery } from '@apollo/client';
import { Card } from 'react-bootstrap'
import { useAppContext } from '../contexts'
import { FieldCards, Header, NumericGraph } from './common'

const entriesq = gql`
query Entriesq($userId: Int, $numeric_count: Int = 100) {
    allDevices(condition: { userId: $userId }) {
      nodes {
        deviceName
        deviceKey
        fieldEntriesByDeviceId {
          nodes {
            fieldName
            valueType
            jsonDataEntriesByFieldId(first: $numeric_count) {
              nodes {
                value
                entryDate
              }
            }
            locationDataEntriesByFieldId(first: $numeric_count) {
              nodes {
                entryDate
                lat
                lon
              }
            }
            numericDataEntriesByFieldId(first: $numeric_count) {
              nodes {
                entryDate
                value
              }
            }
            textDataEntriesByFieldId(first: $numeric_count) {
              nodes {
                entryDate
                value
              }
            }
          }
        }
      }
    }
  }
  `
  const display_field = (field) => {
    const { valueType } = field
    console.log(field);
    if (valueType == 'NUMERIC') return (
        <Card style={{ width: "48%"}}>
            <NumericGraph field={field}/>
        </Card>
    )
    return null
  }
  
  const display_graphs = (device, index) => {
    console.log(device.deviceName);
    return (
        <div class="card my-3" key={index}>
            <Card.Header>{device.deviceName}</Card.Header>
            <Card.Body style={{ display: 'flex', justifyContent: 'space-around', flexFlow: 'row wrap'}}>
                {device.fieldEntriesByDeviceId.nodes.map(entry => display_field(entry)) }
            </Card.Body>
        </div>
    )
  }

function GraphsPage(props){
    const { user } = useAppContext();
    const { device } = useParams();
    const [ getEntries, { loading: field_loading, data: field_data, error: field_error }] = useLazyQuery(entriesq)
    const [ device_map, setDevice_map] = useState('');

    useEffect(() => {
        console.log("useEffect");
        if (user){
            console.log(user.user.id)
            getEntries({
                variables: {
                    userId: user.user.id,
                    numeric_count: 100
                }
            })
        }
        if (field_data){
            console.log(field_data)
            setDevice_map( field_data.allDevices.nodes);
            // device_map = field_data.allDevices.nodes;
        }
    }, [field_data])


    if (user == null) return <Redirect to="/login" />
    // if (field_loading) return null;
    // if (field_error) return `FieldError: ${field_error}`;
    if (!device_map) return "Loading";

    return (
        <>
            <Header user={user} />
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <div style={{ width: "80%" }}>
                    { device_map.map((x,i) => display_graphs(x,i)) }
                    {/* <FieldCards devices={device_map}></FieldCards> */}
                </div>
            </div>
        </>
    )
}

export { GraphsPage };