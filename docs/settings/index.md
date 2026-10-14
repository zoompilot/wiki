---
title: Settings reference
type: reference
---

# Settings reference

Look up common settings by panel or search their names. For a normal
setup, start with [Recommended settings](recommended.md).
{ .zp-lede }

## common tasks

[Steering and cruise controls](../using-zoompilot/controls.md) ·
[Slow for Curves](../features/smart-cruise.md) ·
[Speed limits](../features/speed-limit-assist.md) ·
[Set up Jetlink](../jetlink/index.md)

## before changing settings

Park first. Some changes require the ignition off or a restart. A setting
can be unavailable because your car does not support it or another mode
overrides it. Follow the on-device explanation.

On comma 4, Steering uses **mads**, **lane change**, and **torque control**
submenus. Names below include the longer comma 3X wording where useful.
Long-press a comma 4 setting for help.

!!! danger "Experimental speed control"

    Alpha Longitudinal disables Mazda automatic emergency braking and
    forward collision warning. Read [its guide](../features/alpha-longitudinal.md)
    before changing it.

## zoompilot defaults

Mazda torque control and Self-Tune are enabled when the car is identified
on supported steering hardware. The small-model tune starts at v2.0;
large models keep a separate tune. Speed-dependent learning follows Self-Tune.
Your saved choices persist across restarts.

<div id="zp-settings-controls" class="zp-explorer-controls" markdown="0"></div>
<p id="zp-settings-count" class="zp-explorer-count" markdown="0"></p>

## Steering

On comma 4, open the relevant mads, lane change, or torque control submenu.

<div class="zp-panel-cards" data-panel="Steering"></div>

<noscript markdown="1">

| Setting | Default | What it does |
| --- | --- | --- |
| Enable Modular Assistive Driving System (MADS) | On | Lets steering stay active without cruise engaged. Off reverts to stock engagement rules. |
| Toggle with Main Cruise | On | MADS sub-panel. |
| Unified Engagement Mode (UEM) | On | Turns steering on with cruise engagement. Steering can stay active when cruise is cancelled. |
| Steering Mode on Brake Pedal | Remain Active | MADS sub-panel. What steering does when you press the brake pedal. |
| Mazda TJA Button / tja button | Off | Steering → MADS. With this on, TJA is the steering switch; main cruise controls cruise only. Use only on a car with the button. |
| Pause Lateral Control with Blinker | Off | Pauses steering below a speed while the blinker is on. |
| Minimum Speed to Pause Lateral Control | 20 | km/h or mph. Needs the toggle above. |
| Post-Blinker Delay | 0 s | Wait time before steering resumes after the blinker ends. |
| Enforce Torque Lateral Control | On on supported Mazda steering hardware; otherwise car-dependent | Forces the torque steering controller. Hidden on angle-steering cars. Conflicts with NNLC. Applied on supported Mazda steering hardware. |
| Lateral Jerk Torque Controller | Off | Smoother wheel movement in theory. Tested on Mazdas: no gain, and it hurt performance. Leave it off. |
| Self-Tune | On on supported Mazda steering hardware; otherwise car-dependent | Learns steering response at different speeds. There is no separate speed-dependent switch. |
| Less Restrict Settings for Self-Tune (Beta) | Off | More forgiving learning. Needs Self-Tune. |
| Enable Custom Tuning | Off | Manual lateral acceleration factor and friction, instead of the offline data. Recommended off. |
| Manual Real-Time Tuning | Off | Forces your fixed values live, over self-tune. Needs Enable Custom Tuning. |
| Lateral Acceleration Factor | 2.5 | Needs Enable Custom Tuning. |
| Friction | 0.1 | Needs Enable Custom Tuning. |
| Torque Control Tune Version | Small model: v2.0 on Mazda; big model: v1.0 | Small and big driving models keep separate steering tunes. Keep the defaults. |
| Auto Lane Change by Blinker | Nudge | Blinker-only lane changes after a delay. Caution: only signal when traffic allows. |
| Block Lane Change: Road Edge Detection | Off | Blocks a lane change when the model sees a road edge on that side. |
| Lane Change Smoothing | Off | Slows the lane change down. Off is stock. |
| Auto Lane Change: Delay with Blind Spot | Off | Waits when BSM sees a car. Needs BSM and a lane change timer above. |
| Neural Network Lateral Control (NNLC) | Off | Neural-network steering. Models exist for the CX-5 2022 and CX-9, but zoompilot's tuned torque control is the tested path on Mazda. Conflicts with Enforce Torque and the jerk controller. |

