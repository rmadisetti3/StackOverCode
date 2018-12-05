
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
            theme: "default",
            lineNumbers: true
        });

        $(".CodeMirror").css("height", "95vh");
    },
    destroy: () => {
        $(container).empty();
    },
    getQuestion: () => {
        editor.currentEditor.doc.eachLine( (line) => {console.log(line.text)});
    }
}

// editor.create($("#editor"), "javascript"); 