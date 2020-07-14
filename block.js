const Block = function(game, position) {
    let p = position
    let img = game.imageByName('block')
    // p 的格式是 [0, 0] 代表关卡中 block 的坐标
    console.log('p is ', p)
    var o = {
        x: p[0] ,
        y: p[1],
        alive: true,
        lifes: p[2] || 1,
    }
    o.image = img.image
    o.w = img.width
    o.h = img.height
    o.kill = () => {
        o.lifes--
        if (o.lifes === 0) {
            o.alive = false
        }
    }
    o.pengzhuang = (ball) => {
        return o.alive && (reactIntersects(o, ball) || reactIntersects(ball ,o))
    }
    return o
}
