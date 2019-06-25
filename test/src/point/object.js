
var cart = {
    _wheels: 4,
    get _wheels () {
        console.log('get');
        return this._wheels;
    },

    set _wheels (value) {
        console.log('set');
        if (value < this._wheels) {
            throw new Error('数值调小了');
        } else {}
    }
};
console.log('heheda');
cart._wheels = 1;


/*class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    // Getter
    get area() {
        return this.calcArea();
    }
    // Method
    calcArea() {
        return this.height * this.width;
    }
}
console.log(' 15 * 15:', new Rectangle(15, 15).calcArea());*/


/*const cat = {
    say() {
        console.log('0000');
    },
    jump() {
        console.log('jump');
    }
};

const tiger = Object.create(cat, {
    say: {
        value: () => {
            console.log('tiger');
        }
    }
})

const anotherCat = Object.create(cat);
anotherCat.say();

const anotherTiger = Object.create(tiger);
anotherTiger.say();*/
