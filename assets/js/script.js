function hidePreloader() {
    const body = document.querySelector('body');
    const preloader = document.querySelector('.preloader');

    setTimeout(function () {
        body.classList.remove('scrollable');
        preloader.classList.add('preloader_hide');
    }, 1400)
}



let cart = {};

chekCart();
function chekCart() {
    if (sessionStorage.getItem('cart') != null) {
        cart = JSON.parse(sessionStorage.getItem('cart'));
    }
}



function countGoods(block) {
    var arr = [];
    var sum;
    for (var key in cart) {
        arr.push(cart[key]);

        arraySum(arr);
        function arraySum(array) {
            sum = 0;
            for (var i = 0; i < array.length; i++) {
                sum += array[i];
            }
        }
    }
    if (sum == undefined) {
        sum = 0;
    }
    block.innerHTML = sum;
}











function tuneCart(e) {
    if (e.target.classList.contains('add_btn') || e.target.classList.contains('minus_btn') || e.target.classList.contains('del_btn')) {
        let ID = e.target.getAttribute('data-art');
        if (e.target.classList.contains('minus_btn')) {
            if (cart[ID] > 1)
                cart[ID]--;
            else
                delete cart[ID];
        }
        else if (e.target.classList.contains('add_btn')) {
            if (cart[ID] != undefined)
                cart[ID]++;
            else
                cart[ID] = 1;
        }
        else if (e.target.classList.contains('del_btn')) {
            delete cart[ID];
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        loadPage();
    }
};









function loadGoods(place, source, group) {
    let out = '';
    let path = './content/images/goods/';

    for (let key in source) {
        if (data[key].group.indexOf(group) != -1 || group == 'cart' || group == 'all') {
            out += '<div class="good_card">';
            out += '<div class="good_card_img"><img src="' + path + data[key].image + '"></div>';
            out += '<div class="good_name"> <h4>' + data[key].name + '</h4> <span>' + data[key].weight + '</span> </div>';
            out += '<div class="good_discrube"><p>' + data[key].description + '</p></div>';
            out += '<div class="good_price">';
            if (data[key].group.indexOf('discount') == 1) {
                out += '<img src="./content/icons/discount.svg" class="product_icon">';
                out += '<span class="discount">' + str(data[key].discount) + '</span>';
            }
            if (data[key].group.indexOf('popular') == 1) {
                out += '<img src="./content/icons/popular.svg" class="product_icon">';
            }
            if (data[key].group.indexOf('new') == 1) {
                out += '<img src="./content/icons/newproduct.svg" class="product_icon">';
            }
            out += '<span class="price_value">' + data[key].price + '</span>';
            if (cart[key] == undefined) {
                out += '<p>в корзину</p>';
            } else if (source == cart) {
                out += '<div class="minus_btn" data-art="' + key + '"></div>';
                out += '<span class="good_num">' + cart[key] + '</span>';
                out += '<span class="sum_of_good">' + parseInt(data[key].price, 10) * cart[key] + 'c</span>';
                out += '<div class="del_btn" data-art="' + key + '"></div>';
            } else {
                out += '<p>в корзине <span class="cart_count_value">' + cart[key] + '</span> шт';
                out += '<div class="minus_btn" data-art="' + key + '"></div>';
            }
            out += '<div class="add_btn" data-art="' + key + '"><img src="./content/icons/add_btn.svg"></div>';
            out += '</div></div>';
        }
    }

    place.innerHTML = out;
}



function str(src) {
    return (src.substring(src.lastIndexOf('/') + 1, src.length));
}




const config_banner = {
    type: 'carousel',
    autoplay: 3000,
    perView: 1
}



function sumOfMass(mass) {
    let sum = 0;
    mass.forEach(i => {
        sum += i;
    });
    return sum;
}

function getGroup(e) {
	if (e.target.classList.contains('catolog_elem')) {
		let name = e.target.getAttribute('data-name');

		sessionStorage.setItem('good_group', JSON.stringify(name));
		loadPage();
	}
}





const menu_btn = document.querySelector('.menu_btn');
const menu = document.querySelector('.menu');

const menu_list_item = document.querySelectorAll('.menu a');

const call_btn = document.querySelector('.call_btn');
const networks = document.querySelector('.networks');


menu_btn.addEventListener('click', function () {
    menu_btn.classList.toggle('menu_btn_active');
    menu.classList.toggle('menu_show');
    networks.classList.remove('networks_active');
});



document.querySelector('.container').addEventListener('click', function () {
    menu_btn.classList.remove('menu_btn_active');
    menu.classList.remove('menu_show');
    networks.classList.remove('networks_active');
})

menu_list_item.forEach(element => {
    element.addEventListener('click', function () {
        menu_btn.classList.remove('menu_btn_active');
        menu.classList.remove('menu_show');
    })
});


call_btn.addEventListener('click', function () {
    networks.classList.toggle('networks_active');
    menu_btn.classList.remove('menu_btn_active');
    menu.classList.remove('menu_show');
});




let linkNav = document.querySelectorAll('[href^="#"]'),
    V = 0.6;
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function (e) {
        e.preventDefault();
        let w = window.pageYOffset,
            hash = this.href.replace(/[^#]*(.*)/, '$1');
        t = document.querySelector(hash).getBoundingClientRect().top,
            start = null;
        requestAnimationFrame(step);

        function step(time) {
            if (start === null) start = time;
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
            window.scrollTo(0, r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash
            }
        }
    }, false);
}






let toRadians = (deg) => deg * Math.PI / 180
let map = (val, a1, a2, b1, b2) => b1 + (val - a1) * (b2 - b1) / (a2 - a1)

class Pizza {
    constructor(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')

        this.sliceCount = 6
        this.sliceSize = 80

        this.width = this.height = this.canvas.height = this.canvas.width = this.sliceSize * 2 + 50
        this.center = this.height / 2 | 0

        this.sliceDegree = 360 / this.sliceCount
        this.sliceRadians = toRadians(this.sliceDegree)
        this.progress = 0
        this.cooldown = 10

    }

    update() {
        let ctx = this.ctx
        ctx.clearRect(0, 0, this.width, this.height)

        if (--this.cooldown < 0) this.progress += this.sliceRadians * 0.01 + this.progress * 0.07

        ctx.save()
        ctx.translate(this.center, this.center)

        for (let i = this.sliceCount - 1; i > 0; i--) {

            let rad
            if (i === this.sliceCount - 1) {
                let ii = this.sliceCount - 1

                rad = this.sliceRadians * i + this.progress

                ctx.strokeStyle = '#ee7937'
                cheese(ctx, rad, .9, ii, this.sliceSize, this.sliceDegree)
                cheese(ctx, rad, .6, ii, this.sliceSize, this.sliceDegree)
                cheese(ctx, rad, .5, ii, this.sliceSize, this.sliceDegree)
                cheese(ctx, rad, .3, ii, this.sliceSize, this.sliceDegree)

            } else rad = this.sliceRadians * i

            // border
            ctx.beginPath()
            ctx.lineCap = 'butt'
            ctx.lineWidth = 11
            ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians)
            ctx.strokeStyle = '#ee7937'
            ctx.stroke()

            // slice
            let startX = this.sliceSize * Math.cos(rad)
            let startY = this.sliceSize * Math.sin(rad)
            let endX = this.sliceSize * Math.cos(rad + this.sliceRadians)
            let endY = this.sliceSize * Math.sin(rad + this.sliceRadians)
            let varriation = [0.9, 0.7, 1.1, 1.2]
            ctx.fillStyle = '#fdbe36'
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(startX, startY)
            ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians)
            ctx.lineTo(0, 0)
            ctx.closePath()
            ctx.fill()
            ctx.lineWidth = .3
            ctx.stroke()

            // meat
            let x = this.sliceSize * .65 * Math.cos(rad + this.sliceRadians / 2)
            let y = this.sliceSize * .65 * Math.sin(rad + this.sliceRadians / 2)
            ctx.beginPath()
            ctx.arc(x, y, this.sliceDegree / 6, 0, 2 * Math.PI)
            ctx.fillStyle = '#ee7937'
            ctx.fill()

        }

        ctx.restore()

        if (this.progress > this.sliceRadians) {
            ctx.translate(this.center, this.center)
            ctx.rotate(-this.sliceDegree * Math.PI / 180)
            ctx.translate(-this.center, -this.center)

            this.progress = 0
            this.cooldown = 20
        }

    }

}

