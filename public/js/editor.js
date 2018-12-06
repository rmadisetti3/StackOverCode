
const editor = {
    currentEditor: null,
    create: (container, language) => {
        editor.destroy(container);

        let id = `${language}_editor_area`;
        let textArea = $("<textarea></textarea>");
        textArea.attr("id", id);
        container.append(textArea);

        editor.currentEditor = CodeMirror.fromTextArea(document.getElementById(id), {
            mode:  language.toLowerCase(),
            theme: "darcula",
            lineNumbers: true
        });

        $(".CodeMirror").css("height", "95vh");
    },
    destroy: (container) => {
        $(container).empty();
    },
    getQuestion: () => {
        editor.currentEditor.doc.eachLine( (line) => { 
            // do something for each line
        });
    },
    listeners: () => {
        $(".custom-select").find('select').
    }
}

// editor.create($("#editor"), "javascript"); 