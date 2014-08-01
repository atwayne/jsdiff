var dmp = new diff_match_patch();
var leftEditor = $('.left.editor');
var rightEditor = $('.right.editor');

var leftRender = $('.main.render');

function diff() {
    var left = leftEditor.val();
    var right = rightEditor.val();
    dmp.Diff_Timeout = 1;
    dmp.Diff_EditCost = 4;

    var leftResult = dmp.diff_main(left, right);
    var rightResult = dmp.diff_main(right, left);
    dmp.diff_cleanupSemantic(leftResult);
    dmp.diff_cleanupSemantic(rightResult);

    var leftHtml = dmp.diff_prettyHtml(leftResult).replace(/&para;/g, '');
    //var rightHtml = dmp.diff_prettyHtml(rightResult).replace(/&para;/g, '');

    leftRender.html(leftHtml);
    //rightRender.html(rightHtml);

}

leftEditor.change(function () { diff(); });
rightEditor.change(function () { diff(); });

$('#leftOnly').click(function () {
    $('ins').hide();
    $('del').show();
});

$('#rightOnly').click(function () {
    $('ins').show();
    $('del').hide();
});

$('#showBoth').click(function () {
    $('ins').show();
    $('del').show();
});

$('#toggleEditor').click(function () {
    $('div.row div.editor').toggle();
    $('#toggleEditor span').toggle();

    var editorIsHidden = $('div.row div.editor').is(':hidden');
    if (editorIsHidden) {
        $('div.row .col-sm-4.main').removeClass('col-sm-4').addClass('col-sm-12');
    }
    else {
        $('div.row .col-sm-12.main').removeClass('col-sm-12').addClass('col-sm-4');
    }
});

$('.linked').scroll(function () {
    $('.linked').scrollTop($(this).scrollTop());
    $('.linked').scrollLeft($(this).scrollLeft());
});

$('#leftToXml').click(function () {
    var prettyXml = vkbeautify.xml(leftEditor.val());
    leftEditor.val(prettyXml);
    diff();
});

$('#rightToXml').click(function () {
    var prettyXml = vkbeautify.xml(rightEditor.val());
    rightEditor.val(prettyXml);
    diff();
});

diff();