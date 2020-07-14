const loadLevel = (game, n) => {
    // n是第几关
    n = n - 1
    let level = levels[n]
    let Blocks = []
    log('level is', level)
    for (let i = 0; i < level.length; i++) {
        let p = level[i]
        let b = Block(game, p)
        Blocks.push(b)
    }
    return Blocks
}
const __main = () => {
    // 这个地方是加了一个滑动条来控制帧率
    let input = document.querySelector('#id-input-speed')
    input.addEventListener('input', (event) => {
        let input = event.target
        window.fps = Number(input.value)
    })
    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }

    var game = game1(30, images, function(g) {
        var s = Scene(g)
        g.runWithScene(s)
    })


}
__main()
