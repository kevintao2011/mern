import React, { useState } from 'react';

function CounterForm() {
  const [count, setCount] = useState(0);
  const [components, setComponents] = useState([]);

  const handleAddComponent = () => {
    setCount(count + 1);
    setComponents([...components, <div key={count}>Component #{count + 1} <button onClick={() => handleDeleteComponent(count)}>Delete</button></div>]);
  };

  const handleDeleteComponent = (index) => {
    setCount(count - 1);
    setComponents(components.filter((_, i) => i !== index));
  };

  return (
    <form>
      <label>
        Current count: {count}
      </label>
      <br />
      <button type="button" onClick={handleAddComponent}>
        Add Component
      </button>
      <br />
      {components}
    </form>
  );
}
export default CounterForm

