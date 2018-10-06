function CanvasDemo2() {
    this.vx = 2 - Math.random() * 4;
    this.vy = 0;
    this.g = 0.5;
    this.startPosition = { x: 0, y: 0,g: 0.5 };
    this.endPosotion = { x: 0, y: 0, g: 0.5 };
    this.isDown = false;
    this.position = [];
    this.init();
}

CanvasDemo2.prototype = {
    init() {
        this.canvas = document.querySelector('.demo1');
        this.canvas.style.background = "#000000"
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d');
        this.context.strokeStyle = '#ccc';
        this.context.lineWidth = 3;
        this.canvas.addEventListener('mousedown', (e) => { this.startDraw(e); });
        this.canvas.addEventListener('mousemove', (e) => { this.getPosition(e); });
        this.canvas.addEventListener('mouseup', (e) => { this.stopDraw(e); });
    },
    startDraw(e) {
        this.context.beginPath();
        this.context.moveTo(e.clientX, e.clientY);
        this.startPosition = {x: e.clientX, y: e.clientY};
        let curr = { x: e.clientX, y: e.clientY, vy: 0.5 };
        this.position.push(curr);
        this.isDown = true;
    },
    getPosition(e) {
        if (!this.isDown) return;
        this.context.lineTo(e.clientX, e.clientY);
        this.context.stroke();
        setTimeout(()=>{
            let curr = {x: e.clientX, y: e.clientY, vy: 0.5};
            this.position.push(curr);
        }, 500)
    },
    stopDraw(e) {
        this.isDown = false;
        this.endPosotion = { x: e.clientX, y: e.clientY };
        setTimeout(() => { this.dropLine(this.position); }, 500);
        this.position = [];
    },
    dropLine(position) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let positionXY = this.getCurrentPosition(position);
        positionXY.forEach((element, index) => {
            if (index === 0) {
                this.context.beginPath();
                this.context.moveTo(element.x, element.y);
            } else {
                this.context.lineTo(element.x, element.y);
            }

        })
        this.context.stroke();
        if (this.startPosition.y < this.canvas.height || this.endPosotion.y < this.canvas.height) {
            requestAnimationFrame(() => { this.dropLine(positionXY) });
        } else {
            this.vy = 0;
            this.position = [];
        }
    },
    getCurrentPosition(position) {
        let map = position.map(element => {
            return {
                x: element.x + this.vx,
                y: element.y + element.vy,
                vy: element.vy + this.g
            }
        });
        
        this.startPosition.y += this.vy;
        this.endPosotion.y += this.vy;
        this.vy += this.g;
        return map;

    }
}
let demo2 = new CanvasDemo2();