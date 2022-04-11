import React, { useState, useEffect } from "react";
import GlobalStyle from "../theme";
import { Application } from "./styles";
import Rocket from "../assets/rocket.svg";
import Button from "../components/Button";
import InputText from "../components/InputText";
import "./style.css";
import useFetch from "../utils/useFetch";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

import { useSelector, useDispatch } from "react-redux";

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
  const counter = useSelector((state) => state.spaceData.counter);
  const value = useSelector((state) => state.spaceData.value);
  const columnWidth = useSelector((state) => state.spaceData.columnWidth);
  const rowsCapsules = useSelector((state) => state.spaceData.rowsCapsules);

  const dispatch = useDispatch();

  const [{ data, error }, doFetch] = useFetch(
    url,
    "capsules?sort=original_launch&order=desc"
  );

  const columns = columnsNames.reduce((res, cur) => {
    res.push({
      field: cur,
      headerName: createHeaderName(cur),
      width: columnWidth,
    });
    return res;
  }, []);

  const validateInput = (value) => {
    if (value.length > 15) return false;
    const patternDisallow = /(#|\$|@|&|%)/;
    const val = value.replace(patternDisallow, "");
    dispatch({ type: "value/changed", payload: val });
  };

  const findMatches = () => {
    const matches = rowsCapsules.filter((item) => item.capsule_id === value);
    dispatch({ type: "rowsCapsules/changed", payload: matches });
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
      dispatch({ type: "rowsCapsules/changed", payload: rows });
    }
  }, [data]);

  useEffect(() => {
    const width =
      Math.round(
        document.querySelector(".display")?.offsetWidth / columnsNames.length
      ) - 5;
    dispatch({ type: "columnWidth/changed", payload: width });
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
                onClick={() =>
                  dispatch({
                    type: "counter/incremented",
                    payload: counter + 1,
                  })
                }
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
