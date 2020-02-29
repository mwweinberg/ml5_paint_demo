// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js

Available parts are:
0   nose
1	leftEye
2	rightEye
3	leftEar
4	rightEar
5	leftShoulder
6	rightShoulder
7	leftElbow
8	rightElbow
9	leftWrist
10	rightWrist
11	leftHip
12	rightHip
13	leftKnee
14	rightKnee
15	leftAnkle
16	rightAnkle
=== */

let video;
let poseNet;
let poses = [];

let nose;

let song;

let angle = 0;

//new
let img;
function preload() {
  // Load a sound file
  song = loadSound('assets/theme.mp3');
}


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  pixelDensity(1);
  nose = createVector(0,0);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  // Loop the sound forever
  // (well, at least until stop() is called)
  //song.loop();

}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses[0].pose.keypoints[0].part))
}

function draw() {

  image(video, 0, 0, width, height);

  if (poses.length > 0) {
    let pose = poses[0].pose;

    nose = pose['nose'];
  }

  let fixed_nose_x = map(nose.x, 0, width, width, 0);

  angle += 5;
  let val = cos(radians(angle)) * 12.0;
  for (let a = 0; a < 360; a += 75) {
    let xoff = cos(radians(a)) * val;
    let yoff = sin(radians(a)) * val;
    fill(0);
    ellipse(nose.x + xoff, nose.y + yoff, val, val);
  }

}
