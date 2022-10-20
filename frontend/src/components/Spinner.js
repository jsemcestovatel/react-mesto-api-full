import React from "react";

function Spinner() {
//   React.useEffect(() => {
//     console.log('MyComponent onMount');
//     return () => {
//         console.log('MyComponent onUnmount');
//     };
// }, []);
  return (
    <div className="spinner spinner_visible">
      <i className="spinner__element"></i>
    </div>
  );
};

export default Spinner;