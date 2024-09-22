"use client";
import React, { useState } from "react";
import {
  Header,
  HeaderName,
  SideNav,
  SideNavItems,
  SideNavLink,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Button,
  Pagination,
} from "@carbon/react";
import {
  IotConnect,
  Product,
  Download,
  Home,
  TimePlot,
  Login,
} from "@carbon/icons-react"; // Importing the required icons
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { CSVLink, CSVDownload } from "react-csv";

// Dynamically import the Line component to avoid SSR issues
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

// Chart.js registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// Data for the table
const headers = [
  { key: "id", header: "Serial No." },
  { key: "temperature", header: "Temperature" },
  { key: "moisture", header: "Moisture" },
  { key: "timestamp", header: "TimeStamp" },
  { key: "battery", header: "Battery" },
];

const rows = [
  {
    id: "1",
    temperature: "27.00",
    moisture: "5.00",
    timestamp: "7:30:26",
    battery: "45",
  },
  {
    id: "2",
    temperature: "28.39",
    moisture: "5.00",
    timestamp: "7:35:27",
    battery: "45",
  },
  {
    id: "3",
    temperature: "27.15",
    moisture: "5.00",
    timestamp: "7:40:26",
    battery: "44",
  },
  {
    id: "4",
    temperature: "27.15",
    moisture: "5.00",
    timestamp: "7:45:24",
    battery: "44",
  },
  {
    id: "5",
    temperature: "27.45",
    moisture: "5.00",
    timestamp: "7:50:26",
    battery: "43",
  },
  {
    id: "6",
    temperature: "27.76",
    moisture: "5.00",
    timestamp: "7:55:27",
    battery: "43",
  },
  {
    id: "7",
    temperature: "27.50",
    moisture: "5.00",
    timestamp: "8:00:27",
    battery: "42",
  },
];

