import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client';
import { Card } from 'react-bootstrap'
import { useAppContext } from '../contexts'
import { JsonGraphs, Header, NumericGraph, CoorGraph } from './common'

const entriesq = gql`
query Entriesq($userId: Int, $numeric_count: Int = 100) {
  allDevices(condition: {userId: $userId}) {
    nodes {
      deviceName
      deviceKey
      fieldEntriesByDeviceId {
        nodes {
          fieldName
          valueType
          jsonDataEntriesByFieldId(last: $numeric_count, orderBy: ENTRY_DATE_ASC) {
            nodes {
              value
              entryDate
            }
          }
          locationDataEntriesByFieldId(last: $numeric_count, orderBy: ENTRY_DATE_ASC) {
            nodes {
              entryDate
              lat
              lon
            }
          }
          numericDataEntriesByFieldId(last: $numeric_count, orderBy: ENTRY_DATE_ASC) {
            nodes {
              entryDate
              value
            }
          }
          textDataEntriesByFieldId(last: $numeric_count, orderBy: ENTRY_DATE_ASC) {
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

  const display_field = (field, i) => {
    const { valueType } = field

    if (valueType == 'NUMERIC') {
         return (
            <NumericGraph key={'field'+i}  field={field}/>
         )
    }else if (valueType == 'COORDINATE') {
        return (
            <CoorGraph key={'field'+i}  field={field}/>
        )
    }else if(valueType == 'JSON'){
      return (
            <JsonGraphs key={'field'+i} field={field}/>
        )
    }
    return null
  }
  
  const display_graphs = (device, index) => {
    return (
        <div className="card my-3" key={index}>
            <Card.Header>{device.deviceName}</Card.Header>
            <Card.Body style={{ display: 'flex', justifyContent: 'space-around', flexFlow: 'row wrap'}}>
                {device.fieldEntriesByDeviceId.nodes.map((entry, i) => display_field(entry, i)) }
            </Card.Body>
        </div>
    )
  }

function GraphsPage(props){
    const { user } = useAppContext();
    const { device } = useParams();
    const { loading: field_loading, data: field_data, error: field_error } = useQuery(entriesq, {
        variables: {
            userId: user.user.id,
            numeric_count: 100
        },
        pollInterval: 500,
    })

    if (!user || !user.user) return <Redirect to="/login" />
    if (user == null) return <Redirect to="/login" />
    if (field_loading) return "Loading";
    if (field_error) return `FieldError: ${field_error}`;
    return (
        <>
            <Header user={user} />
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <div style={{ width: "80%" }}>
                    {field_data.allDevices.nodes.map((x,i) => display_graphs(x,i)) }
                </div>
            </div>
        </>
    )
}

export { GraphsPage };