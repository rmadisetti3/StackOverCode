
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

const editor = {
    currentEditor: null,
    create: (container, language) => {
        editor.destroy(container);

        let id = `${language}_editor_area`;
        let textArea = $("<textarea></textarea>");
        textArea.attr("id", id);
        container.append(textArea);

        editor.currentEditor = CodeMirror.fromTextArea (
            document.getElementById(id), 
            {
                mode:  language.toLowerCase(),
                theme: "darcula",
                lineNumbers: true
            }
        );

        $(".CodeMirror").css("height", "auto");
    },
    destroy: (container) => {
        $(container).empty();
    },
    hasAQuestion: (line) => {
        if(line.includes("//? ")) {
            let split = line.split("//? ");
            if(split.length > 1) {
                console.log(split.filter(e => e !== ""));
            }
        };
    },
    scanForQuestions: () => {
        let questions = [];
        editor.currentEditor.doc.eachLine( (line) => { 
            editor.hasAQuestion(line.text);
        });
    },
    listeners: {
        selectEditorLanguage:   () => {
            $(".select-items").children().click( () => { 
                editor.create($("#editor"), 
                $(".same-as-selected")[0].textContent);
            })
        }    
    },
    init: () => {
        editor.listeners.selectEditorLanguage();
    }
}

editor.init();