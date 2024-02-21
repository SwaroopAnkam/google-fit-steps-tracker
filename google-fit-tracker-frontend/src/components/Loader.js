import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div>
          <ThreeDots
            visible={true}
            height="140"
            width="140"
            color="#0066b2"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    );
  }
  return <div>Content loaded successfully!</div>;
}

export default Loading;
