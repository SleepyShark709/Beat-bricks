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
    // 这个地方是给下拉框增加了一个选择关卡的功能
    let select = document.querySelector('#id-select-level')
    for (let i = 0; i < levels.length; i++) {
        select.options.add(new Option(`第${i + 1}关`, `${i + 1}`))
    }
    var images = {
        ball: 'image/ball.png',
        block: 'image/block.png',
        paddle: 'image/paddle.png',
        background: 'image/打砖块背景.png',

    }

    var game = new Game(30, images, function(g) {
        var s = new SceneTitle(g)
        g.runWithScene(s)
    })


}
__main()
