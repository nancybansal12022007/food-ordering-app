import { useState } from "react";

const User = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="user-card">
      <button
        onClick={() => {
          let count1 = count + 1;
          setCount(count1);
        }}
      >
        Button
      </button>
      <h1>count: {count}</h1>
      <h2>Nancy Bansal</h2>
      <h2>Location: Indore</h2>
      <h4>Contact: 8085720505</h4>
    </div>
  );
};

export default User;
