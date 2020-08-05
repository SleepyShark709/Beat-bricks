const BackGround = (game) => {
    let o = game.imageByName('background')
    o.x = 0
    o.y = 0
    return o

}
const Scene = (game) => {
    var s = {
        game: game,
    }
    // 初始化
    var paddle = Paddle(game)
    var ball = Ball(game)
    let select = document.querySelector('#id-select-level')
    let index = select.selectedIndex
    var Blocks = loadLevel(game, select.options[index].value)
    var background = BackGround(game)
    log('选择的关卡', select.options[index].value)
    log('在main的scene中的Blocks', Blocks)
    // 下面是通过点击添加砖块按钮给画布上生成一个砖块 默认位置是[0, 0]
    let addButton = document.querySelector("#id-button-add")
    addButton.addEventListener('click', () => {
        let b = Block(game, [0, 0])
        Blocks.push(b)
    })
    var score = 0
    var pause = false
    //当前关卡
    var nowLevel = 1
    game.registerAction('a', function() {
        paddle.moveLeft()
    })

    game.registerAction('d', function() {
        paddle.moveRight()
    })

    game.registerAction('f', function() {
        ball.fire()
    })
    //暂停的功能
    window.addEventListener('keydown', (event) => {
        let k = event.key
        if (k === 'p') {
            pause = !pause
        } else if ('123456789'.includes(k)) {
            Blocks = loadLevel(game, k)
        }
    })
    // 下面是拖拽小球的功能
    var enableDrag = false
    game.canvas.addEventListener('mousedown', (event) => {
        var x = event.offsetX
        var y = event.offsetY
        if (ball.hasPonit(x, y)) {
            // 设置拖拽状态
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', (event) => {
        var x = event.offsetX
        var y = event.offsetY
        if (enableDrag) {
            // 设置拖拽状态
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', (event) => {
        var x = event.offsetX
        var y = event.offsetY
        if (ball.hasPonit(x, y)) {
            // 设置拖拽状态
            enableDrag = false
        }
    })
    // 下面是拖拽砖块的功能
    var enableBlock = false
    let editorButton = document.querySelector("#id-button-editor")
    let editorDiv = document.querySelector('#id-div-editor')
    editorButton.addEventListener('click', () => {
        if (enableBlock === false) {
            enableBlock = true
            editorDiv.innerHTML = '当前编辑状态：开启'
        } else if (enableBlock === true) {
            enableBlock = false
            editorDiv.innerHTML = '当前编辑状态：关闭'
        }
    })
    game.canvas.addEventListener('mousedown', (event) => {
        var x = event.offsetX
        var y = event.offsetY
        for (let i = 0; i < Blocks.length; i++) {
            let b = Blocks[i]
            if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) {
                b.blockDrag = true
            }
        }
    })
    game.canvas.addEventListener('mousemove', (event) => {
        var x = event.offsetX
        var y = event.offsetY
        for (let i = 0; i < Blocks.length; i++) {
            let b = Blocks[i]
            if (b.blockDrag === true && enableBlock === true) {
                b.x = x
                b.y = y
            }
        }
    })
    game.canvas.addEventListener('mouseup', (event) => {
        var x = event.offsetX
        var y = event.offsetY
        for (let i = 0; i < Blocks.length; i++) {
            let b = Blocks[i]
            if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) {
                b.blockDrag = false
            }
        }
    })
    // 下面是删除砖块的功能
    var DelBlock = false
    let delButton = document.querySelector("#id-button-del")
    let delDiv = document.querySelector("#id-div-del")
    delButton.addEventListener('click', () => {
        if (DelBlock === false) {
            DelBlock = true
            delDiv.innerHTML = '当前删除状态：开启'
        } else {
            DelBlock = false
            delDiv.innerHTML = '当前删除状态：关闭'
        }
    })
    game.canvas.addEventListener('click', (event) => {
        var x = event.offsetX
        var y = event.offsetY
        for (let i = 0; i < Blocks.length; i++) {
            let b = Blocks[i]
            if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h && DelBlock === true) {
                log('当前砖块是', b)
                log('Blocks is', Blocks)
                Blocks.splice(i, 1)
            }
        }
    })
    s.draw = () => {
        // 画背景
        game.context.fillStyle = "brown"
        game.context.fillRect(0, 0, 400, 300)
        game.drawImage(background)
        game.drawImage(paddle)
        game.drawImage(ball)
        for (let i = 0; i < Blocks.length; i++) {
            let block = Blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        game.context.font = '18px serif'
        game.context.fillStyle = 'white'
        game.context.fillText('分数' + score, 10, 280)
    }
    s.update = () => {
        if (pause) {
            return
        }
        ball.move()
        //判断游戏结束
        if (ball.y > paddle.y) {
            // 跳转到游戏结束的场景
            var end = new SceneEnd(game)
            game.replaceScene(end)
            return
        }
        // 判断板子相撞
        if (paddle.pengzhuang(ball)) {
            ball.speedY = - ball.speedY
        }
        // 判断block相撞
        for (let i = 0; i < Blocks.length; i++) {
            let block = Blocks[i]
            if (block.pengzhuang(ball)) {
                console.log('沙雕blcok')
                block.kill()
                score += 100
                ball.speedY = - ball.speedY
            }
        }
        //当前关卡结束后进入下一关
        var s = 0
        for (let i = 0; i < Blocks.length; i++) {
            let block = Blocks[i]
            if (block.alive === false) {
                s += 1
            }
        }
        if (s === Blocks.length) {
            //三个砖块的alive全是false 才能执行下段的代码
            if (nowLevel === Number(3)) {
                nowLevel = Number(0)
            }
            nowLevel = nowLevel + 1
            Blocks = loadLevel(game, nowLevel)
        }
    }
    return s
}