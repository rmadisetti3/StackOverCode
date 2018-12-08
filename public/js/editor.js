/**
 * 
 */

const _gui = {
    
}

const editor = {
    currentEditor: null,
    /**
     * 
     * @param {CodeMirror: Object} _currentEditor 
     */
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

        $(".CodeMirror").css("height", "98vh");

        editor.listeners.onCursorActivity(editor.currentEditor);
    },
    /**
     * 
     * @param {CodeMirror: Object} _currentEditor 
     */
    destroy: (container) => {
        $(container).empty();
    },
    /**
     * 
     * @param {CodeMirror: Object} _currentEditor 
     */
    hasAQuestion: (line) => {
        if(line.includes("//? ")) {
            return line.substring(line.indexOf("//? "), line.length).length > 4;
        };
    },
    /**
     * 
     * @param {CodeMirror: Object} _currentEditor 
     */
    scanForQuestions: () => {
        let questions = [];
        let question;
        editor.currentEditor.doc.eachLine( (line) => { 
            if(editor.hasAQuestion(line.text)) {
                let text = line.text;
                question = text.substring(text.indexOf("//? "), text.length);
                question = question.replaceAll("//? ", "");
                questions.push(question);
            }
        });
        return questions;
    },
    /**
     * Adding replace all function to String class
     * @param {CodeMirror: Object} _currentEditor 
     */
    addReplaceAllFunc: () => {
        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.split(search).join(replacement);
        };
    },
    listeners: {
        /**
         * 
         * @param {CodeMirror: Object} _currentEditor 
         */
        selectEditorLanguage:   () => {
            $(".select-items").children().click( () => { 
                editor.create($("#editor"), 
                $(".same-as-selected")[0].textContent);
            })
        },
        /**
         * Debounce function to delay api calls
         * @version https://github.com/johndugan/javascript-debounce
         * @author John Dugan
         * @param {Function} func 
         * @param {Milliseconds} wait 
         * @param {Boolean} immediate 
         */
        debounce: function(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                var later = function() {
                    timeout = null;
                    if ( !immediate ) {
                        func.apply(context, args);
                    }
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait || 200);
                if ( callNow ) { 
                    func.apply(context, args);
                }
            };
        },
        /**
         * 
         * @param {CodeMirror: Object} _currentEditor 
         */
        onCursorActivity: (_currentEditor) => {
            _currentEditor.on('cursorActivity', editor.listeners.debounce(
                () => {
                    let questions = editor.scanForQuestions();
                    if(questions.length > 0) {
                        $("#content").empty();
                        const language = $(".same-as-selected")[0].textContent;
                        getResults(questions[0], language);
                    }
                }, 3500, false))
        },
        /**
         *
         * @param {CodeMirror: Object} _currentEditor 
         */
        codeSelectReplace: () => {
            $('code').click( function(event) {
                if(editor.currentEditor.doc.somethingSelected()) {
                    editor.currentEditor.doc.replaceSelection(event.target.textContent);
                }
            })
        }
    },
     /**
     *
     * @param {CodeMirror: Object} _currentEditor 
     */
    init: () => {
        editor.listeners.selectEditorLanguage();
        editor.addReplaceAllFunc();
    }
}

editor.init();