// Data for the charts
const dataTemperature = {
  labels: ["9:00", "9:05", "9:10", "9:15", "9:20", "9:25", "9:30"],
  datasets: [
    {
      label: "Temperature",
      data: [15, 18, 20, 21, 20, 19, 18],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

const dataMoisture = {
  labels: ["9:00", "9:05", "9:10", "9:15", "9:20", "9:25", "9:30"],
  datasets: [
    {
      label: "Moisture",
      data: [10, 12, 14, 16, 15, 13, 12],
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
    },
  ],
};

/// Utility function to convert data to CSV format
const exportToCSV = (rows, headers) => {
  const csvRows = [];

  // Add headers to CSV
  const headerRow = headers.map((header) => header.header);
  csvRows.push(headerRow.join(","));

  // Add rows to CSV
  rows.forEach((row) => {
    const values = headers.map((header) => row[header.key]);
    csvRows.push(values.join(","));
  });

  // Create CSV file and trigger download
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "soil_data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function SoilSensor() {
  const [activeTab, setActiveTab] = useState("graphs");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  // Logic for pagination

  const paginatedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  return (
    <div className="container">
      {/* Header */}
      <Header aria-label="HariyaliKart">
        <HeaderName href="/" prefix="">
          <Image
            src="/Logo-2.png"
            alt="HariyaliKart Logo"
            width={184}
            height={48}
          />
        </HeaderName>
      </Header>

      {/* Sidebar */}
      <SideNav
        isFixedNav
        expanded={true}
        aria-label="Side navigation"
        className="bx--side-nav"
      >
        <SideNavItems>
          {/* Home link remains on the Soil Sensor page */}
          <SideNavLink as={Link} href="/soil-sensor" renderIcon={Home}>
            Home
          </SideNavLink>
          {/* Control link navigates to Relay Switch page */}
          <SideNavLink as={Link} href="/relay-switch" renderIcon={TimePlot}>
            Control
          </SideNavLink>
          {/* Logout link navigates to the root, which is the login page */}
          <SideNavLink as={Link} href="/" renderIcon={Login}>
            Logout
          </SideNavLink>
        </SideNavItems>
      </SideNav>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="soil-sensor-header" style={{ marginBottom: "27px" }}>
          Soil Sensor Data
        </h2>
        <p className="sensor-status-home"> Sensor Status: Active</p>
        <p className="sensor-status-home">Gateway Status: Active</p>
        <p className="sensor-status-home" style={{ marginBottom: "50px" }}>
          Last connected: 12:30:45 PM
        </p>

        <Tabs
          selected={activeTab === "graphs" ? 0 : 1}
          onSelectionChange={(index) =>
            setActiveTab(index === 0 ? "graphs" : "table")
          }
        >
          <TabList aria-label="Soil Sensor Data Views">
            <Tab renderIcon={IotConnect}>Graphs</Tab>
            <Tab renderIcon={Product}>Table</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="chart-container">
                <div
                  className="chart"
                  style={{
                    maxWidth: "500px",
                    maxHeight: "300px",
                    flexShrink: "0",
                    background: "#FFF",
                    paddingLeft: "20px",
                    paddingBottom: "20px",
                    paddingTop: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <text className="graph-headers">Soil Node - Temperature</text>
                  <Line data={dataTemperature} />
                </div>
                <div
                  className="chart"
                  style={{
                    maxWidth: "500px",
                    maxHeight: "300px",
                    flexShrink: "0",
                    background: "#FFF",
                    paddingLeft: "20px",
                    paddingBottom: "20px",
                    paddingTop: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <text className="graph-headers">Soil Node - Moisture</text>
                  <Line data={dataMoisture} />
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <TableContainer
                title="Soil Data"
                className="soil-data-header"
                style={{ position: "relative" }}
              >
                <Button
                  kind="primary"
                  renderIcon={Download}
                  className="export-button"
                >
                  Export CSV
                </Button>
                <div className="table-container">
                  <DataTable rows={paginatedRows} headers={headers}>
                    {({ rows, headers, getHeaderProps, getRowProps }) => (
                      <Table>
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHeader
                                key={header.key}
                                {...getHeaderProps({ header })}
                              >
                                {header.header}
                              </TableHeader>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.id} {...getRowProps({ row })}>
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>
                                  {cell.value}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </DataTable>
                </div>
                <Pagination
                  page={currentPage}
                  pageSize={rowsPerPage}
                  pageSizes={[5]}
                  totalItems={rows.length}
                  onChange={(pagination) => setCurrentPage(pagination.page)}
                />
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </main>

      <style jsx>{`
        .container {
          display: flex;
        }
        .main-content {
          padding: 20px;
          flex-grow: 1;
          background: rgba(244, 244, 244, 0.8);
          color: #000;
          width: 1056px;
          height: 753px;
          flex-shrink: 0;
          margin-left: 256px;
          margin-top: 48px;
        }
        .chart-container {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .chart {
          width: 48%;
        }
        .soil-sensor-header {
          color: #000;
          /* Fluid styles/XLG/fluid-heading-04 */
          font-family: "IBM Plex Sans";
          font-size: 32px;
          font-style: normal;
          font-weight: 400;
          line-height: 40px; /* 125% */
        }
        .sensor-status-home {
          flex: 1 0 0;
          align-self: stretch;
          overflow: hidden;
          color: var(
            --text-text-secondary,
            var(--Text-text-secondary, #525252)
          );
          text-overflow: ellipsis;
          white-space: nowrap;

          /* Fixed heading styles/heading-compact-01 */
          font-family: "IBM Plex Sans";
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 18px; /* 128.571% */
          letter-spacing: 0.16px;
        }
        .graph-headers {
          width: 175px;
          height: 14px;
          flex-shrink: 0;
          margin-bottom: 20px;
          overflow: hidden;
          color: var(
            --text-text-secondary,
            var(--Text-text-secondary, #525252)
          );
          text-overflow: ellipsis;
          white-space: nowrap;

          /* Fixed heading styles/heading-compact-01 */
          font-family: "IBM Plex Sans";
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 18px; /* 128.571% */
          letter-spacing: 0.16px;
        }
        . .soil-data-header {
          color: #161616;
          font-family: "IBM Plex Sans";
          font-size: 20px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px; /* 140% */
        }
        .export-button {
          position: absolute;
          top: 0;
          right: 0;
          margin: 16px;
          background-color: #3a3a3a;
          color: #fff;
        }
        .table-container {
          max-height: 400px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
