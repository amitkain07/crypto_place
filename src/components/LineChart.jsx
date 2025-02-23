import React, { useEffect  , useState} from 'react'
import Chart from 'react-google-charts'

const LineChart = ({historicalData, name}) => {

    const [data , setData] = useState(['Date' , 'Prices'])

    useEffect(() =>{

        let dataCopy = [['Date' , 'Prices']]
        // if(historicalData){
            historicalData?.map((item) => {
               dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0, -5)}`, item[1]])
            })
            setData(dataCopy)
        // }

    } , [historicalData])

  return (
    <div className='flex flex-col w-full justify-center gap-2'>
        <h1 className='text-center p-2'>{name}</h1>
    <Chart
        chartType='LineChart'
        data={data}
        height="100%"
        legendToggle
    />
    </div>
  )
}

export default LineChart