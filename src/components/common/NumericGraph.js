import React from 'react'
import { Line } from 'react-chartjs-2'

function NumericGraph({ field }){
    const { numericDataEntriesByFieldId, fieldName } = field;
    const entries = [];
    const labels = [];
    if(!numericDataEntriesByFieldId || !numericDataEntriesByFieldId.nodes) return null

    numericDataEntriesByFieldId.nodes.map((entry) => {
        labels.push(new Date(entry.entryDate).toLocaleString('en-GB', {timeZone: 'Australia/Sydney'}));
        entries.push(entry.value)
    })
    if(!entries.length) { return null }
    const data = {
        labels: labels,
        datasets: [
            {
              label: fieldName,
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: entries
            }
          ]
    }
    return (
        <div className="card" style={{ width: "48%"}}>
            <Line data={data} options={{animation: {duration: 0}}} />
            </div>    
        )
}

export { NumericGraph };