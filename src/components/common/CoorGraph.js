import React from 'react'


function CoorGraph({field}) {
    field.nodes.reduce((prev, current) => (current.lat && current.lon && new Date(current.entryDate) >= new Date(prev.entryDate) ? current : prev));
    let node = null;
        if(node){

        }

}

export { CoorGraph };