</noscript>

## Cruise

On comma 4, experimental controls are inside alpha longitudinal and speed limits inside speed limit.

<div class="zp-panel-cards" data-panel="Cruise"></div>

<noscript markdown="1">

| Setting | Default | What it does |
| --- | --- | --- |
| Alpha Longitudinal | Off | Cruise → alpha longitudinal on comma 4; top of Cruise on comma 3X. Experimental acceleration and braking. Disables Mazda radar, automatic emergency braking, and forward collision warning. Compatible hardware required. |
| Experimental Mode | Off | End-to-end driving behavior. Shown when zoompilot controls gas and brakes (alpha longitudinal on Mazda). |
| Dynamic Experimental Control | Off | The model picks between ACC and end-to-end per moment. Needs longitudinal control. |
| Experimental Mode Speed Assist / speed assist | Off | Raises speed toward the set speed in Experimental Mode when the road ahead is clear. No effect while Dynamic Experimental Control is on. |
| Experimental Mode Lead Follow Assist / lead follow assist | Off | Can reduce excess following gap behind a steady car. No effect while Dynamic Experimental Control is on. |
| Disengage Cruise on Accelerator Pedal | Off | When off, the gas pedal overrides without canceling. |
| Driving Personality | Standard | Follow distance and gas/brake style. You can cycle it with the distance button on some cars. |
| Custom ACC Speed Increments / custom increments | Off | Choose step sizes for cruise-speed buttons. Cruise-button control starts automatically when needed. |
| Short Press Increment | 1 | km/h or mph per short press. |
| Long Press Increment | 5 | Speed step while holding a cruise button. |
| Speed Limit Assist Mode | Information | Assist can change the set speed. Cruise-button control starts automatically where needed. |
| Speed Limit Source | Map Data Priority | Car data on Mazda needs a nav SD card. Map data comes from downloaded maps. |
| Speed Limit Offset Type | Off | How the offset is applied. |
| Speed Limit Offset Value | 0 | km/h or mph. Needs an offset type above. |
| Slow for Curves: Vision | Off | Slows for curves read from the cameras. |
| Slow for Curves: Map | Off | Slows for curves read from map data. Download maps through sunnylink first. |

</noscript>

## Models

Choose the on-device model or set up an optional Jetlink connection.

<div class="zp-panel-cards" data-panel="Models"></div>

<noscript markdown="1">

| Setting | Default | What it does |
| --- | --- | --- |
| Driving Model | Firehose | Keep the default for your first drive. |
| Jetlink | Off | Models → Jetlink. USB for Mac, Jetson, Linux, or Android; iOS for iPhone/iPad. The external device needs its own setup and power. |
| Big Model | Current default in the model list | Keep the default for first setup. Needs Jetlink or supported external acceleration hardware. |
| Use Lane Turn Desires | Off | Plans a turn toward your blinker at low speed, so the car does not pick the wrong turn at a light. |
| Adjust Lane Turn Speed | 19 | km/h or mph cap for turn desires. Needs the toggle above and Show Advanced Controls. |
| Live Learning Steer Delay | On | The device learns your car's steering response delay. |
| Adjust Software Delay | 0.2 | Fixed delay when Live Learning is off. Needs Show Advanced Controls. |
| Neural Network Lateral Control (NNLC) | Off | Same setting as in the Steering panel. |
| Adjust Camera Offset | 0 | Shifts the model's view. Positive moves it left. Needs Show Advanced Controls. |

</noscript>

## Visuals

Availability depends on the device and car.

<div class="zp-panel-cards" data-panel="Visuals"></div>

<noscript markdown="1">

