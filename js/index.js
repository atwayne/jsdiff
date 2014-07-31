var dmp = new diff_match_patch();
var leftEditor = $('.left.editor');
var rightEditor = $('.right.editor');

var leftRender = $('.left.render');
var rightRender = $('.right.render');

function launch() {
    var left = leftEditor.val();
    var right = rightEditor.val();
    dmp.Diff_Timeout = 1;
    dmp.Diff_EditCost = 4;

    var leftResult = dmp.diff_main(left, right);
    var rightResult = dmp.diff_main(right, left);
    dmp.diff_cleanupSemantic(leftResult);
    dmp.diff_cleanupSemantic(rightResult);

    var leftHtml = dmp.diff_prettyHtml(leftResult).replace(/&para;/g, '');
    var rightHtml = dmp.diff_prettyHtml(rightResult).replace(/&para;/g, '');

    leftRender.html(leftHtml);
    rightRender.html(rightHtml);

}

leftEditor.change(function () { launch(); });
rightEditor.change(function () { launch(); });

launch();