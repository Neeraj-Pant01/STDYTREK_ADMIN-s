import "./barchart.css"
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts'

const Barchart = ({ data }) => {
    return (
        <div className="barchart text-[white]">
            <b>{
                data?.title
            }</b>
            <div className='barchart-wrapper'>
                <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={data?.Chartdata}>
                        <Tooltip
                            contentStyle={{ background: "#2a3447", borderRadius: "5px" }} labelStyle={{ display: "none" }} cursor={{ fill: "none" }}
                        />
                        <Bar dataKey={data?.key} fill={data?.color} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Barchart
