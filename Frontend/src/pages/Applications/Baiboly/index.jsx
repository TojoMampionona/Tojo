import React, { useState, useEffect } from "react";
import "../../../App.css"
function Baiboly() {
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000")
      .then((res) => res.json())
      .then((data) => setFileList(data));

  }, []);
  return (
    <div className="ContainerHome">
      <h1>Iditra ao @'ny : </h1>
      <ul>
        {fileList.map((file, index) =>(
          <li key={index}>
            <a href={`http://localhost:3000/Applications/Baiboly/${file}`}>
              {file}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Baiboly;