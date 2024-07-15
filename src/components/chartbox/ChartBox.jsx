import "./chartbox.css"
import {ResponsiveContainer, LineChart, Line, Tooltip} from "recharts"
import {BiSolidBarChartSquare} from "react-icons/bi"
import {Link} from "react-router-dom"


const ChartBox = ({data}) => {

    console.log(data?.Chartdata)
  return (
    <div className=" flex w-full h-full">
        <div className="productInfo flex flex-col gap-5 text-[white]">
            <div className="flex items-center gap-3">
                <BiSolidBarChartSquare className="text-[#5656a0] text-3xl"/>
                <span className="text-sm">Total Users</span>
            </div>
            <h1 className="text-[white] text-3xl">11,001</h1>
            <Link className="text-[lightblue] text-sm">view All</Link>
        </div>
        <div className="chartInfo flex flex-col">
            <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data?.Chartdata}>
            <Tooltip contentStyle={{background:"transparent", border:"none"}}
            labelStyle={{display:"none"}}
            position={{x:10, y:60}}/>
          <Line type="monotone" dataKey={data?.key} stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
            </div>
            <div>
                <h1 className={`${data?.percentage < 0 ? 'text-[tomato]' : "text-[green]"}`}>{data?.percentage}%</h1>
                <span className="text-[lightgrey] text-xs">this month</span>
            </div>
        </div>
    </div>
  )
}

export default ChartBox
