const Ball = function(game) {
    let o = game.imageByName('ball')
    o.x = 100
    o.y = 240
    o.speedX = 5
    o.speedY = 5
    o.fired = false
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }

            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            //move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.hasPonit = (x, y) => {
        var xIn = x >= o.x && x <= o.width + o.x
        var yIn = y >= o.y && y <= o.y + o.height
        return xIn && yIn
    }
    return o
}
