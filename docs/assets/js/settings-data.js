/* Driver-facing reference, matched to the comma 4 settings UI. Names show the comma 4 label,
 * then the comma 3X wording where it differs. Update against the release UI and params_keys.h. */
window.ZP_SETTINGS = [
  {
    "panel": "Steering",
    "anchor": "steering",
    "items": [
      {
        "name": "steer without cruise / Steer Without Cruise",
        "values": "On / Off",
        "def": "On",
        "note": "In when to steer. Lets zoompilot steer while cruise is off. Off: steering and cruise engage and disengage together. Offroad only."
      },
      {
        "name": "steer when cruise on / Steer When Cruise On",
        "values": "On / Off",
        "def": "On",
        "note": "In when to steer. Turning cruise on with its on/off button also turns steering on. Cars without a lane keep button need this on to steer. Greyed with steer without cruise off or tja button on."
      },
      {
        "name": "steer when cruise set / Steer When Cruise Set",
        "values": "On / Off",
        "def": "On",
        "note": "In when to steer. Setting or resuming a cruise speed also turns steering on, and steering stays on until you switch it off or turn off the car. Greyed with steer without cruise off or tja button on."
      },
      {
        "name": "steering on brake / Steering on Brake",
        "values": "remain / pause / disengage",
        "def": "remain",
        "note": "In when to steer. What steering does when you press the brake. Pause resumes it when you let go. Greyed with steer without cruise off."
      },
      {
        "name": "tja button / Mazda TJA Button",
        "values": "On / Off",
        "def": "Off",
        "note": "In when to steer. Mazda only. The TJA button becomes the only steering switch; the MRCC button then only controls cruise. Turn on only if your car has the button. Offroad only. Greyed with steer without cruise off."
      },
      {
        "name": "auto lane change / Auto Lane Change by Blinker",
        "values": "off / nudge / nudgeless / 0.5 s / 1 s / 2 s / 3 s",
        "def": "nudge",
        "note": "In lane change. Nudge: signal, then nudge the wheel. Nudgeless and timed modes change lanes on the blinker alone. Signal only when traffic allows."
      },
      {
        "name": "bsm delay / Auto Lane Change: Delay with Blind Spot",
        "values": "On / Off",
        "def": "Off",
        "note": "In lane change. Waits an extra second after the blind spot clears. Needs blind spot monitoring and nudgeless or a timed mode."
      },
      {
        "name": "road edge block / Block Lane Change: Road Edge Detection",
        "values": "On / Off",
        "def": "Off",
        "note": "In lane change. Blocks a lane change toward a road edge the model sees."
      },
      {
        "name": "lane change smoothing / Lane Change Smoothing",
        "values": "off / fast / medium / slow / extra slow",
        "def": "off",
        "note": "In lane change. Slower, smoother lane changes. Off is stock."
      },
      {
        "name": "enable blinker pause / Pause Lateral Control with Blinker",
        "values": "On / Off",
        "def": "Off",
        "note": "In blinker pause. Pauses steering while you signal at low speed, so you can turn by hand."
      },
      {
        "name": "blinker speed / Minimum Speed to Pause Lateral Control",
        "values": "0\u2013255, step 5",
        "def": "20",
        "note": "In blinker pause. km/h or mph. Below this speed the blinker pauses steering. Greyed until blinker pause is on."
      },
      {
        "name": "blinker delay / Post-Blinker Delay",
        "values": "0\u201310 s, step 1",
        "def": "0 s",
        "note": "In blinker pause. Wait before steering resumes after the blinker ends. Greyed until blinker pause is on."
      },
      {
        "name": "enable torque control / Enforce Torque Lateral Control",
        "values": "On / Off",
        "def": "On for supported Mazdas; otherwise Off",
        "note": "In torque control. Steers with zoompilot's torque tunes. Tune version, self tune and custom tune need it. Offroad only. Greyed while NNLC is on. Not on angle-steering cars."
      },
      {
        "name": "jerk aware / Lateral Jerk Torque Controller",
        "values": "On / Off",
        "def": "Off",
        "note": "In torque control. Looks ahead to smooth corrections. No gain on Mazdas in testing; leave it off. Offroad only. Greyed while NNLC is on or when every model size runs the v2 tune."
      },
      {
        "name": "tune version (small models) / Torque Control Tune Version (Small Models)",
        "values": "v0.0 / v1.0 / v2.0",
        "def": "v2.0 for supported Mazdas; otherwise v0.0",
        "note": "In torque control. The steering tune while a small model drives. Keep the default. Offroad only. Greyed with torque control off."
      },
      {
        "name": "tune version (big models) / Torque Control Tune Version (Big Models)",
        "values": "v0.0 / v1.0 / v2.0",
        "def": "v1.0",
        "note": "In torque control. The steering tune while a big model drives. Keep the default. Offroad only. Greyed with torque control off."
      },
      {
        "name": "enable self-tune / Self-Tune",
        "values": "On / Off",
        "def": "On for supported Mazdas; otherwise Off",
        "note": "In torque control \u2192 self tune. Learns how your car steers, per speed range. Needs torque control. Offroad only. Greyed while manual realtime is on."
      },
      {
        "name": "less restrict / Less Restrict Settings for Self-Tune (Beta)",
        "values": "On / Off",
        "def": "Off",
        "note": "In torque control \u2192 self tune. Learns from fewer samples and accepts values further from the car's defaults. Needs self-tune. Offroad only."
      },
      {
        "name": "enable custom tuning / Enable Custom Tuning",
        "values": "On / Off",
        "def": "Off",
        "note": "In torque control \u2192 custom tune. Starts from your own lateral acceleration and friction. Self-tune still learns from there. Recommended off. Offroad only."
      },
      {
        "name": "manual realtime / Manual Real-Time Tuning",
        "values": "On / Off",
        "def": "Off",
        "note": "In torque control \u2192 custom tune. Steers with your values at every speed, ignoring self-tune. Applies within seconds, even while driving. Needs custom tuning."
      },
      {
        "name": "lat accel / Lateral Acceleration Factor",
        "values": "0.01\u20135.00 m/s\u00b2, step 0.01",
        "def": "2.5",
        "note": "In torque control \u2192 custom tune. Higher values steer with less torque. Needs custom tuning."
      },
      {
        "name": "friction / Friction",
        "values": "0.01\u20131.00, step 0.01",
        "def": "0.1",
        "note": "In torque control \u2192 custom tune. Higher values add torque for small corrections. Needs custom tuning."
      },
      {
        "name": "nnlc / Neural Network Lateral Control (NNLC)",
        "values": "On / Off",
        "def": "Off",
        "note": "Steers with a neural network instead of the torque controller. zoompilot's torque tune is the tested path on Mazda. Offroad only. Greyed while torque control or jerk aware is on."
      }
    ]
  },
  {
    "panel": "Cruise",
    "anchor": "cruise",
    "items": [
      {
        "name": "alpha longitudinal / Alpha Longitudinal",
        "values": "On / Off",
        "def": "Off",
        "note": "In alpha longitudinal. zoompilot controls gas and brakes. Disables Mazda radar, automatic emergency braking, and forward collision warning. On Mazda, needs a compatible Mazda EPS (2022+). Offroad only; asks you to confirm."
      },
      {
        "name": "set speed assist / Set Speed Assist",
        "values": "On / Off",
        "def": "On",
        "note": "In alpha longitudinal. Brings the driving model up to your set speed and following distance at stock cruise pace; the model still makes every slowdown. Switch it on the go by holding the follow-distance button, long-pressing the comma 4 home screen or tapping the comma 3X onroad button."
      },
      {
        "name": "slow for curves: vision / Slow for Curves: Vision",
        "values": "On / Off",
        "def": "Off",
        "note": "Slows for curves the camera sees, then resumes your set speed. Without alpha longitudinal, Mazda uses cruise-button control. Turn on while disengaged."
      },
      {
        "name": "slow for curves: map / Slow for Curves: Map",
        "values": "On / Off",
        "def": "Off",
        "note": "Slows for curves in map data. Download maps in sunnylink first. Turn on while disengaged."
      },
      {
        "name": "speed limit mode / Speed Limit",
        "values": "off / info / warn / assist",
        "def": "info",
        "note": "In speed limit. Assist: press - or + to match a new limit. Info and warn show the sign on comma 3X only."
      },
      {
        "name": "source / Speed Limit Source",
        "values": "car / map / car-first / map-first / combined",
        "def": "map-first",
        "note": "In speed limit (comma 3X: Customize Source). Combined uses the lower. Car needs a nav SD card on Mazda. Map uses downloaded maps. Greyed with speed limit off."
      },
      {
        "name": "offset type / Speed Limit Offset",
        "values": "none / fixed / %",
        "def": "none",
        "note": "In speed limit. Adds a fixed amount or a percentage to the limit. Greyed with speed limit off."
      },
      {
        "name": "offset value",
        "values": "\u221230 to +30, step 1",
        "def": "0",
        "note": "In speed limit. km/h, mph, or %. Negative goes below the limit. Greyed until an offset type is set."
      },
      {
        "name": "enable custom increments / Custom ACC Speed Increments",
        "values": "On / Off",
        "def": "Off",
        "note": "In custom increments. Sets how far + and - move your set speed. Mazda uses cruise-button control. Turn on while disengaged."
      },
      {
        "name": "short press / Short Press Increment",
        "values": "1\u201310",
        "def": "1",
        "note": "In custom increments. km/h or mph per tap. Greyed until custom increments is on."
      },
      {
        "name": "long press / Long Press Increment",
        "values": "1 / 5 / 10",
        "def": "5",
        "note": "In custom increments. km/h or mph per step while holding. Greyed until custom increments is on."
      }
    ]
  },
  {
    "panel": "Models",
    "anchor": "models",
    "items": [
      {
        "name": "small models / Small Model",
        "values": "Available small models",
        "def": "Firehose (fm)",
        "note": "In select model. Runs on the comma. Keep the default for your first drive. Offroad only."
      },
      {
        "name": "big models / Big Model",
        "values": "Available big models",
        "def": "Cinque Terre Model v2, or Jetlink's own default",
        "note": "In select model. Runs on a Chestnut board or over Jetlink. Offroad only."
      },
      {
        "name": "jetlink / Jetlink",
        "values": "off / usb / iOS",
        "def": "off",
        "note": "Runs big models on a computer or phone plugged into the comma. USB for Mac, Jetson, Linux, or Android; iOS for iPhone or iPad. Turns off ADB. Offroad only. Hidden beside a Chestnut board."
      },
      {
        "name": "lane center assist / Lane Center Assist (Alpha)",
        "values": "off / on / debug ui",
        "def": "off",
        "note": "A gentle nudge toward the middle of the lane on top of the model's steering, stronger when lane lines are clear. Debug ui (comma 4) shows the push in cm. Not available with the Default model."
      },
      {
        "name": "small model steer / Small Model Steering",
        "values": "off, or a speed",
        "def": "under 11 mph (5 m/s)",
        "note": "With a big model, the small model steers below this speed. It is steadier when slow. Not available with the Default model."
      },
      {
        "name": "lane turn desires / Use Lane Turn Desires",
        "values": "off, or a speed",
        "def": "off",
        "note": "With the blinker on below this speed (19 mph when on), plans the turn that way, so the car does not pick the wrong turn at a light."
      },
      {
        "name": "steer delay / Live Learning Steer Delay",
        "values": "live, or a fixed delay",
        "def": "live",
        "note": "Live learns your car's steering response delay. Or pick a fixed delay (0.2 s on comma 3X)."
      },
      {
        "name": "camera offset / Adjust Camera Offset",
        "values": "-0.35 to 0.35 m",
        "def": "0 m",
        "note": "Shifts where the model thinks the camera sits. Positive moves it left."
      }
    ]
  },
  {
    "panel": "Display",
    "anchor": "display",
    "items": [
      {
        "name": "brightness / Onroad Brightness",
        "values": "auto / auto (dark) / screen off / 5\u2013100%",
        "def": "auto",
        "note": "Screen brightness while driving, after the brightness delay. Auto (dark) can go dimmer. Alerts brighten the screen."
      },
      {
        "name": "brightness delay / Onroad Brightness Delay",
        "values": "3 s \u2013 10 min",
        "def": "10 min",
        "note": "Wait before the brightness setting applies. Greyed while brightness is auto or auto (dark)."
      },
      {
        "name": "ui timeout / Interactivity Timeout",
        "values": "default, 10\u2013120 s, step 10",
        "def": "default",
        "note": "How long settings stay open without a touch."
      },
      {
        "name": "screen saver / Screen Saver",
        "values": "On / Off",
        "def": "On",
        "note": "Shows a screen saver when offroad and idle, instead of a dark screen."
      },
      {
        "name": "saver duration / Screen Saver Duration",
        "values": "1\u201310 min, step 1",
        "def": "5 min",
        "note": "How long the screen saver runs before the screen turns off. Greyed with screen saver off."
      }
    ]
  },
  {
    "panel": "Visuals",
    "anchor": "visuals",
    "items": [
      {
        "name": "blind spot / Show Blind Spot Warnings",
        "values": "On / Off",
        "def": "Off",
        "note": "Shows a warning when a car is in your blind spot. Greyed on cars without blind spot monitoring."
      },
      {
        "name": "rainbow mode / Enable Tesla Rainbow Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "Draws the driving path as a rainbow. Cosmetic only."
      },
      {
        "name": "green light alert / Green Traffic Light Alert (Beta)",
        "values": "On / Off",
        "def": "Off",
        "note": "Chimes when your light turns green with no car ahead. Only while cruise is not engaged. Check the road before you go."
      },
      {
        "name": "lead depart alert / Lead Departure Alert (Beta)",
        "values": "On / Off",
        "def": "Off",
        "note": "Chimes when you're stopped and the car ahead pulls away. Only while cruise is not engaged."
      },
      {
        "name": "Steering Arc",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. Draws the steering arc on the driving screen."
      },
      {
        "name": "Enable Standstill Timer",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. Shows a timer when stopped."
      },
      {
        "name": "Display Road Name",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. Needs OpenStreetMap data for your area."
      },
      {
        "name": "Speedometer: Always Display True Speed",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. Shows wheel-speed-sensor speed on supported cars."
      },
      {
        "name": "Speedometer: Hide from Onroad Screen",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. Hides the speedometer."
      },
      {
        "name": "Display Turn Signals",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. Draws turn indicators on the HUD."
      },
      {
        "name": "Real-time Acceleration Bar",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. Shows how hard the car is accelerating or braking."
      },
      {
        "name": "Display Metrics Below Chevron",
        "values": "Off / Distance / Speed / Time / All",
        "def": "All",
        "note": "comma 3X only. Shows lead car data under the chevron. Needs openpilot longitudinal control."
      },
      {
        "name": "Developer UI",
        "values": "Off / Bottom / Right / Right & Bottom",
        "def": "Off",
        "note": "comma 3X only. Real-time debug values."
      }
    ]
  },
  {
    "panel": "Toggles",
    "anchor": "toggles",
    "items": [
      {
        "name": "driving personality / Driving Personality",
        "values": "aggressive / standard / relaxed",
        "def": "standard",
        "note": "Following distance and gas and brake style. Shown only with openpilot longitudinal control (alpha longitudinal on Mazda)."
      },
      {
        "name": "use metric units / Use Metric System",
        "values": "On / Off",
        "def": "Off",
        "note": "km/h instead of mph."
      },
      {
        "name": "lane departure warnings / Enable Lane Departure Warnings",
        "values": "On / Off",
        "def": "Off",
        "note": "Warns when you drift over a lane line above 31 mph (50 km/h) without signaling."
      },
      {
        "name": "always-on driver monitor / Always-On Driver Monitoring",
        "values": "On / Off",
        "def": "Off",
        "note": "Monitors the driver even when zoompilot is not engaged."
      },
      {
        "name": "record & upload cabin camera / Record and Upload Driver Camera",
        "values": "On / Off",
        "def": "Off",
        "note": "Uploads cabin camera data to improve driver monitoring. Applies next drive. Greyed while engaged."
      },
      {
        "name": "record & upload mic audio / Record and Upload Microphone Audio",
        "values": "On / Off",
        "def": "Off",
        "note": "Adds microphone audio to dashcam videos. Applies next drive. Greyed while engaged."
      },
      {
        "name": "enable sunnypilot / Enable sunnypilot",
        "values": "On / Off",
        "def": "On",
        "note": "Master switch for zoompilot. Off uses your car's stock driver assistance. Greyed while engaged."
      },
      {
        "name": "Disengage on Accelerator Pedal",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. Pressing the gas disengages. Off: the gas overrides without canceling."
      }
    ]
  },
  {
    "panel": "Network",
    "anchor": "network",
    "items": [
      {
        "name": "network usage / Wi-Fi Network Metered",
        "values": "default / metered / unmetered",
        "def": "default",
        "note": "For the current Wi-Fi. Metered stops large uploads on it."
      },
      {
        "name": "enable tethering / Enable Tethering",
        "values": "On / Off",
        "def": "Off",
        "note": "Shares the device's internet through a Wi-Fi hotspot."
      },
      {
        "name": "tethering password / Tethering Password",
        "values": "8+ characters",
        "def": "Device default",
        "note": "Password for the hotspot."
      },
      {
        "name": "enable roaming / Enable Roaming",
        "values": "On / Off",
        "def": "Off",
        "note": "Allows cellular data roaming. Hidden with full comma prime."
      },
      {
        "name": "apn settings / APN Setting",
        "values": "Text",
        "def": "Blank (automatic)",
        "note": "The access point name your cellular carrier needs. Hidden with full comma prime."
      },
      {
        "name": "cellular metered / Cellular Metered",
        "values": "On / Off",
        "def": "On",
        "note": "Stops large uploads over cellular. Hidden with full comma prime."
      }
    ]
  },
  {
    "panel": "Device",
    "anchor": "device",
    "items": [
      {
        "name": "enable always offroad / Enable Always Offroad",
        "values": "Slide to confirm",
        "def": "Off",
        "note": "Keeps the device offroad with the car on, so zoompilot won't engage. On comma 4, a button in the main settings list; exit always offroad ends it. Disengage first. With alpha longitudinal on Mazda, zoompilot hands the radar back first, even while moving."
      },
      {
        "name": "Change Language",
        "values": "Installed languages",
        "def": "English",
        "note": "comma 3X only. Device language."
      },
      {
        "name": "Wake Up Behavior",
        "values": "Default / Offroad",
        "def": "Default",
        "note": "comma 3X only. Offroad starts the device in always offroad after boot or sleep."
      },
      {
        "name": "Max Time Offroad",
        "values": "Always On, 5 m \u2013 30 h",
        "def": "30 h",
        "note": "comma 3X only. Shuts the device down this long after the engine goes off."
      },
      {
        "name": "Quiet Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. Fewer sounds."
      },
      {
        "name": "Onroad Uploads",
        "values": "On / Off",
        "def": "On",
        "note": "comma 3X only. Uploads route logs while driving."
      }
    ]
  },
  {
    "panel": "Software",
    "anchor": "software",
    "items": [
      {
        "name": "target branch / Target Branch",
        "values": "Available branches",
        "def": "Installed branch",
        "note": "The branch the next update check downloads. Offroad only. Hidden on tested branches."
      },
      {
        "name": "Disable Updates",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. Stops over-the-air updates. Needs Show Advanced Controls. Keep updates on to get releases."
      }
    ]
  },
  {
    "panel": "sunnylink",
    "anchor": "sunnylink",
    "items": [
      {
        "name": "enable sunnylink / Enable sunnylink",
        "values": "On / Off",
        "def": "On",
        "note": "Backups, map downloads, and remote settings. Off stops all sunnylink requests."
      },
      {
        "name": "sunnylink uploader / Enable sunnylink uploader (infrastructure test)",
        "values": "On / Off",
        "def": "Off",
        "note": "Uploads driving data to sunnylink servers. A test for top sponsor tiers; does nothing for you yet. Shown with sunnylink on."
      }
    ]
  },
  {
    "panel": "Developer",
    "anchor": "developer",
    "items": [
      {
        "name": "enable ADB / Enable ADB",
        "values": "On / Off",
        "def": "Off",
        "note": "Android Debug Bridge over USB or the network. Offroad only. Greyed while Jetlink is on."
      },
      {
        "name": "enable SSH / Enable SSH",
        "values": "On / Off",
        "def": "Off",
        "note": "Remote shell access with your SSH keys."
      },
      {
        "name": "SSH keys / SSH Keys",
        "values": "GitHub username",
        "def": "Not set",
        "note": "Grants SSH access to a GitHub account's public keys. Enter only your own username."
      },
      {
        "name": "joystick debug mode / Joystick Debug Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "Drives the car from a joystick. Test benches only. Offroad only. Clears after each drive."
      },
      {
        "name": "longitudinal maneuver mode / Longitudinal Maneuver Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "Runs a gas and brake test sequence. Not for road use. Needs openpilot longitudinal control. Offroad only. Clears after each drive."
      },
      {
        "name": "lateral maneuver mode / Lateral Maneuver Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "Runs a steering test sequence. Not for road use. Offroad only. Clears after each drive."
      },
      {
        "name": "ui debug mode / UI Debug Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "Shows touch points and the frame rate."
      },
      {
        "name": "Show Advanced Controls",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. Reveals advanced settings across panels."
      },
      {
        "name": "GitHub Runner Service",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. For zoompilot development builds."
      },
      {
        "name": "copyparty Service",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. Browse and download your routes from a browser on your network. Needs Show Advanced Controls."
      },
      {
        "name": "Quickboot Mode",
        "values": "On / Off",
        "def": "Off",
        "note": "comma 3X only. Faster boot. Needs updates disabled and Show Advanced Controls."
      }
    ]
  }
];
