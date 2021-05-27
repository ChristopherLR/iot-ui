import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom'
import { gql, useLazyQuery } from '@apollo/client';
import { Card } from 'react-bootstrap'
import { useAppContext } from '../contexts'
import { Header, NumericGraph } from './common'

const deviceq = gql`
query Devices($query: DeviceInput!) {
	device(query: $query) {
    count
    data {
      id
      device_name
      device_key
      creation_date
      field_entries {
        id
        field_name
        value_type
      }
    }
  }
}
`

const entriesq = gql`
query Fields($query: FieldInput!, $numeric_count: Int, $json_count: Int, $location_count: Int, $text_count: Int) {
  field(query: $query, numeric_count: $numeric_count, json_count: $json_count, location_count: $location_count, text_count: $text_count){
    count
    data {
      id
      field_name
      value_type
      numeric_data_entries {
        reference
        entry_date
        value
      }
    }
  }
}
`

const display_field = (field) => {
    console.log(field)
    const { value_type } = field
    if (value_type == 'numeric') return (
        <Card style={{ width: "48%"}}>
            <NumericGraph field={field}/>
        </Card>
    )
    return null
}

const display_graphs = (device, fields) => {
    const { device_name } = device;
    console.log(device_name)
    return (
        <>
            <Card.Header>{device_name}</Card.Header>
            <Card style={{ display: 'flex', justifyContent: 'space-around', flexFlow: 'row wrap'}}>
                {fields ? fields.map((field) => { return display_field(field) }) : null }
            </Card>
        </>
    )
}

function GraphsPage(props){
    const { user } = useAppContext();
    const { device } = useParams();
    const [ getFields, { loading: device_loading, data: device_data, error: device_error }] = useLazyQuery(deviceq)
    const [ getEntries, { loading: field_loading, data: field_data, error: field_error }] = useLazyQuery(entriesq)
    var field_map = new Object();
    var device_map = new Object();
    const [ data_map, set_data_map] = useState('');

    useEffect(() => {
        if (user.user && !device_data){
            console.log(user.user.id)
            getFields({
                variables: {
                    query: {
                        user_id: Number(user.user.id)
                    } 
                }
            })
        }
        if (device_data && device_data.device){
            let fields = []
            device_data.device.data.map((device) => {
                device.field_entries.map((entry) => {
                    fields.push(entry.id)
                })
            })
            getEntries({
                variables: {
                    query: {
                        id: fields
                    },
                    numeric_count: 100
                }
            })
        }

        if (field_data && field_data.field){
            device_data.device.data.map((device) => {
                device.field_entries.map((entry) => {
                    field_map[entry.id] = Number(device.id);
                })
            })
            field_data.field.data.map((field) => {
                if (!device_map[field_map[field.id]]){
                    console.log(field_map)
                    console.log(field_map[field.id])
                    device_map[field_map[field.id]] = []
                    device_map[field_map[field.id]].push(field)
                } else {
                    device_map[field_map[field.id]].push(field)
                }
            })
            set_data_map(device_map)
        }
    }, [device_data, field_data])

    if (user.user == null) return <Redirect to="/login" />
    if (device_loading || field_loading) return null;
    if (device_error || field_error) return `DeviceError: ${device_error} FieldError: ${field_error}`;
    if (device_data) console.log(device_data.device)
    if (field_data) console.log(field_data)
    if (!device_data || !field_data) return "Loading";
    console.log(data_map)

    return (
        <>
            <Header user={user.user} />
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Card style={{ width: "80%" }}>
                    { 
                        device_data.device ? 
                        device_data.device.data.map((device) => { 
                            return display_graphs(device, data_map[device.id])
                        }) 
                        : null 
                    }
                </Card>
            </div>
        </>
    )
}

export { GraphsPage };