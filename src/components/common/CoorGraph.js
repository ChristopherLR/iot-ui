import React from 'react'

function getAddressFromCoordinates(latitude, longitude) {
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${process.env.REACT_APP_GEO_KEY}&at=${latitude}%2C${longitude}`
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    try{
        return JSON.parse(xmlHttp.responseText).items[0].title;
    }catch(e){
        return null;
    }
  }
function CoorGraph({field}) {
    const { locationDataEntriesByFieldId } = field;
    if(!field || !locationDataEntriesByFieldId || !locationDataEntriesByFieldId.nodes || !locationDataEntriesByFieldId.nodes.length){
        return null;
    } 
    let node = locationDataEntriesByFieldId.nodes.reduce((prev, current) => (current.lat && current.lon && new Date(current.entryDate) >= new Date(prev.entryDate) ? current : prev));
    
    if(!node || (node.lat == 0 && node.lon == 0)){
        return null
    }
    // var location = getAddressFromCoordinates(-33.77, 151.1)

    var location = getAddressFromCoordinates(node.lat, node.lon)
    
    return (      
        <div className="card" style={{ width: "48%"}}>
            <div className="card-header">Last recorded position</div>
            <div className="card-body"><p>{location}</p></div>
        </div>
    )
}

export { CoorGraph };