import React from 'react'
import { Line } from 'react-chartjs-2'

function NumericGraph({ field }){
    const { numeric_data_entries, field_name } = field;
    const entries = [];
    const labels = [];
    numeric_data_entries.map((entry) => {
        labels.push(new Date(Number(entry.entry_date)).toLocaleString('en-GB', { timeZone: 'UTC'}));
        entries.push(entry.value)
    })

    const data = {
        labels: labels,
        datasets: [
            {
              label: field_name,
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
        <div>
            <Line data={data} />
        </div>
    )
}

export { NumericGraph };