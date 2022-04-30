/// <reference path="./typings/globals/jquery/index.d.ts" />

const header = $("h1");
console.log(header);

$("h1").css("color", "red");
$("button").on("click", function () {
  $("h1").slideUp().slideDown().animate({ opacity: 0.5 });
});

$(button).css();
