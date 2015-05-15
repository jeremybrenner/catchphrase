// on page load
$(function() {
    Phrase.all();
    Page.init();
});


function Page() {};
Page.init = function() {
    $("#phrase-form").on("submit", function(e) {
        e.preventDefault();
        var phraseParams = $(this).serialize();
        Phrase.create(phraseParams);
    });
}

Page.render = function(items, parentId, templateId) {
    var template = _.template($("#" + templateId).html());
    $("#" + parentId).html(template({
        collection: items
    }));
};

function Phrase() {};
Phrase.all = function() {
    $.get("/phrases", function(res) {
        var phrases = JSON.parse(res);
        Page.render(phrases, "phrase-ul", "phrases-template");
    });
}
Phrase.create = function(phraseParams) {
    $.post("/phrases", phraseParams).done(function(res) {
        Phrase.all();
    }).done(function(res) {
        $("#phrase-form")[0].reset();
    });
}
Phrase.delete = function(phrases) {
    var phraseId = $(phrases).data().id;
    $.ajax({
        url: '/phrases/' + phraseId,
        type: 'DELETE',
        success: function(res) {
            Phrase.all();
        }
    })
};