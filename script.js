/* jshint -W117 */
/* undefined variable warning */

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.info(SCHEDULES.length + " schedules loaded.")
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function backgroundHsvGradient(fromH, toH) {
  colorMode(HSB, 360, 100, 100, 1);
  const steps = 200;
  const s = 80;
  const b = 40;
  noStroke();
  for (let x = 0; x < steps; x++) {
    const startY = windowHeight * (x / steps);
    const endY = windowHeight * ((x + 1) / steps);
    fill((x / steps) * (toH - fromH) + fromH, s, b, 1);
    rect(0, startY, windowWidth, endY);
  }
  colorMode(RGB, 255);
}

// 0 = sunday
const SCHEDULES = [
  {weekdays: [1, 5], schedule: [  // M/F
    {hour: 8, minute: 35},
    {hour: 10, minute: 4},
    {hour: 10, minute: 10},
    {hour: 10, minute: 25},
    {hour: 10, minute: 31},
    {hour: 12, minute: 0},
    {hour: 12, minute: 35},
    {hour: 12, minute: 41},
    {hour: 14, minute: 10},
    {hour: 14, minute: 16},
    {hour: 15, minute: 45}
  ]},
  {weekdays: [2, 4], schedule: [  // T/Th
    {hour: 8, minute: 35},
    {hour: 9, minute: 58},
    {hour: 10, minute: 28},
    {hour: 10, minute: 34},
    {hour: 11, minute: 57},
    {hour: 12, minute: 32},
    {hour: 12, minute: 38},
    {hour: 12, minute: 53},
    {hour: 14, minute: 16},
    {hour: 14, minute: 22},
    {hour: 15, minute: 45}
  ]},
  {weekdays: [3], schedule: [  // W
    {hour: 9, minute: 55},
    {hour: 11, minute: 2},
    {hour: 11, minute: 8},
    {hour: 12, minute: 15},
    {hour: 12, minute: 49},
    {hour: 12, minute: 55},
    {hour: 14, minute: 2},
    {hour: 14, minute: 32},
    {hour: 14, minute: 38},
    {hour: 15, minute: 45}
  ]}
]

function draw() {
  background(0);
  backgroundHsvGradient(200, 260);
  const currentTimeOfDay = new Date();
  const dayOfTheWeek = currentTimeOfDay.getDay(); // 0 = sunday
  const hours = currentTimeOfDay.getHours();
  const minutes = currentTimeOfDay.getMinutes();
  const seconds = currentTimeOfDay.getSeconds();
  let mySchedule = null;
  for (let proponent of SCHEDULES) {
    if (proponent.weekdays.includes(dayOfTheWeek)) {
      mySchedule = proponent;
    }
  }
  fill(255, 255, 255);
  noStroke();
  textSize(30);
  textFont('monospace');
  textAlign(CENTER, CENTER);
  if (mySchedule == null) {
    text("No schedule for today", width / 2, height / 2);
    return;
  }
  let entry = null;
  for (const scheduleEntry of mySchedule.schedule) {
    if (scheduleEntry.hour >= hours) {
      if (scheduleEntry.minute > minutes) {
        entry = scheduleEntry;
      }
    }
  }
  if (entry == null) {
    text("Done for today", width / 2, height / 2);
    return;
  }
  
  // time until
  let deltaTotal = (60 - seconds) + (entry.hour - hours) * (60*60) + (entry.minute - minutes) * 60;
  const deltaS = deltaTotal % 60;
  deltaTotal = Math.floor(deltaTotal / 60);
  const deltaM = deltaTotal % 60;
  const deltaH = Math.floor(deltaTotal / 60);
  let b = ""
  let size = 60
  if (deltaH > 0) {
    b += (deltaH + ":").padStart(3, "0")
    size -= 5
  }
  if (deltaM > 0) {
    b += (deltaM + ":").padStart(3, "0")
    size -= 5
  }
  b += ("" + deltaS).padStart(2, "0")
  textSize(size);
  text(b, width / 2, height / 2);
}