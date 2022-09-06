img = ""
status1 = ""
objects = []

function preload() {
    song = loadSound("alarm.mp3")
}

function setup() {
    canvas = createCanvas(650, 450)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(650, 450)
    video.hide()
    objDetector = ml5.objectDetector("cocossd", model_loaded)
    document.getElementById("status").innerHTML = "status= detecting objects"
}

function draw() {
    image(video, 0, 0, 650, 450)
    if (status1 != "") {
        objDetector.detect(video, got_results)
        r = random(255)
        g = random(255)
        b = random(255)
        for (let index = 0; index < objects.length; index++) {

            document.getElementById("status").innerHTML = "status= object detecting"
            document.getElementById("numberOfObjects").innerHTML = "Number Of Objects Is Detecting " + objects.length
            fill(r, g, b)
            percent = floor(objects[index].confidence * 100)
            text(objects[index].label + " " + percent + "%", objects[index].x, objects[index].y)
            noFill()
            stroke(r, g, b)
            rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height)
            if (objects[index].label == "person") {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();
            } else {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                console.log("play");
                song.play();

            }
            if (objects.length == 0) {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                console.log("play");
                song.play();
            }

        }
    }

}




function model_loaded() {
    console.log("Model Is Loaded")
    status1 = true;
    objDetector.detect(video, got_results)
}

function got_results(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results) 
        objects = results
    }
}