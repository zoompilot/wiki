/* Driver-facing reference. Update against the release UI and params_keys.h. */
window.ZP_SETTINGS = [
  {
    "panel": "Steering",
    "anchor": "steering",
    "items": [
      {
        "name": "Enable Modular Assistive Driving System (MADS)",
        "values": "On / Off",
        "def": "On",
        "note": "Lets steering stay active without cruise engaged. Off reverts to stock engagement rules."
      },
      {
        "name": "Toggle with Main Cruise",
        "values": "On / Off",
        "def": "On",
        "note": "MADS sub-panel."
      },
      {
        "name": "Unified Engagement Mode (UEM)",
        "values": "On / Off",
        "def": "On",
        "note": "Turns steering on with cruise engagement. Steering can stay active when cruise is cancelled."
      },
      {
        "name": "Steering Mode on Brake Pedal",
        "values": "Remain Active / Pause / Disengage",
        "def": "Remain Active",
        "note": "MADS sub-panel. What steering does when you press the brake pedal."
      },
      {
        "name": "Mazda TJA Button / tja button",
        "values": "On / Off",
        "note": "Steering \u2192 MADS. With this on, TJA is the steering switch; main cruise controls cruise only. Use only on a car with the button.",
        "def": "Off"
      },
      {
        "name": "Pause Lateral Control with Blinker",
        "values": "On / Off",
        "def": "Off",
        "note": "Pauses steering below a speed while the blinker is on."
      },
      {
        "name": "Minimum Speed to Pause Lateral Control",
        "values": "0\u2013255, step 5",
        "def": "20",
        "note": "km/h or mph. Needs the toggle above."
      },
      {
        "name": "Post-Blinker Delay",
        "values": "0\u201310 s, step 1",
        "def": "0 s",
        "note": "Wait time before steering resumes after the blinker ends."
      },
      {
        "name": "Enforce Torque Lateral Control",
        "values": "On / Off",
        "def": "On on supported Mazda steering hardware; otherwise car-dependent",
        "note": "Forces the torque steering controller. Hidden on angle-steering cars. Conflicts with NNLC. Applied on supported Mazda steering hardware."
      },
      {
        "name": "Lateral Jerk Torque Controller",
        "values": "On / Off",
        "def": "Off",
        "note": "Smoother wheel movement in theory. Tested on Mazdas: no gain, and it hurt performance. Leave it off."
      },
      {
        "name": "Self-Tune",
        "values": "On / Off",
        "def": "On on supported Mazda steering hardware; otherwise car-dependent",
        "note": "Learns steering response at different speeds. There is no separate speed-dependent switch."
      },
      {
        "name": "Less Restrict Settings for Self-Tune (Beta)",
        "values": "On / Off",
        "def": "Off",
        "note": "More forgiving learning. Needs Self-Tune."
      },
      {
        "name": "Enable Custom Tuning",
        "values": "On / Off",
        "def": "Off",
        "note": "Manual lateral acceleration factor and friction, instead of the offline data. Recommended off."
      },
      {
        "name": "Manual Real-Time Tuning",
        "values": "On / Off",
        "def": "Off",
        "note": "Forces your fixed values live, over self-tune. Needs Enable Custom Tuning."
      },
      {
        "name": "Lateral Acceleration Factor",
        "values": "0.1\u20135.0 m/s\u00b2, step 0.1",
        "def": "2.5",
        "note": "Needs Enable Custom Tuning."
      },
      {
        "name": "Friction",
        "values": "0.0\u20131.0, step 0.01",
        "def": "0.1",
        "note": "Needs Enable Custom Tuning."
      },
      {
        "name": "Torque Control Tune Version",
        "values": "v0.0 / v1.0 / v2.0",
        "def": "Small model: v2.0 on Mazda; big model: v1.0",
        "note": "Small and big driving models keep separate steering tunes. Keep the defaults."
      },
      {
        "name": "Auto Lane Change by Blinker",
        "values": "Off / Nudge / Nudgeless / 0.5 / 1 / 2 / 3 s",
        "def": "Nudge",
        "note": "Blinker-only lane changes after a delay. Caution: only signal when traffic allows."
      },
      {
        "name": "Block Lane Change: Road Edge Detection",
        "values": "On / Off",
        "def": "Off",
        "note": "Blocks a lane change when the model sees a road edge on that side."
      },
      {
        "name": "Lane Change Smoothing",
        "values": "Off / Fast / Medium / Slow / Extra Slow",
        "def": "Off",
        "note": "Slows the lane change down. Off is stock."
      },
      {
        "name": "Auto Lane Change: Delay with Blind Spot",
        "values": "On / Off",
        "def": "Off",
        "note": "Waits when BSM sees a car. Needs BSM and a lane change timer above."
      },
      {
        "name": "Neural Network Lateral Control (NNLC)",
        "values": "On / Off",
        "def": "Off",
        "note": "Neural-network steering. Models exist for the CX-5 2022 and CX-9, but zoompilot's tuned torque control is the tested path on Mazda. Conflicts with Enforce Torque and the jerk controller."
      }
    ]
  },
  {
    "panel": "Cruise",
    "anchor": "cruise",
    "items": [
      {
        "name": "Alpha Longitudinal",
        "values": "On / Off",
        "note": "Cruise \u2192 alpha longitudinal on comma 4; top of Cruise on comma 3X. Experimental acceleration and braking. Disables Mazda radar, automatic emergency braking, and forward collision warning. Compatible hardware required.",
        "def": "Off"
      },
      {
        "name": "Experimental Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "End-to-end driving behavior. Shown when zoompilot controls gas and brakes (alpha longitudinal on Mazda)."
      },
      {
        "name": "Dynamic Experimental Control",
        "values": "On / Off",
        "def": "Off",
        "note": "The model picks between ACC and end-to-end per moment. Needs longitudinal control."
      },
      {
        "name": "Experimental Mode Speed Assist / speed assist",
        "values": "On / Off",
        "note": "Raises speed toward the set speed in Experimental Mode when the road ahead is clear. No effect while Dynamic Experimental Control is on.",
        "def": "Off"
      },
      {
        "name": "Experimental Mode Lead Follow Assist / lead follow assist",
        "values": "On / Off",
        "note": "Can reduce excess following gap behind a steady car. No effect while Dynamic Experimental Control is on.",
        "def": "Off"
      },
      {
        "name": "Disengage Cruise on Accelerator Pedal",
        "values": "On / Off",
        "def": "Off",
        "note": "When off, the gas pedal overrides without canceling."
      },
      {
        "name": "Driving Personality",
        "values": "Aggressive / Standard / Relaxed",
        "def": "Standard",
        "note": "Follow distance and gas/brake style. You can cycle it with the distance button on some cars."
      },
      {
        "name": "Custom ACC Speed Increments / custom increments",
        "values": "On / Off",
        "def": "Off",
        "note": "Choose step sizes for cruise-speed buttons. Cruise-button control starts automatically when needed."
      },
      {
        "name": "Short Press Increment",
        "values": "1\u201310",
        "def": "1",
        "note": "km/h or mph per short press."
      },
      {
        "name": "Long Press Increment",
        "values": "1 / 5 / 10",
        "def": "5",
        "note": "Speed step while holding a cruise button."
      },
      {
        "name": "Speed Limit Assist Mode",
        "values": "Off / Information / Warning / Assist",
        "def": "Information",
        "note": "Assist can change the set speed. Cruise-button control starts automatically where needed."
      },
      {
        "name": "Speed Limit Source",
        "values": "Car State Only / Map Data Only / Car State Priority / Map Data Priority / Combined",
        "def": "Map Data Priority",
        "note": "Car data on Mazda needs a nav SD card. Map data comes from downloaded maps."
      },
      {
        "name": "Speed Limit Offset Type",
        "values": "Off / Fixed / Percentage",
        "def": "Off",
        "note": "How the offset is applied."
      },
      {
        "name": "Speed Limit Offset Value",
        "values": "\u221230 to +30, step 1",
        "def": "0",
        "note": "km/h or mph. Needs an offset type above."
      },
      {
        "name": "Slow for Curves: Vision",
        "values": "On / Off",
        "def": "Off",
        "note": "Slows for curves read from the cameras."
      },
      {
        "name": "Slow for Curves: Map",
        "values": "On / Off",
        "def": "Off",
        "note": "Slows for curves read from map data. Download maps through sunnylink first."
      }
    ]
  },
  {
    "panel": "Models",
    "anchor": "models",
    "items": [
      {
        "name": "Driving Model",
        "values": "Available small models",
        "note": "Keep the default for your first drive.",
        "def": "Firehose"
      },
      {
        "name": "Jetlink",
        "values": "Off / USB / iOS",
        "note": "Models \u2192 Jetlink. USB for Mac, Jetson, Linux, or Android; iOS for iPhone/iPad. The external device needs its own setup and power.",
        "def": "Off"
      },
      {
        "name": "Big Model",
        "values": "Available large models",
        "note": "Keep the default for first setup. Needs Jetlink or supported external acceleration hardware.",
        "def": "Current default in the model list"
      },
      {
        "name": "Use Lane Turn Desires",
        "values": "On / Off",
        "def": "Off",
        "note": "Plans a turn toward your blinker at low speed, so the car does not pick the wrong turn at a light."
      },
      {
        "name": "Adjust Lane Turn Speed",
        "values": "0\u201320, step 1",
        "def": "19",
        "note": "km/h or mph cap for turn desires. Needs the toggle above and Show Advanced Controls."
      },
      {
        "name": "Live Learning Steer Delay",
        "values": "On / Off",
        "def": "On",
        "note": "The device learns your car's steering response delay."
      },
      {
        "name": "Adjust Software Delay",
        "values": "0.05\u20130.5 s, step 0.01",
        "def": "0.2",
        "note": "Fixed delay when Live Learning is off. Needs Show Advanced Controls."
      },
      {
        "name": "Neural Network Lateral Control (NNLC)",
        "values": "On / Off",
        "def": "Off",
        "note": "Same setting as in the Steering panel."
      },
      {
        "name": "Adjust Camera Offset",
        "values": "\u22120.35 to +0.35 m, step 0.01",
        "def": "0",
        "note": "Shifts the model's view. Positive moves it left. Needs Show Advanced Controls."
      }
    ]
  },
  {
    "panel": "Visuals",
    "anchor": "visuals",
    "items": [
      {
        "name": "Show Blind Spot Warnings",
        "values": "On / Off",
        "def": "Off",
        "note": "Needs a car with blind spot monitoring."
      },
      {
        "name": "Steering Arc",
        "values": "On / Off",
        "def": "Off",
        "note": "Draws the steering arc on the driving screen."
      },
      {
        "name": "Display Turn Signals",
        "values": "On / Off",
        "def": "Off",
        "note": "Draws turn indicators on the HUD."
      },
      {
        "name": "Display Road Name",
        "values": "On / Off",
        "def": "Off",
        "note": "Needs OpenStreetMap data for your area."
      },
      {
        "name": "Standstill Timer",
        "values": "On / Off",
        "def": "Off",
        "note": "Shows a timer when stopped."
      },
      {
        "name": "Real-time Acceleration Bar",
        "values": "On / Off",
        "def": "Off",
        "note": "Shows what the car is doing right now."
      },
      {
        "name": "Display Metrics Below Chevron",
        "values": "Off / Distance / Speed / Time / All",
        "def": "All",
        "note": "Needs longitudinal control to show."
      },
      {
        "name": "Developer UI",
        "values": "Off / Bottom / Right / Right & Bottom",
        "def": "Off",
        "note": "Real-time debug values."
      },
      {
        "name": "Speedometer: Always Display True Speed",
        "values": "On / Off",
        "def": "Off",
        "note": "Wheel-speed-based speed on supported cars."
      },
      {
        "name": "Speedometer: Hide from Onroad Screen",
        "values": "On / Off",
        "def": "Off",
        "note": "Hides the speedometer."
      },
      {
        "name": "Green Traffic Light Alert (Beta)",
        "values": "On / Off",
        "def": "Off",
        "note": "Chime when your light turns green. A notification only \u2014 you still watch the road."
      },
      {
        "name": "Lead Departure Alert (Beta)",
        "values": "On / Off",
        "def": "Off",
        "note": "Chime when the car ahead moves."
      },
      {
        "name": "Tesla Rainbow Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "Cosmetic path colors."
      }
    ]
  },
  {
    "panel": "Toggles",
    "anchor": "toggles",
    "items": [
      {
        "name": "Enable zoompilot",
        "values": "On / Off",
        "def": "On",
        "note": "Master switch for driving assistance. Some screens retain the sunnypilot name."
      },
      {
        "name": "Enable Lane Departure Warnings",
        "values": "On / Off",
        "def": "Off",
        "note": "Alerts when you drift over a lane line above 50 km/h (31 mph)."
      },
      {
        "name": "Always-On Driver Monitoring",
        "values": "On / Off",
        "def": "Off",
        "note": "Runs driver monitoring even when zoompilot is not engaged."
      },
      {
        "name": "Use Metric System",
        "values": "On / Off",
        "def": "Off",
        "note": "km/h instead of mph."
      },
      {
        "name": "Record and Upload Driver Camera",
        "values": "On / Off",
        "def": "Off",
        "note": "Helps improve driver monitoring. Takes effect next drive."
      },
      {
        "name": "Record and Upload Microphone Audio",
        "values": "On / Off",
        "def": "Off",
        "note": "Audio in dashcam clips. Takes effect next drive."
      }
    ]
  },
  {
    "panel": "Device",
    "anchor": "device",
    "items": [
      {
        "name": "Force Offroad Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "Keeps the device offroad. On Mazda with alpha longitudinal, zoompilot waits until you are parked, then hands the radar back before it grants this."
      },
      {
        "name": "Wake Up Behavior",
        "values": "Standard / Always Offroad",
        "def": "Standard",
        "note": "What the device does after boot or sleep."
      },
      {
        "name": "Quiet Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "Fewer sounds."
      },
      {
        "name": "Onroad Uploads",
        "values": "On / Off",
        "def": "On",
        "note": "Upload route logs while driving."
      },
      {
        "name": "Max Time Offroad",
        "values": "Always On, 5 m \u2013 30 h",
        "def": "30 h",
        "note": "Auto shutdown after the engine goes off."
      },
      {
        "name": "Language",
        "values": "\u2014",
        "def": "English",
        "note": "Device language."
      }
    ]
  },
  {
    "panel": "Software",
    "anchor": "software",
    "items": [
      {
        "name": "Disable Updates",
        "values": "On / Off",
        "def": "Off",
        "note": "Stops over-the-air updates. Hidden until Show Advanced Controls is on. Keep updates on to get releases."
      }
    ]
  },
  {
    "panel": "Developer",
    "anchor": "developer",
    "items": [
      {
        "name": "Enable ADB",
        "values": "On / Off",
        "def": "Off",
        "note": "Debug bridge over USB or network."
      },
      {
        "name": "Enable SSH",
        "values": "On / Off",
        "def": "Off",
        "note": "Shell access. SSH keys load from a GitHub username."
      },
      {
        "name": "Joystick Debug Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "Drives the car from a virtual joystick. Test benches only."
      },
      {
        "name": "UI Debug Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "Shows touch and FPS overlays."
      },
      {
        "name": "[TEST] Lateral Maneuver Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "Deterministic steering test sequence. Not for road use."
      },
      {
        "name": "[TEST] Longitudinal Maneuver Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "Deterministic speed test sequence. Not for road use."
      },
      {
        "name": "Show Advanced Controls",
        "values": "On / Off",
        "def": "Off",
        "note": "Reveals advanced and debug settings across panels."
      },
      {
        "name": "GitHub Runner Service",
        "values": "On / Off",
        "def": "Off",
        "note": "For zoompilot development builds."
      },
      {
        "name": "copyparty Service",
        "values": "On / Off",
        "def": "Off",
        "note": "Browse and download your routes from a browser on your network. Needs Show Advanced Controls."
      },
      {
        "name": "Quickboot Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "Faster boot. Needs updates disabled and Show Advanced Controls."
      }
    ]
  }
];
