const game1 = function(fps, images, runCallback) {
    // images 是一个对象，里面是图片的名字，程序会在所有图片载入成功之后才会运行 和 引用路径
    var g = {
        scene: null,
        actions: {},
        keydowns: {},
        images: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    g.drawImage = function(Img) {
        g.context.drawImage(Img.image, Img.x, Img.y)
    }
    //event
    window.addEventListener('keydown', (event) => {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', (event) => {
        g.keydowns[event.key] = false
    })
    // update
    g.update = () => {
        g.scene.update()
    }
    g.draw = () => {
        g.scene.draw()
    }

    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    window.fps = fps
    const runLoop = () => {
        //update input
        var actions = Object.keys(g.actions)
        for (let i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]){
                g.actions[key]()
            }
        }
        //update
        // g.update() && g.update()
        g.update()
        //clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        //draw
        g.draw()
        setTimeout(() => {
            runLoop()
        }, 1000 / window.fps)
    }
    var loads = []
    var names = Object.keys(images)
    for (let i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            //存入g.images中
            log('img is', img)
            g.images[name] = img
            console.log('load game', g.images)

            // 所有图片都载入成功之后调用run
            loads.push(1)
            log('load images', loads.length, names.length)
            log('name is', name)
            console.log('load game', g.images[name])

            if (loads.length === names.length) {
                g.__start()
            }
        }
    }
    g.imageByName = (name) => {
        log('name is', name)
        log('g.images', g.images[name])
        var img = g.images[name]
        var image = {
            width: img.width,
            height: img.height,
            image: img,
        }
        return image
    }
    g.runWithScene = (scene) => {
        g.scene = scene
        setTimeout(() => {
            runLoop()
        }, 1000 / window.fps)
    }
    g.__start = function() {
        runCallback(g)
        //timer

    }
    return g
}
