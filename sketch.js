let video;
let playing = false;
let videoStarted = false;
let scrollX;
let textHeight;
let videoDuration;

// Text scroll variables
let poem = "I like to think (and the sooner the better!) of a cybernetic meadow where mammals and computers live together in mutually programming harmony like pure water touching clear sky. — I like to think (right now, please!) of a cybernetic forest filled with pines and electronics where deer stroll peacefully past computers as if they were flowers with spinning blossoms. — I like to think (it has to be!) of a cybernetic ecology where we are free of our labors and joined back to nature, returned to our mammal brothers and sisters, and all watched over by machines of loving grace. — [Written and voiced by Richard Brautigan, 1967] —";

// Add URL variable
let articleURL = "https://darioamodei.com/machines-of-loving-grace";
let isHovering = false;

function preload() {
    video = createVideo('all.mov', videoLoaded);
    video.loop();
}

function videoLoaded() {
    videoDuration = video.duration();
    scrollX = width;
    videoStarted = true;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    video.hide();
    video.play();
    playing = true;
    
    // Initialize text scroll
    textHeight = height * 0.93;
    
    // Set text properties
    textSize(20);
    textFont('Courier');
    textAlign(LEFT, CENTER);
}

function draw() {
    background(0);
    
    // Calculate scaling to maintain aspect ratio
    let scale = Math.max(width/video.width, height/video.height);
    let newWidth = video.width * scale;
    let newHeight = video.height * scale;
    
    // Center the video
    let x = (width - newWidth) / 2;
    let y = (height - newHeight) / 2;
    
    // Display video scaled and centered
    image(video, x, y, newWidth, newHeight);
    
    // Draw ticker text
    push();
    
    // Black background strip for text
    noStroke();
    fill(0, 0, 0, 200);
    rect(0, textHeight - 25, width, 50);
    
    // Add subtle gradient edges
    for (let i = 0; i < 10; i++) {
        let alpha = map(i, 0, 10, 100, 0);
        fill(0, 0, 0, alpha);
        rect(0, textHeight - 25 - i, width, 1);
        rect(0, textHeight + 24 + i, width, 1);
    }
    
    // Draw text only if video has started
    if (videoStarted && videoDuration) {
        fill(255);
        let textW = textWidth(poem);
        let totalScrollWidth = width + textW;
        
        // Calculate position based on video time
        let progress = (video.time() / videoDuration);
        scrollX = width - (totalScrollWidth * progress);
        
        // Draw text
        text(poem, scrollX, textHeight);
        
        // Draw second copy for smooth loop
        if (scrollX < width/2) {
            text(poem, scrollX + totalScrollWidth, textHeight);
        }
    }
    
    pop();
    
    // Define clickable area in center of video
    let centerX = width/2;
    let centerY = height/2;
    let clickableRadius = 100;
    
    // Check if mouse is over clickable area
    let d = dist(mouseX, mouseY, centerX, centerY);
    isHovering = d < clickableRadius;
    
    // Draw subtle indicator when hovering
    if (isHovering) {
        push();
        noFill();
        stroke(255, 255, 255, 50);
        strokeWeight(2);
        ellipse(centerX, centerY, clickableRadius*2);
        cursor(HAND);
        pop();
    } else {
        cursor(AUTO);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    textHeight = height * 0.93;
}

function keyPressed() {
    if (keyCode === 32) { // spacebar
        if (playing) {
            video.pause();
            playing = false;
        } else {
            video.play();
            playing = true;
        }
    }
}

function mouseClicked() {
    let centerX = width/2;
    let centerY = height/2;
    let clickableRadius = 100;
    
    // Check if click was in center area
    let d = dist(mouseX, mouseY, centerX, centerY);
    if (d < clickableRadius) {
        window.open(articleURL, '_blank');
    }
} 