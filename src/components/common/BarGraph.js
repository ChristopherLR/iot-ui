import React from 'react'
import { Bar } from 'react-chartjs-2'

function BarGraph({ field }){
    const { jsonDataEntriesByFieldId, fieldName } = field;
    const entries = {};
    const labels = [];
    if(!jsonDataEntriesByFieldId || !jsonDataEntriesByFieldId.nodes) return null

    keys = Object.entries(jsonDataEntriesByFieldId.nodes[0]).map(x => x[0]);
    entries = keys.forEach(x => entries[entries.length-1] = []);
    jsonDataEntriesByFieldId.nodes.foreach((entry) => {
        labels.push(new Date(entry.entryDate).toLocaleString('en-GB', { timeZone: 'Australia/Sydney'}));
        keys.foreach(x => {
            entries[x] = entry[x] ? entry[x] : 0;
        });
    })
    console.log()
    if(!entries.length) { return null }
    const data = {
        labels: labels,
        datasets: entries.map(x => {
            return {
                label: x,
                backgroundColor: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},0.4)`,
                pointHoverBorderWidth: 2,
                data: entries[x]
              }
        })
    }
    return (
        <div>
            <BarGraph data={data} />
        </div>
    )
}

export { Bar };