$(".put").on('click', (e) => {
    e.preventDefault();
    let putButton = $(e.currentTarget);
    let putButtonSvg = putButton.children("svg");
    let form = putButton.parent().parent();
    let methodInput = form.children(".blog-header").children(".method-input");
    if(putButtonSvg.hasClass("enabled-put")) {
        methodInput.attr("value", "PUT");
        form.submit();
    } else {
        putButtonSvg.addClass("enabled-put");
    }
    
    let content = form.children(".blog-content-input");
    let title = form.children(".blog-header").children(".title-input");
    console.log(title);
    content.prop("disabled", false);
    title.prop("disabled", false);

    putButton.attr("src", "/svgs/penOther.svg");
})
