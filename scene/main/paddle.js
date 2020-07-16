const Paddle = function(game) {
    let o = game.imageByName('paddle')
    // var o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 15,
    // }
    o.x = 100
    o.y = 250
    o.speed = 15
    o.moveLeft = () => {
        o.x -= o.speed
        if (o.x < 0) {
            o.x = 0
        }
    }
    o.moveRight = () => {
        o.x += o.speed
        if (o.x > 400 - o.width) {
            o.x = 400 - o.width
        }
    }
    var aInb = (x, x1, x2) => {
        return x >= x1 && x <= x2
    }
    o.pengzhuang = (ball) => {
        // if (ball.y + ball.height > o.y && ball.x > o.x && ball.x < o.x + o.width) {
        //     return true
        // } else {
        //     return false
        // }
        let a = o
        let b = ball
        if (aInb(a.x, b.x, b.x + b.width) || aInb(b.x, a.x, a.x + a.width)) {
            if (aInb(a.y, b.y, b.y + b.height) || aInb(b.y, a.y , a.y + a.height)) {
                return true
            }
        }
        return false
    }
    return o
}
