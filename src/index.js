// 使用ES6的语法导入jquery
import $ from "jquery";

// 导入css
import '@/css/index.css'

// 实现文字点击变色
$(document).ready(function () {
    $("h1").click(function () {
        $(this).css("color", "red");
    });
});

function fn (target) {
    target.info = '装饰器'
}
@fn
class Person {}
console.log(Person.info);
conole.log(1);