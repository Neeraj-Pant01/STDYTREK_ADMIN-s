import './piechart.css'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Piechart = () => {
  return (
    <div className="piechart">
      <h1 className='text-[white] text-3xl'>Leads By Sources</h1>
      <ResponsiveContainer width="99%" height={300} className={"flex items-center justify-center"}>
        <PieChart>
          <Pie className='border'
            data={data}
            cx={120}
            cy={200}
            innerRadius={"50%"}
            outerRadius={"64%"}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <table>
    <thead>
      <tr>
        {data.map((d, index) => (
          <th key={`th-${index}`}><div className='dot' style={{backgroundColor:`${COLORS[index]}`}}></div>{d.name}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        {data.map((d, index) => (
          <td key={`td-${index}`}>{d.value}</td>
        ))}
      </tr>
    </tbody>
  </table>
    </div>
  )
}

export default Piechart


