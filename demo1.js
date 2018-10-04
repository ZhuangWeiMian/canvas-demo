const GRAVITY = 2; // 重力加速度
// 颜色种类
const COLORARR = ['#b63116', '#e7ae00', '#c50083', '#b1ee7a', '#d200e5', '#ece96f', '#b8fb00', '#8ce1ed', '#5468f8', '#3c0591'];
const colorLength = COLORARR.length; // 颜色种类大小
const LINEWIDTH = 4; // 数字时钟的线条粗细
const SPACING = 30; // 两个数字之间的间距
const LINELENGTH = 20; // 数字一根一根棍子的长度
const LINESPACE = 1; // 两跟棍子之间的间距
const STARTX = 10; // 起始x坐标
const STARTY = 10; // 起始y坐标

const NUMBERS = {
    '0': [1, 1, 1, 1, 1, 1, 0,],
    '1': [0, 1, 1, 0, 0, 0, 0],
    '2': [1, 1, 0, 1, 1, 0, 1],
    '3': [1, 1, 1, 1, 0, 0, 1],
    '4': [0, 1, 1, 0, 0, 1, 1],
    '5': [1, 0, 1, 1, 0, 1, 1],
    '6': [1, 0, 1, 1, 1, 1, 1],
    '7': [1, 1, 1, 0, 0, 0, 0],
    '8': [1, 1, 1, 1, 1, 1, 1],
    '9': [1, 1, 1, 1, 0, 1, 1]
}
// 8字初始状态
const map = [
    [{ x: STARTX, y: STARTY }, { x: STARTX + LINELENGTH, y: STARTY }],
    [{ x: STARTX + LINELENGTH + LINESPACE, y: STARTY + LINESPACE }, { x: STARTX + LINELENGTH + LINESPACE, y: STARTY + LINESPACE + LINELENGTH }],
    [{ x: STARTX + LINELENGTH + LINESPACE, y: STARTY + 3 * LINESPACE + LINELENGTH }, { x: STARTX + LINELENGTH + LINESPACE, y: STARTY + 3 * LINESPACE + 2 * LINELENGTH }],
    [{ x: STARTX + LINELENGTH, y: STARTY + 4 * LINESPACE + 2 * LINELENGTH }, { x: STARTX, y: STARTY + 4 * LINESPACE + 2 * LINELENGTH }],
    [{ x: STARTX - LINESPACE, y: STARTY + 3 * LINESPACE + 2 * LINELENGTH }, { x: STARTX - LINESPACE, y: STARTY + 3 * LINESPACE + LINELENGTH }],
    [{ x: STARTX - LINESPACE, y: STARTY + LINESPACE + LINELENGTH }, { x: STARTX - LINESPACE, y: STARTX + LINESPACE }],
    [{ x: STARTX, y: STARTX + 2 * LINESPACE + LINELENGTH }, { x: STARTX + LINELENGTH, y: STARTX + 2 * LINESPACE + LINELENGTH }]
];
// 构造函数
function CanvasDemo1() {
    // 获取画布
    this.el = document.querySelector('.demo1');
    this.context = this.el.getContext('2d');
    this.context.lineWidth = LINEWIDTH;
    this.showTime = '';
    this.prevTime = '';
    this.currState = [];
    this.update(1000);
}
CanvasDemo1.prototype = {
    render: function () {
        // this.context.clearRect(0, 0, this.context.width, this.context.height)
        for (let j = 0; j < this.showTime.length; j++) {
            let nums = this.showTime[j];
            let prev = this.prevTime[j];
            if (!this.prevTime || this.prevTime[j] !== this.showTime[j]) {
                if (nums === ':') {
                    this.drawColon((j + 2 / 3) * SPACING, LINELENGTH + STARTY);
                } else {
                    this.drawNumber(NUMBERS[nums], NUMBERS[prev], j * SPACING, 20, COLORARR[nums]);
                    this.dropNumber(prev, NUMBERS[prev], j * SPACING, 20, COLORARR[prev]);
                }
            }
        }
        if (!this.prevTime) { this.prevTime = this.showTime; }
        else {
            this.drop(this.currState);
        }

    },
    renderDraw: function () {
        for (let j = 0; j < this.showTime.length; j++) {
            let nums = this.showTime[j];
            let prev = this.prevTime[j];
            // if (!this.prevTime || this.prevTime[j] !== this.showTime[j]) {

            if (nums === ':') {
                this.drawColon((j + 2 / 3) * SPACING, LINELENGTH + STARTY);
            } else {
                this.drawNumber(NUMBERS[nums], NUMBERS[prev], j * SPACING, LINELENGTH, COLORARR[nums]);
                // dropNumber(NUMBERS[nums], NUMBERS[prev], j * SPACING, 20);

            }
            // }

        }
    },
    update: function (delay) {
        let updateTime = () => {
            let curr = new Date();
            let hour = curr.getHours().toString().length === 2 ? curr.getHours() : '0' + curr.getHours();
            let minute = curr.getMinutes().toString().length === 2 ? curr.getMinutes() : '0' + curr.getMinutes();
            let second = curr.getSeconds().toString().length === 2 ? curr.getSeconds() : '0' + curr.getSeconds();
            this.showTime = hour + ':' + minute + ':' + second;
            this.render();
            setTimeout(() => {
                this.prevTime = this.showTime;
                this.currState = [];
                updateTime();
            }, delay);
        }
        // return (function updateTime() {

        // })();
        return updateTime();
    },
    drawNumber: function (currNums, prevNum, sx, sy, color) {
        for (let i = 0; i < currNums.length; i++) {
            if (currNums[i] === 1) {
                this.context.beginPath();
                this.context.strokeStyle = '#ccc';
                this.context.strokeStyle = color;
                this.context.moveTo(map[i][0]["x"] + sx, map[i][0]["y"]);
                this.context.lineTo(map[i][1]["x"] + sx, map[i][1]["y"]);
                this.context.stroke();
            } else {
                this.context.beginPath();
                // console.log(map[i]+ currNums[i])
                this.context.strokeStyle = '#fff';
                // this.context.strokeStyle = COLORARR[Math.floor(Math.random() * colorLength)];
                this.context.moveTo(map[i][0]["x"] + sx, map[i][0]["y"]);
                this.context.lineTo(map[i][1]["x"] + sx, map[i][1]["y"]);
                this.context.stroke();
            }
        }
    },
    // 画冒号
    drawColon: function (centerX, centerY) {
        // console.log(centerY)
        this.context.beginPath();
        this.context.arc(centerX, centerY, 3, 0, Math.PI * 2);
        this.context.fill();
        this.context.beginPath();
        this.context.arc(centerX, centerY + 20, 3, 0, Math.PI * 2);
        this.context.fill();
    },
    dropNumber: function (prev, prevNum, sx, sy, color) {
        // console.log(prevNum)
        if (!prevNum) { return; }
        // let this.currState = [];
        for (let i = 0; i < prevNum.length; i++) {
            if (prevNum[i] === 1) {
                let vx = 2 - Math.random() * 4;
                let target = {
                    endX: map[i][1]["x"] + sx,
                    endY: map[i][1]["y"],
                    startX: map[i][0]["x"] + sx,
                    startY: map[i][0]["y"],
                    vx: vx, vy: 0, g: GRAVITY, f: 0.78,
                    color: COLORARR[prev]
                };
                this.currState.push(target);
                this.context.beginPath();
                this.context.strokeStyle = color;
                this.context.moveTo(map[i][0]["x"] + sx, map[i][0]["y"]);
                this.context.lineTo(map[i][1]["x"] + sx, map[i][1]["y"]);
                this.context.stroke();
            }
        }

    },
    drop: function (currState) {
        let dropRender = () => {
            this.context.clearRect(0, 0, this.el.width, this.el.height);
            this.renderDraw();
            for (let i = 0; i < currState.length; i++) {
                let target = currState[i];
                target.startX += target.vx;
                target.endX += target.vx;
                if (target.endY >= this.el.height - 0.5) {
                    target.vy = -target.vy * 0.7;
                }
                target.startY += target.vy;
                target.endY += target.vy
                target.vy += target.g - target.f;
                if (Math.abs(target.vy) < 0.1 && target.endY >= this.el.height) { continue; }
                this.renderDrop(target, target.color);
            }

            requestAnimationFrame(dropRender);
        }
        return dropRender();
    },
    renderDrop: function (target, color) {
        this.context.beginPath();
        this.context.moveTo(target.startX, target.startY);
        this.context.lineTo(target.endX, target.endY);
        // this.context.lineTo(target.x + LINELENGTH / 2, target.y);
        this.context.strokeStyle = color;
        this.context.stroke();

    }
}

let a = new CanvasDemo1();
// a.update(1000)();

