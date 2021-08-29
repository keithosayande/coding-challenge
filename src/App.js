import React, { useMemo } from "react";
import moment from "moment";
import styled from 'styled-components'
import Table from "./components/Table";
import data from "./data/candidates.json";
import {colorMapping} from './utils/enums'

const Styles = styled.div`
  .dot {
  height: 25px;
  width: 25px;
  border-radius: 50%;
}
`
function App() {
  const transformData = (data) => {
    const transformedData = data.results.map((canidate) => {
      return {
        name: canidate.name,
        label: canidate.applications[0].new_status.label,
        color: canidate.applications[0].new_status.color,
        appNumber: canidate.applications.length,
        lastAction: moment([canidate.profile.updated]).fromNow(),
      };
    });
    return transformedData;
  };

  const formattedData = transformData(data);
  const columns = useMemo(
    () => [
      {
        Header: "Canidate Name",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "label",
        Cell: ({ cell }) => (
          <div>
            <span class="dot"></span>
            {cell.row.values.label}
          </div>
        ),
      },
      {
        Header: "# Apps",
        accessor: "appNumber",
      },
      {
        Header: "Last Action",
        accessor: "lastAction",
      },
    ],
    []
  );

  return (
    <Styles>
    <div>
      <Table columns={columns} data={formattedData} />
    </div>
    </Styles>
  );
}

export default App;
