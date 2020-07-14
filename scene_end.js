const SceneEnd = (game) => {
    var g = game
    var s = {
        game: game,
    }
    // 初始化
    s.draw = () => {
        // 画背景
        game.context.fillText('游戏结束', 150, 200)
    }
    g.replaceScene = (scene) => {
        g.scene = scene
    }
    window.addEventListener('keydown', (event) => {
        let self = event.key
        if (event.key === 'r') {
            var s = Scene(game)
            g.scene = s
        }
    })
    s.update = () => {

    }
    return s
}