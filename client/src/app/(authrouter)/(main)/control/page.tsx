"use client";
import { useContext } from "react";
import { Card, CardContent, Typography, CardActions, Switch, Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ControlContext, controlData } from "@/contexts/ControlContext";

function Control() {
  const { allSwitchesState, setAllSwitchesState, autoSwitchesState, setAutoSwitchesState, handleSwitchChange, handleTurnAllOn, handleTurnAllOff } = useContext(ControlContext);

  const isAllOn = Object.values(allSwitchesState).every((value) => value);
  const isAllOff = Object.values(allSwitchesState).every((value) => !value);
  console.log(allSwitchesState, autoSwitchesState);
  return (
    <div className="flex flex-col items-center" style={{ marginTop: "50px" }}>
      <div className="flex flex-row space-x-12 flex-wrap justify-around mb-4">
        {controlData.map((control, index) => (
          <ControlCard key={index} title={control.title} unit={control.unit} color={control.color} icon={control.icon} switchState={allSwitchesState[index]} autoSwitchState={autoSwitchesState[index]} onSwitchChange={() => handleSwitchChange(index, setAllSwitchesState)} onAutoSwitchChange={() => handleSwitchChange(index, setAutoSwitchesState)} />
        ))}
      </div>

      <div className="flex space-x-12">
        <Button
          variant="contained"
          style={{
            backgroundColor: isAllOn ? blue[500] : "inherit",
            color: isAllOn ? "#fff" : "inherit",
          }}
          onClick={handleTurnAllOn}
        >
          Turn on all
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: isAllOff ? "red" : "inherit",
            color: isAllOff ? "#fff" : "inherit",
          }}
          onClick={handleTurnAllOff}
        >
          Turn off all
        </Button>
      </div>
    </div>
  );
}

export const ControlCard = ({ title, unit, color, icon, switchState, autoSwitchState, onSwitchChange, onAutoSwitchChange }: { title: string; unit: string; color: string; icon: any; switchState: boolean; autoSwitchState: boolean; onAutoSwitchChange: (index: number) => void; onSwitchChange: (index: number) => void }) => (
  <Card sx={{ minWidth: 275 }} className="relative">
    <CardContent
      sx={{
        backgroundColor: color,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <div>{icon}</div>
        <div className="text-2xl">{title}</div>
      </Typography>
      <div className="flex flex-col items-center">
        <Switch
          checked={switchState}
          onChange={onSwitchChange}
          sx={{
            height: 40,
            width: 60,
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#fff",
              "& + .MuiSwitch-track": {
                backgroundColor: "#FF7F50",
                opacity: 1,
              },
            },
            "& .MuiSwitch-thumb": {
              width: 22,
              height: 22,
            },
            "& .MuiSwitch-track": {
              borderRadius: 26 / 2,
              backgroundColor: "#bdbdbd",
              opacity: 1,
              width: 50, // Increase this to increase the width of the switch
            },
          }}
        />
        <Typography
          variant="body2"
          sx={{
            ml: 1,
            color: switchState ? "#FF7F50" : "#bdbdbd",
            userSelect: "none",
            cursor: "pointer",
          }}
          onClick={onSwitchChange}
        >
          {switchState ? "On" : "Off"}
        </Typography>
      </div>
    </CardContent>
    <CardActions className="flex flex-row justify-between">
      <div className="flex flex-col items-center w-full">
        <Switch
          checked={autoSwitchState}
          onChange={onAutoSwitchChange}
          sx={{
            height: 40,
            width: 60,
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#fff",
              "& + .MuiSwitch-track": {
                backgroundColor: "#4dd0e1",
                opacity: 1,
              },
            },
            "& .MuiSwitch-thumb": {
              width: 22,
              height: 22,
            },
            "& .MuiSwitch-track": {
              borderRadius: 26 / 2,
              backgroundColor: "#bdbdbd",
              opacity: 1,
            },
          }}
        />
        <Typography
          variant="body2"
          sx={{
            ml: 1,
            color: autoSwitchState ? "#4dd0e1" : "#bdbdbd",
            userSelect: "none",
            cursor: "pointer",
          }}
          onClick={onAutoSwitchChange}
        >
          Auto
        </Typography>
      </div>
    </CardActions>
  </Card>
);

export default Control;