import React from 'react'
import "./home.css"
import CourseDetails from '../../components/corsedetails/CourseDetails'
import ChartBox from '../../components/chartbox/ChartBox'
import { accountData, barChartData, barChartData2, courseData, totalRatio, userData } from '../../data'
import Piechart from '../../components/piechart/Piechart'
import Barchart from '../../components/barchart/Barchart'
import AreaChart from '../../components/areachart/AreaChart'


const Homepage = () => {
  return (
    <div className='flex main'>
      <div className='boxes'>
      <div className="box box1">
        <CourseDetails />
      </div>
      <div className="box box2">
        <ChartBox data={courseData} />
      </div>
      <div className="box box3">
      <ChartBox data={userData} />
      </div>
      <div className="box box4">
        <Piechart />
      </div>
      <div className="box box5">
      <ChartBox data={accountData} />
      </div>
      <div className="box box6">
      <ChartBox data={totalRatio} />

      </div>
      <div className="box box7">
        <AreaChart />
      </div>
      <div className="box box8">
        <Barchart data={barChartData}/>
      </div>
      <div className="box box9">
        <Barchart data={barChartData2} />
      </div>
      </div>
    </div>
  )
}

export default Homepage
