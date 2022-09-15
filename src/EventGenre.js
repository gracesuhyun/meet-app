import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const EventGenre = ({ events }) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(() => getPieData());
  },
    [events]
  );

  const getPieData = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map(genre => {
      const value = events.filter(event => event.summary.split(' ').includes(genre)).length;
      return { name: genre, value };
    });
    return data;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#85D2DB'];

  return (
    <ResponsiveContainer height={400}>
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({name, percent})=> `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.name}/>)
        }
    </Pie>
    </PieChart>
  </ResponsiveContainer>
  );
}

export default EventGenre;