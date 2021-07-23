song1 = "music2.mp3";
song2 = "music.mp3";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song_status = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
    }
function setup(){
        canvas = createCanvas(600, 500);
        canvas.center();
    
        video = createCapture(VIDEO);
        video.hide();

        poseNet = ml5.poseNet(video, modelLoaded)
        poseNet.on('pose', gotPoses)
    }
function modelLoaded(){
        console.log("Posenet is Initialized.")
    }
function draw(){
    image(video,0,0,600,500);
    
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 30);
        song2.stop();
        if(song_status == false){
        song1.play();
        document.getElementById("song_name").innerHTML = "Song 1 is Playing";
    }
}
if(scoreRightWrist > 0.2){
    circle(rightWristX, rightWristY, 30);
    song1.stop();
    if(song_status == false){
        song2.play();
        document.getElementById("song_name").innerHTML = "Song 2 is Playing"
    }
}
        
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Left Wrist X = " + leftWristX);
        console.log("Left Wrist Y = " + leftWristY);
        console.log("Right Wrist X = " + rightWristX);
        console.log("Right Wrist Y = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of Left Wrist = " + scoreLeftWrist);
    }
}
