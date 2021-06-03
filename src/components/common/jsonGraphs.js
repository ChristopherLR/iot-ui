import React from 'react'
import { Bar } from 'react-chartjs-2'

function JsonGraphs(props){
    if(!props.field || !props.field.jsonDataEntriesByFieldId){
        return null;
    }
    const { jsonDataEntriesByFieldId } = props.field;
    
    var entries = {};
    var labels = [];
    if(!jsonDataEntriesByFieldId || !jsonDataEntriesByFieldId.nodes || jsonDataEntriesByFieldId.nodes.length == 0){
        return null;
    }
    const keys = Object.entries(JSON.parse(jsonDataEntriesByFieldId.nodes[0].value)).map(x => x[0]);
    keys.forEach(x => entries[x] = []);
    jsonDataEntriesByFieldId.nodes.slice(-5).forEach((entry) => {
        labels.push(new Date(entry.entryDate).toLocaleString('en-GB', { timeZone: 'Australia/Sydney'}));
        var jsonEntry = JSON.parse(entry.value);
        keys.forEach(x => {
            entries[x].push((jsonEntry && jsonEntry[x]) ? jsonEntry[x] : 0);
        });
    })
    
    if(!labels.length) { return null }

    const mappedData = [];
    for(var key in entries){
        mappedData.push({
            label: key,
            backgroundColor: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},0.4)`,
            pointHoverBorderWidth: 2,
            data: entries[key]
        })
    }

    const data = {
        labels: labels,
        datasets: mappedData
    }


    return (
        <div className="card" style={{ width: "48%"}}>
            <Bar data={data} options={{animation: { duration: 0}}} />
        </div>
    )
}

export { JsonGraphs };