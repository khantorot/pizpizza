loadPage();

function loadPage() {
    const cart_list = document.querySelector('.cart_list');
    const discount_list = document.querySelector('.product_container');
    const help_block = document.querySelector('.help_block');
    const total_block = document.querySelector('.total_block');
    const total_count = document.querySelector('.total_count');
    const catolog_content = document.querySelector('body');

    if (Object.keys(cart).length == 0) {
        help_block.style.display = 'block';
        total_block.style.display = 'none';
        sessionStorage.setItem('total_value', JSON.stringify(0));
    } else {
        loadTotal(help_block, total_block);
    }

    loadGoods(cart_list, cart, 'cart');
    loadGoods(discount_list, data, 'discount');
    countGoods(total_count);

    cart_list.addEventListener('click', tuneCart);
    discount_list.addEventListener('click', tuneCart);
    catolog_content.addEventListener('click', getGroup);

    window.addEventListener('load', hidePreloader);
}

function loadTotal(help_block, total_block) {
    const discount = document.querySelector('.total_discount');
    const sum = document.querySelector('.total_sum');
    const discount_mass = [];
    const sum_mass = [];
    let discount_value = 0;
    let sum_value = 0;


    for (let key in cart) {
        if (data[key].discount != 'false')
            discount_mass.push((parseInt(data[key].discount, 10) - parseInt(data[key].price, 10)) * cart[key]);
        sum_mass.push(parseInt(data[key].price, 10) * cart[key]);
    }

    if (sum_mass.length != 0) {
        sum_value = sumOfMass(sum_mass);
        discount_value = sumOfMass(discount_mass);

        discount.innerHTML = discount_value + sum_value + 'c';
        sum.innerHTML = sum_value + 'c';

        help_block.style.display = 'none';
        total_block.style.display = 'flex';
        sessionStorage.setItem('total_value', JSON.stringify(sum_value));
    }
}