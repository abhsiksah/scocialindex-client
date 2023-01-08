import React from "react";
import { LineChart, Line, Legend } from "recharts";

const data = [
  {
    SocialIndex: 20,
  },
  {
    SocialIndex: 2,
  },
  {
    SocialIndex: 50,
  },
  {
    SocialIndex: 90,
  },
  {
    SocialIndex: 60,
  },
  {
    SocialIndex: 90,
  },
];

const ShareLeft = () => {
  return (
    <div>
      <LineChart width={200} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="SocialIndex"
          stroke="white"
          strokeWidth={2}
        />
      </LineChart>
    </div>
  );
};

export default ShareLeft;
