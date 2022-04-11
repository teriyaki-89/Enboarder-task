import React, { useState, useEffect } from "react";
import GlobalStyle from "../theme";
import { Application } from "./styles";
import Rocket from "../assets/rocket.svg";
import Button from "../components/Button";
import InputText from "../components/InputText";
import "./style.css";
import useFetch from "../utils/useFetch";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const columnsNames = [
  "capsule_serial",
  "capsule_id",
  "status",
  "original_launch",
  "mission",
  "landings",
  "type",
  "reuse_count",
];
const createHeaderName = (str) => {
  return str.replace("_", " ");
};

const url = "https://api.spacexdata.com/v3/";

const App = () => {
  const [value, setValue] = useState("");

  const [counter, setCounter] = useState(0);

  const [{ data, error }, doFetch] = useFetch(
    url,
    "capsules?sort=original_launch&order=desc"
  );

  const [columnWidth, setColumnWidth] = useState(0);

  const columns = columnsNames.reduce((res, cur) => {
    res.push({
      field: cur,
      headerName: createHeaderName(cur),
      width: columnWidth,
    });
    return res;
  }, []);

  const [rowsCapsules, setRowsCapsules] = useState([]);

  const validateInput = (value) => {
    if (value.length > 15) return false;
    const patternDisallow = /(#|\$|@|&|%)/;
    const val = value.replace(patternDisallow, "");
    setValue(val);
  };

  const findMatches = () => {
    const matches = rowsCapsules.filter((item) => item.capsule_id === value);
    setRowsCapsules(matches);
  };

  useEffect(() => {
    if (counter == 0) return;
    doFetch();
  }, [counter]);
  useEffect(() => {
    if (data && data.length) {
      const rows = data.reduce((res, cur, id) => {
        const record = { id };
        Object.keys(cur).map((key) => {
          record[key] = cur[key];
        });
        res.push(record);
        return res;
      }, []);
      setRowsCapsules(rows);
    }
  }, [data]);

  useEffect(() => {
    const width =
      Math.round(
        document.querySelector(".display")?.offsetWidth / columnsNames.length
      ) - 5;
    setColumnWidth(width);
  }, []);

  return (
    <>
      <Application>
        <div className="app">
          <div className="display">
            <DataGrid rows={rowsCapsules} columns={columns} />
          </div>
          <div className="controls">
            <div className="capsules">
              <Button
                label="Capsules"
                primary
                onClick={() => setCounter(counter + 1)}
              />
            </div>
            <div className="rocket">
              <img src={Rocket} alt="Rocket" />
            </div>
            <div className="input">
              <InputText
                value={value}
                onChange={(e) => validateInput(e.target.value)}
                placeholder="text"
              />
              <Button label="Landing Pad" primary onClick={findMatches} />
            </div>
          </div>
        </div>
      </Application>
      <GlobalStyle />
    </>
  );
};
export default App;
