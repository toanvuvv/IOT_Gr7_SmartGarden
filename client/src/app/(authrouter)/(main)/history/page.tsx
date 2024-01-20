"use client";
import React, { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

interface HistoryData {
  name: string;
  activity: string;
  createdAt: string;
}

interface SensorData {
  avgEarthMoisture: number;
  avgHumidity: number;
  avgLightValue: number;
  avgTemperature: number;
  createdAt: string;
}

function History() {
  const [historyPage, setHistoryPage] = useState(0);
  const [historyRowsPerPage, setHistoryRowsPerPage] = useState(5);
  const [sensorPage, setSensorPage] = useState(0);
  const [sensorRowsPerPage, setSensorRowsPerPage] = useState(5);
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const historyUnsubscribe = firestore
      .collection("history")
      .orderBy("createdAt", "desc")
      .onSnapshot((historySnapshot) => {
        const newHistoryData: HistoryData[] = historySnapshot.docs.map(
          (doc) => {
            const data = doc.data();
            const date = new Date(data.createdAt);
            return {
              name: data.name,
              activity: data.message,
              createdAt: `${date.getDate()}-${date.getMonth() + 1
                }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
            };
          }
        );

        setHistoryData(newHistoryData);
      });

    const sensorUnsubscribe = firestore
      .collection("schedule")
      .orderBy("createdAt", "desc")
      .onSnapshot((sensorSnapshot) => {
        const newSensorData: SensorData[] = sensorSnapshot.docs.map((doc) => {
          const data = doc.data();
          const date = new Date(data.createdAt);
          return {
            avgEarthMoisture: data.avgEarthMoisture,
            avgHumidity: data.avgHumidity,
            avgLightValue: data.avgLightValue,
            avgTemperature: data.avgTemperature,
            createdAt: `${date.getDate()}-${date.getMonth() + 1
              }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
          };
        });

        setSensorData(newSensorData);
      });

    return () => {
      historyUnsubscribe();
      sensorUnsubscribe();
    };
  }, []);

  const handleHistoryChangePage = (event: unknown, newPage: number) => {
    setHistoryPage(newPage);
  };

  const handleHistoryChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHistoryRowsPerPage(parseInt(event.target.value, 10));
    setHistoryPage(0);
  };

  const handleSensorChangePage = (event: unknown, newPage: number) => {
    setSensorPage(newPage);
  };

  const handleSensorChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSensorRowsPerPage(parseInt(event.target.value, 10));
    setSensorPage(0);
  };

  return (
    <div style={{ margin: "10px auto", padding: "40px", maxWidth: "1150px", backgroundColor: "#FFFFCC" }}>
      <Paper style={{ marginBottom: "20px" }}>
        <TableContainer>
          <Table
            sx={{
              "& thead": {
                backgroundColor: "#f0f0f0",
              },
              "& tr:nth-of-type(odd)": {
                backgroundColor: "#fafafa",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell colSpan={3} style={{ background: "#33CCCC", color: "white", fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyData
                .slice(historyPage * historyRowsPerPage, historyPage * historyRowsPerPage + historyRowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.activity}</TableCell>
                    <TableCell>                
                      <span className="text-sm text-gray-600">{row.createdAt}</span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={historyData.length}
          rowsPerPage={historyRowsPerPage}
          page={historyPage}
          onPageChange={handleHistoryChangePage}
          onRowsPerPageChange={handleHistoryChangeRowsPerPage}
        />
      </Paper>

      {/* Additional Table for Sensor Data */}
      <Paper style={{ marginBottom: "20px" }}>
        <TableContainer>
          <Table
            sx={{
              "& thead": {
                backgroundColor: "#f0f0f0",
              },
              "& tr:nth-of-type(odd)": {
                backgroundColor: "#fafafa",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell colSpan={5} style={{ background: "#ff9800", color: "white", fontWeight: "bold" }}>Sensor Data</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Avg Earth Moisture</TableCell>
                <TableCell>Avg Humidity</TableCell>
                <TableCell>Avg Light Value</TableCell>
                <TableCell>Avg Temperature</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sensorData
                .slice(sensorPage * sensorRowsPerPage, sensorPage * sensorRowsPerPage + sensorRowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <span className="text-l mr-1">{row.avgEarthMoisture.toFixed(2)}</span>
                      <span className="text-sm">%</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-l mr-1">{row.avgHumidity.toFixed(2)}</span>
                      <span className="text-sm">%</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-l mr-1">{row.avgLightValue.toFixed(2)}</span>
                      <span className="text-sm">lux</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-l mr-1">{row.avgTemperature.toFixed(2)}</span>
                      <span className="text-sm">%</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{row.createdAt}</span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sensorData.length}
          rowsPerPage={sensorRowsPerPage}
          page={sensorPage}
          onPageChange={handleSensorChangePage}
          onRowsPerPageChange={handleSensorChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default History;
