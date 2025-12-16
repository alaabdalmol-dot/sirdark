document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('form');
    var foodSelect = document.getElementById('food');
    var drinkSelect = document.getElementById('drink');
    var toppings = document.querySelectorAll('#toppings input[type="checkbox"]');
    var totalEl = document.getElementById('total');
    var timeInput = document.getElementById('time');
    var nameInput = document.getElementById('name');
    var phoneInput = document.getElementById('phone');
    var addressInput = document.getElementById('address');

    // عنصر رسالة النجاح في وسط الشاشة
    var successMessage = document.createElement('div');
    successMessage.id = 'successMessage';
    successMessage.style.position = 'fixed';
    successMessage.style.top = '50%';
    successMessage.style.left = '50%';
    successMessage.style.transform = 'translate(-50%, -50%)';
    successMessage.style.background = 'rgba(0, 128, 0, 0.9)';
    successMessage.style.color = '#fff';
    successMessage.style.padding = '20px 40px';
    successMessage.style.borderRadius = '10px';
    successMessage.style.fontSize = '18px';
    successMessage.style.fontWeight = 'bold';
    successMessage.style.textAlign = 'center';
    successMessage.style.display = 'none'; // مخفية بالبداية
    successMessage.style.zIndex = '9999';
    document.body.appendChild(successMessage);

    function calculateTotal() {
        var total = 0;
        var foodPrice = parseFloat(foodSelect.selectedOptions[0] ? foodSelect.selectedOptions[0].dataset.price : 0);
        var drinkPrice = parseFloat(drinkSelect.selectedOptions[0] ? drinkSelect.selectedOptions[0].dataset.price : 0);
        var toppingsPrice = 0;
        for(var i=0; i<toppings.length; i++) {
            if(toppings[i].checked) {
                toppingsPrice += parseFloat(toppings[i].dataset.price);
            }
        }
        total = foodPrice + drinkPrice + toppingsPrice;
        totalEl.textContent = 'السعر الاجمالي: ' + total.toFixed(2) + '$';

        switch(foodSelect.value) {
            case 'بيتزا': form.style.background = '#ffe5e5'; break;
            case 'برغر': form.style.background = '#fff0b3'; break;
            case 'سلطة': form.style.background = '#e5ffe5'; break;
            default: form.style.background = '#fff';
        }
    }

    foodSelect.addEventListener('change', calculateTotal);
    drinkSelect.addEventListener('change', calculateTotal);
    for(var i=0; i<toppings.length; i++) {
        toppings[i].addEventListener('change', calculateTotal);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var time = timeInput.value;
        if(!time) {
            alert('الرجاء تحديد وقت الاستلام');
            return;
        }
        var hour = parseInt(time.split(':')[0]);
        if(hour < 10 || hour > 22) {
            alert('الرجاء اختيار وقت بين 10:00 و 22:00');
            return;
        }

        var name = nameInput.value;
        var phone = phoneInput.value;
        var address = addressInput.value;
        var selectedToppings = [];
        for(var i=0; i<toppings.length; i++) {
            if(toppings[i].checked) selectedToppings.push(toppings[i].value);
        }
        var toppingsText = selectedToppings.length > 0 ? selectedToppings.join(', ') : 'لا يوجد';

        var summary = 'الاسم: ' + name + '\n' +
                      'الهاتف: ' + phone + '\n' +
                      'العنوان: ' + address + '\n' +
                      'الطعام: ' + foodSelect.value + '\n' +
                      'الاضافات: ' + toppingsText + '\n' +
                      'المشروب: ' + drinkSelect.value + '\n' +
                      'الوقت: ' + time + '\n' +
                      totalEl.textContent;

        alert(summary);

        // اظهار رسالة النجاح في وسط الشاشة
        successMessage.textContent = 'تم الإرسال بنجاح!';
        successMessage.style.display = 'block';

        // تختفي الرسالة بعد 3 ثواني
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 3000);
    });
});



const menuList = document.querySelector(".menu-list");
const interval = 3000;

setInterval(() => {
  const items = [...menuList.children];
  if (items.length < 2) return;

  // اختيار عنصرين عشوائياً
  const i = Math.floor(Math.random() * items.length);
  let j = Math.floor(Math.random() * items.length);
  while (j === i) {
    j = Math.floor(Math.random() * items.length);
  }

  const itemA = items[i];
  const itemB = items[j];

  // تأثير خروج
  itemA.classList.add("swap-out");
  itemB.classList.add("swap-out");

  setTimeout(() => {
    // تبديل فعلي
    const nextA = itemA.nextSibling === itemB ? itemA : itemA.nextSibling;
    menuList.insertBefore(itemB, itemA);
    menuList.insertBefore(itemA, nextA);

    // تأثير دخول
    itemA.classList.remove("swap-out");
    itemB.classList.remove("swap-out");
    itemA.classList.add("swap-in");
    itemB.classList.add("swap-in");

    setTimeout(() => {
      itemA.classList.remove("swap-in");
      itemB.classList.remove("swap-in");
    }, 50);

  }, 500);

}, interval);
