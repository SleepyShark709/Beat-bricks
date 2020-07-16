const Scene = (game) => {
    var s = {
        game: game,
    }
    // 初始化
    var paddle = Paddle(game)
    var ball = Ball(game)
    var Blocks = loadLevel(game, 1)
    var score = 0
    var pause = false
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
    s.draw = () => {
        // 画背景
        game.context.fillStyle = "brown"
        game.context.fillRect(0, 0, 400, 300)
        game.drawImage(paddle)
        game.drawImage(ball)
        for (let i = 0; i < Blocks.length; i++) {
            let block = Blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        game.context.fillstyle = '#000000'
        game.context.fillText('分数' + score, 10, 200)
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
    }
    return s
}