function cheese(ctx, rad, multi, ii, sliceSize, sliceDegree) {
    let x1 = sliceSize * multi * Math.cos(toRadians(ii * sliceDegree) - .2)
    let y1 = sliceSize * multi * Math.sin(toRadians(ii * sliceDegree) - .2)
    let x2 = sliceSize * multi * Math.cos(rad + .2)
    let y2 = sliceSize * multi * Math.sin(rad + .2)

    let csx = sliceSize * Math.cos(rad)
    let csy = sliceSize * Math.sin(rad)

    var d = Math.sqrt((x1 - csx) * (x1 - csx) + (y1 - csy) * (y1 - csy))
    ctx.beginPath()
    ctx.lineCap = 'round'

    let percentage = map(d, 15, 70, 1.2, 0.2)

    let tx = x1 + (x2 - x1) * percentage
    let ty = y1 + (y2 - y1) * percentage
    ctx.moveTo(x1, y1)
    ctx.lineTo(tx, ty)

    tx = x2 + (x1 - x2) * percentage
    ty = y2 + (y1 - y2) * percentage
    ctx.moveTo(x2, y2)
    ctx.lineTo(tx, ty)

    ctx.lineWidth = map(d, 0, 100, 20, 2)
    ctx.stroke()
}

let pizza = new Pizza('pizza');

(function update() {
    requestAnimationFrame(update)
    pizza.update()

}())


