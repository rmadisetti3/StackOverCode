
const editor = {
    currentEditor: null,
    create: function(container, language) {
        editor.destroy(container);

        let id = `${language}_editor_area`;
        let textArea = $("<textarea></textarea>");
        textArea.attr("id", id);
        container.append(textArea);

        editor.currentEditor = CodeMirror.fromTextArea(document.getElementById(id), {
            mode:  language.toLowerCase(),
            theme: "default",
            lineNumbers: true
        });

        $(".CodeMirror").css("height", "95vh");
    },
    destroy: function (container) {
        $(container).empty();
    }
}

// editor.create($("#editor"), "javascript"); 