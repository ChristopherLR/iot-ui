import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client';
import { Header, DeviceTable } from './common'
import { useAppContext } from '../contexts/state'
import { Redirect, useParams } from 'react-router-dom'



function UserPage (props) {
    const { user } = useAppContext();
    const { name } = useParams();
    if (user.user == null) return <Redirect to="/login" />

    return (
        <>
            <Header user={user.user}/>
            <div>
                <br />
                <DeviceTable devices={user.user.devicesByUserId.edges}/>
            </div>
        </>
    )
}

export { UserPage };