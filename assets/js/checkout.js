loadPage();

function loadPage() {
    const check = document.querySelector('.check');
    const total_count = document.querySelector('.total_count');
    const catolog_content = document.querySelector('body');

    showCheck(check);
    countGoods(total_count);

    window.addEventListener('load', hidePreloader);
    catolog_content.addEventListener('click', getGroup);
}


function showCheck(place){
    let out = '';

    for (let key in cart){
        out += '<div class="check_elem">';
        out += '<span class="check_count">' + cart[key] + 'x</span>';
        out += '<span class="check_name">'+ data[key].name + '</span>';
        out += '<span class="check_sum">' + parseInt(data[key].price, 10) * cart[key] + 'с</span>';
        out += '</div>';
    }
    out += '<div class="total_list"><span>К оплате</span>'
    out += '<span class="total_value">' + sessionStorage.getItem('total_value') + 'с</span></div>';
    place.innerHTML = out;
}