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

        editor.listeners.onCursorActivity(editor.currentEditor);
    },
    destroy: (container) => {
        $(container).empty();
    },
    hasAQuestion: (line) => {
        if(line.includes("//? ")) {
            return line.substring(line.indexOf("//? "), line.length).length > 4;
        };
    },
    scanForQuestions: () => {
        let questions = [];
        editor.currentEditor.doc.eachLine( (line) => { 
            if(editor.hasAQuestion(line.text)) {
                questions.push(line.text.replaceAll("//? ", ""));
            }
        });
        return questions;
    },
    listeners: {
        selectEditorLanguage:   () => {
            $(".select-items").children().click( () => { 
                editor.create($("#editor"), 
                $(".same-as-selected")[0].textContent);
            })
        },
        addReplaceAllFunc: () => {
            String.prototype.replaceAll = function(search, replacement) {
                var target = this;
                return target.split(search).join(replacement);
            };
        },
        onCursorActivity: (_currentEditor) => {
            _currentEditor.on('cursorActivity', () => {
                let questions = editor.scanForQuestions();
                if(questions.length > 0) {
                    $("#content").empty();
                    getResults(questions[0]);
                }
            });
        }    
    },
    init: () => {
        editor.listeners.selectEditorLanguage();
        editor.listeners.addReplaceAllFunc();
    }
}

editor.init();