| Setting | Default | What it does |
| --- | --- | --- |
| Show Blind Spot Warnings | Off | Needs a car with blind spot monitoring. |
| Steering Arc | Off | Draws the steering arc on the driving screen. |
| Display Turn Signals | Off | Draws turn indicators on the HUD. |
| Display Road Name | Off | Needs OpenStreetMap data for your area. |
| Standstill Timer | Off | Shows a timer when stopped. |
| Real-time Acceleration Bar | Off | Shows what the car is doing right now. |
| Display Metrics Below Chevron | All | Needs longitudinal control to show. |
| Developer UI | Off | Real-time debug values. |
| Speedometer: Always Display True Speed | Off | Wheel-speed-based speed on supported cars. |
| Speedometer: Hide from Onroad Screen | Off | Hides the speedometer. |
| Green Traffic Light Alert (Beta) | Off | Chime when your light turns green. A notification only — you still watch the road. |
| Lead Departure Alert (Beta) | Off | Chime when the car ahead moves. |
| Tesla Rainbow Mode | Off | Cosmetic path colors. |

</noscript>

## Toggles

Availability depends on the device and car.

<div class="zp-panel-cards" data-panel="Toggles"></div>

<noscript markdown="1">

| Setting | Default | What it does |
| --- | --- | --- |
| Enable zoompilot | On | Master switch for driving assistance. Some screens retain the sunnypilot name. |
| Enable Lane Departure Warnings | Off | Alerts when you drift over a lane line above 50 km/h (31 mph). |
| Always-On Driver Monitoring | Off | Runs driver monitoring even when zoompilot is not engaged. |
| Use Metric System | Off | km/h instead of mph. |
| Record and Upload Driver Camera | Off | Helps improve driver monitoring. Takes effect next drive. |
| Record and Upload Microphone Audio | Off | Audio in dashcam clips. Takes effect next drive. |

</noscript>

## Device

Availability depends on the device and car.

<div class="zp-panel-cards" data-panel="Device"></div>

<noscript markdown="1">

| Setting | Default | What it does |
| --- | --- | --- |
| Force Offroad Mode | Off | Keeps the device offroad. On Mazda with alpha longitudinal, zoompilot waits until you are parked, then hands the radar back before it grants this. |
| Wake Up Behavior | Standard | What the device does after boot or sleep. |
| Quiet Mode | Off | Fewer sounds. |
| Onroad Uploads | On | Upload route logs while driving. |
| Max Time Offroad | 30 h | Auto shutdown after the engine goes off. |
| Language | English | Device language. |

</noscript>

## Software

Availability depends on the device and car.

<div class="zp-panel-cards" data-panel="Software"></div>

<noscript markdown="1">

| Setting | Default | What it does |
| --- | --- | --- |
| Disable Updates | Off | Stops over-the-air updates. Hidden until Show Advanced Controls is on. Keep updates on to get releases. |

</noscript>

## Developer

Availability depends on the device and car.

<div class="zp-panel-cards" data-panel="Developer"></div>

<noscript markdown="1">

| Setting | Default | What it does |
| --- | --- | --- |
| Enable ADB | Off | Debug bridge over USB or network. |
| Enable SSH | Off | Shell access. SSH keys load from a GitHub username. |
| Joystick Debug Mode | Off | Drives the car from a virtual joystick. Test benches only. |
| UI Debug Mode | Off | Shows touch and FPS overlays. |
| [TEST] Lateral Maneuver Mode | Off | Deterministic steering test sequence. Not for road use. |
| [TEST] Longitudinal Maneuver Mode | Off | Deterministic speed test sequence. Not for road use. |
| Show Advanced Controls | Off | Reveals advanced and debug settings across panels. |
| GitHub Runner Service | Off | For zoompilot development builds. |
| copyparty Service | Off | Browse and download your routes from a browser on your network. Needs Show Advanced Controls. |
| Quickboot Mode | Off | Faster boot. Needs updates disabled and Show Advanced Controls. |

</noscript>

## other panels

- **Network:** Wi-Fi, hotspot, and connectivity.
- **sunnylink / OSM:** downloaded maps, backups, and remote configuration.
- **Vehicle:** automatic car identification. Do not force a different car to unlock features.
- **Display:** screen brightness and comfort settings.

[Recommended settings](recommended.md) · [Need help?](../help/index.md)
