leftWristX = 0;
leftWristY=0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;
status = "";
status2 = "";

function preload()
{
song1 = loadSound('music.mp3');
song2 = loadSound('music2.mp3');
}
function setup()
{
canvas = createCanvas(400,300);
canvas.position(484,300);
capture = createCapture(VIDEO);
capture.hide();
poseNet = ml5.poseNet(capture,modelLoaded);
poseNet.on('pose',gotPoses);
}
function draw()
{
image(capture,0,0,400,300);
status = song1.isPlaying();
fill('#FF0000');
stroke('#FF0000');
if(leftWristScore > 0.2)
{
    circle(leftWristX, leftWristY, 20);
    song2.stop();
    if(status == false)
    {
        song1.play();
        document.getElementById('song_name_display').innerHTML = 'Song1';
    }
}
status2 = song2.isPlaying();
if(rightWristScore > 0.2)
{
    circle(rightWristX, rightWristY, 20);
    song1.stop();
    if(status2 == false)
    {
        song2.play();
        document.getElementById('song_name_display').innerHTML = 'Song2';
    }
}
}

function modelLoaded()
{
    console.log("PoseNet is Loaded!");
}
function gotPoses(results)
{
    if(results.length>0)
    {
        leftWristX = results[0].pose.leftWrist.x;
        console.log(leftWristX);
        leftWristY = results[0].pose.leftWrist.y;
        console.log(leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        console.log(rightWristX);
        rightWristY = results[0].pose.rightWrist.y;
        console.log(rightWristY);
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
    }
}