var ball, database;
var position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //create a reference to a particular location in your database and can be used for reading or writing data to that databse location.
    var ballPosition = database.ref('Ball/Position');

    //.on retrieves a snapshot of the data, and saves it in a variable which is passed as argument to the readPositon function, in this case 'ballPosInDb'
    //within the db, we have name-value pairs, so ur referring to the value part by "value"
    //readposition is like a listener, a function that will be called whenever there is a change in this particular value we are interested in
    //showError can be skipped, it will be called if there is an error in reading data
    ballPosition.on("value",readPosition,showError);
    //whenever there is a change in data in the db, the value gets read and gets passed to the parameter 'ballPosInDb' of readPosition() function
    
    //Also, lines 11 and 17 can be combined and be written as --
    //database.ref('ball/position').on("value",readPosition,showError);
    //Both are the same
}

function draw(){
    background("white");
    if(position !== undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    }
    drawSprites();
}
/*
function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}*/



function readPosition(ballPosInDb){
    //.val() method gives a javascript representation of the data or in other words, converts it to JSON format
    position = ballPosInDb.val();
    ball.x = position.X;
    ball.y = position.Y;
  //  console.log(ballPosInDb)
    //console.log("read",position.X);
}

function writePosition(x,y){
    //console.log("write",position.x)
    database.ref('Ball/Position').set(
        {
            'X':position.X + x,
            'Y':position.Y + y

        }
    )
}

function showError(){
    console.log("Error is reading data")
}