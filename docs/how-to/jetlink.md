---
title: Testing jetlink
reviewed: 2026-09
---

# Testing jetlink in the car

jetlink runs a bigger driving model on a Jetson computer next to your
comma. The comma drives on its own small model from the first second and
switches to the Jetson's model once it is ready. The code lives at
[github.com/zoompilot/jetlink](https://github.com/zoompilot/jetlink).

You need:

- a comma 3X or comma four running zoompilot
- a Jetson Orin Nano Super 8 GB on JetPack 6.2
- a USB 3 A-to-C data cable
- a 9 to 20 V supply for the Jetson's barrel jack, sized for 25 W
  (ignition-switched is simplest)

Jetson is configured from a terminal. comma setup is done on device.

Initial setup can take some time. Allow for two hours, mostly waiting,
parked with both devices online.

!!! warning "Experimental"

    The small model drives until the Jetson joins. Hands on the wheel.

## Jetson setup

Run the lines one at a time, letting each finish before the next. The
last line is the long one: it downloads about 6 GB.

```bash
sudo apt update && sudo apt install -y git docker.io nvidia-container
sudo nvidia-ctk runtime configure --runtime=docker && sudo systemctl restart docker
git clone https://github.com/zoompilot/jetlink.git && cd jetlink
sudo docker/build.sh
```

Next, install the server so it starts at every boot. Keep the line
starting `sudo sed` unless the Jetson is on an always-on supply and
you want it to sleep between drives.

```bash
sudo systemctl mask systemd-networkd-wait-online.service
sudo nvpmodel -m 2
sudo mkdir -p /mnt/data/jetlink /etc/jetlink
sudo docker image inspect --format 'JETLINK_IMAGE={{.Id}}' jetlink:latest | sudo tee /etc/jetlink/server.env
sudo install -m 755 scripts/jetlink-wake-setup.sh /usr/local/bin/
sudo install -m 644 scripts/99-jetlink-usb-wakeup.rules /etc/udev/rules.d/
sudo install -m 644 scripts/jetlink-server.service /etc/systemd/system/
sudo sed -i 's/ --sleep-after 120//' /etc/systemd/system/jetlink-server.service
sudo udevadm control --reload-rules && sudo systemctl daemon-reload
sudo systemctl enable --now jetlink-server
```

The Jetson server is set up and now listening for the comma. To see it
working: `sudo journalctl -u jetlink-server -f`.

## comma setup

1. **Branch.** Settings → Software → Target Branch → `jetson-trt`
   (under Non-Prebuilt Branches). Update, reboot, and wait out the
   build screen. It may take a while.
2. **Link.** Turn on **Accelerator Link** under Settings → Models.
   Within seconds an **Accelerator Model** row appears, set to
   Cinque Terre, the big driving model. Do not pick Lebowski or Be
   Right Here: they are over the frame budget on this Jetson.
3. **Cable.** Plug the cable into the Jetson's USB-A port and the
   comma's USB-C port. Never plug the C end into the Jetson's USB-C
   port. Do not power either device from the other.

The icon on comma's home button pulses while the model downloads,
roughly 1 GB. comma then sends the model to Jetson. This transfer
takes about 2 minutes and is only performed once after big model
installs. Once
finished, the icon turns green to indicate the big model is ready to
run. An orange icon means it failed, and the alert on the home screen
details the cause.

## Drive

- Initially the small model is used until the big model loads. This
  takes approximately a minute. You'll be alerted when the big model
  has loaded: "Big Model Ready".
- The big model takes over once you disengage and re-engage:
  "Big Model Available, disengage to switch".
- You'll drop back to the small model if the link is lost while
  engaged: "Big Model Lost". Disengage and re-engage. The link
  rejoins on its own and swaps back at the next disengaged moment.

## After the drive

Send back the dongle ID (Settings → Device), the time of the drive,
and what you saw and heard, on the
[Discord](https://discord.gg/jFWkHC2uhh). To stop, turn the same
toggle off.

## If something is off

| You see | It means |
| --- | --- |
| No Accelerator Link toggle | the branch did not install; Settings → Software shows which branch you are on |
| Toggle on, no Accelerator Model row | the USB link did not come up; the offroad alert has the reason |
| Icon never pulses after plugging in | the Jetson does not see the comma: wrong port, charge-only cable, or the server is down |
| Orange icon, download failed | the comma needs Wi-Fi; toggle the link off and on to retry |
| Icon back to normal a minute after parking | the model is released while parked, not a fault |
| Big model drops out every 30 to 45 s | one side is browning out; separate supplies |
| "Speed Error: nan", no path at all | modeld crashed; send the logs |

Logs, only when asked. On the comma:

1. Enable SSH under Settings → Device.
2. Set **SSH Keys** to your GitHub username.
3. The comma's address is on the Wi-Fi row in Settings → Network.

Then:

```bash
ssh comma@<comma-ip> 'tar czf - /data/log' > comma-log.tgz          # laptop
sudo journalctl -u jetlink-server -b -1 --no-pager > jetson.log      # Jetson, after the drive
```
