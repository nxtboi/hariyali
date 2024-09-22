"use client";
import React, { useState } from "react";
import {
  Header,
  HeaderName,
  SideNav,
  SideNavItems,
  SideNavLink,
  Checkbox,
  TextInput,
  Form,
  FormGroup,
  Toggle,
  Dropdown,
  Button,
  InlineNotification,
} from "@carbon/react";
import Image from "next/image";
import Link from "next/link";
import { Home, TimePlot, Login } from "@carbon/icons-react";

export default function RelaySwitch() {
  const [manualSwitch, setManualSwitch] = useState(false); // Default state is off
  const [useConditionalTrigger, setUseConditionalTrigger] = useState(false);
  const [temperatureThreshold, setTemperatureThreshold] = useState("");
  const [moistureThreshold, setMoistureThreshold] = useState("");
  const [sensorSelected, setSensorSelected] = useState(null);
  const [error, setError] = useState("");
  const [temperatureError, setTemperatureError] = useState("");
  const [moistureError, setMoistureError] = useState("");
  const [parametersSet, setParametersSet] = useState(false);
  const [manualSwitchMessage, setManualSwitchMessage] = useState("");

  // Dropdown items
  const items = [
    {
      id: "option-0",
      text: "--Clear--",
    },
    {
      id: "option-1",
      text: "SS-01",
    },
  ];

  const handleSetParameters = () => {
    if (sensorSelected === "--Clear--" || !sensorSelected) {
      setError("Please select a sensor.");
      return;
    }

    if (!temperatureThreshold && !moistureThreshold) {
      setError("Please fill in at least one of the fields.");
      return;
    }

    if (
      (temperatureThreshold && !isNumeric(temperatureThreshold)) ||
      (moistureThreshold && !isNumeric(moistureThreshold))
    ) {
      setError("Please enter valid numerical values for the thresholds.");
      return;
    }

    // Clear the error if parameters are valid
    setError("");

    // TODO: Add the logic to save the parameters to the "RelayControl" table

    setParametersSet(true);

    // Simulate storing data and showing confirmation
    console.log("Parameters Set: ", {
      temperatureThreshold,
      moistureThreshold,
      sensorSelected,
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setParametersSet(false);
    }, 5000);
  };

  const isNumeric = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
  };

  const handleTemperatureChange = (e) => {
    const value = e.target.value;
    setTemperatureThreshold(value);
    if (!isNumeric(value)) {
      setTemperatureError("Please enter a valid numerical value.");
    } else {
      setTemperatureError("");
    }
  };

  const handleMoistureChange = (e) => {
    const value = e.target.value;
    setMoistureThreshold(value);
    if (!isNumeric(value)) {
      setMoistureError("Please enter a valid numerical value.");
    } else {
      setMoistureError("");
    }
  };

  const handleManualSwitchChange = () => {
    setManualSwitch(!manualSwitch);
    setManualSwitchMessage(
      !manualSwitch
        ? "Manual Relay Switch Control is ON"
        : "Manual Relay Switch Control is OFF",
    );
    setTimeout(() => {
      setManualSwitchMessage("");
    }, 5000);
  };

  const handleConditionalTriggerChange = () => {
    setUseConditionalTrigger(!useConditionalTrigger);
  };

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
      <SideNav isFixedNav expanded={true} aria-label="Side navigation">
        <SideNavItems>
          <SideNavLink as={Link} href="/soil-sensor" renderIcon={Home}>
            Home
          </SideNavLink>
          <SideNavLink as={Link} href="/relay-switch" renderIcon={TimePlot}>
            Control
          </SideNavLink>
          <SideNavLink as={Link} href="/" renderIcon={Login}>
            Logout
          </SideNavLink>
        </SideNavItems>
      </SideNav>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="relay-switch-header">Relay Switch</h2>
        <p className="sensor-status">Relay Status: Active</p>
        <p className="sensor-status">Last triggered: 11:15:36 AM</p>

        <h3>Manual Relay Switch Control</h3>
        <div className="toggle-container">
          <Toggle
            id="manual-switch"
            checked={manualSwitch}
            onChange={handleManualSwitchChange}
            labelText="State"
            labelA="Off"
            labelB="On"
            className="custom-switch"
          />
        </div>

        <h3>Conditional Relay Switch Control</h3>
        <Form>
          <FormGroup
            legendText="Use conditional trigger"
            style={{ marginTop: "30px" }}
          >
            <Checkbox
              labelText="By selecting this option you will be enabling the system to trigger relay control automatically."
              id="conditional-trigger-checkbox"
              value="Use conditional trigger"
              checked={useConditionalTrigger}
              onChange={handleConditionalTriggerChange}
            />
          </FormGroup>

          {useConditionalTrigger && (
            <>
              <div style={{ marginTop: "30px", width: "258px" }}>
                <Dropdown
                  id="sensor-select"
                  titleText="Select Sensor"
                  helperText="Select the sensor to control trigger"
                  label="Sensor ID"
                  items={items}
                  itemToString={(item) => (item ? item.text : "")}
                  onChange={(e) => setSensorSelected(e.selectedItem.text)}
                />
              </div>

              <FormGroup
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ marginRight: "50px", flex: "1" }}>
                  <TextInput
                    id="temperature-threshold"
                    labelText="Temperature threshold"
                    placeholder="Enter value here"
                    helperText="Please enter the temperature value to trigger relay."
                    style={{ marginTop: "5px", width: "288px" }}
                    value={temperatureThreshold}
                    onChange={handleTemperatureChange}
                    invalid={temperatureError !== ""}
                    invalidText={temperatureError}
                  />
                </div>

                <div style={{ flex: "1" }}>
                  <TextInput
                    id="moisture-threshold"
                    labelText="Moisture threshold"
                    placeholder="Enter value here"
                    helperText="Please enter the moisture percentage value to trigger relay."
                    style={{ marginTop: "5px", width: "288px" }}
                    value={moistureThreshold}
                    onChange={handleMoistureChange}
                    invalid={moistureError !== ""}
                    invalidText={moistureError}
                  />
                </div>
              </FormGroup>

              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <Button onClick={handleSetParameters}>Set Parameters</Button>
              </div>
            </>
          )}
        </Form>

        {error && (
          <InlineNotification
            kind="error"
            title="Error"
            subtitle={error}
            onCloseButtonClick={() => setError("")}
            style={{
              marginTop: "30px",
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
            }}
            timeout={5000}
          />
        )}

        {parametersSet && (
          <InlineNotification
            kind="success"
            title="Success"
            subtitle="Parameters have been set successfully."
            style={{
              marginTop: "30px",
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
            }}
            timeout={5000}
          />
        )}
        {manualSwitchMessage && (
          <InlineNotification
            kind="success"
            title="Success"
            subtitle={manualSwitchMessage}
            style={{
              marginTop: "30px",
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
            }}
            timeout={5000}
          />
        )}
      </main>

      <style jsx>{`
        .container {
          display: flex;
        }
        .main-content {
          padding: 20px;
          flex-grow: 1;
          background: #f4f4f4;
          color: #000;
          min-height: 100vh;
          margin-left: 256px; /* Sidebar width */
          margin-top: 48px;
        }
        form {
          margin-top: 20px;
        }
        h3 {
          margin-top: 50px;
          margin-bottom: 25px;
          color: #000;
          font-family: "IBM Plex Sans";
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 28px;
        }
        .toggle-container {
          margin-bottom: 30px;
        }
        .sensor-status {
          font-family: "IBM Plex Sans";
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 28px;
          /* identical to box height, or 175% */
          color: #5a6872;
        }
        .relay-switch-header {
          font-family: "IBM Plex Sans";
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
          line-height: 36px;
          color: #000;
        }
      `}</style>
    </div>
  );
}
