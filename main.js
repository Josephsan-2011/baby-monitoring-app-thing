img = ""
status1 = ""

function preload() {
    img = loadImage("https://stylesatlife.com/wp-content/uploads/2020/03/Different-Types-of-Fruits.jpg")
}

function setup() {
    canvas = createCanvas(650, 450)
    canvas.center()
    objDetector = ml5.objectDetector("cocossd", model_loaded)
    document.getElementById("status").innerHTML = "status= detecting objects"
}

function draw() {
    if (objects[i].label == "person") {
        document.getElementById("number_of_objects").innerHTML = "Baby Found";
        console.log("stop");
        song.stop();
    } else {
        document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
        console.log("play");
        song.play();
    }
}
if (objects.length == 0) {
    document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
    console.log("play");
    song.play();
}
image(img, 0, 0, 650, 450)
fill("white")
text("dog", 45, 75)
noFill()
stroke("red")
rect(30, 60, 450, 350)
fill("white")
text("cat", 300, 75)
noFill()
stroke("red")
rect(300, 60, 350, 350)


function model_loaded() {
    console.log("Model Is Loaded")
    status1 = true;
    objDetector.detect(img, got_results)
}

function got_results(error, results) {
    if (error) {
        console.log(error)
    } else(console.log(results))
}