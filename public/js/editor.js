/**
 * Date: 12/10/2018
 * @version 1.0
 * @author David Ye
 * @description Editor that includes functions for
 *  - Creating a new CodeMirror editor
 *  - Destroying current CodeMirror editor
 *  - Listeners to listen to cursor activity
 *  - Listeners to replace selected text in editor
 *  - Detect a question starting with a prefix //? 
 */

const editor = {
    currentEditor: null,
    /**
     * Create an textarea element, appends it to
     * the container that's passed in and utilizes
     * the .fromTextArea() from CodeMirror to convert
     * into an CodeMirror object. Will add a listener
     * afterwards to listen to cursor in order to prompt
     * a debounced query to stack overflow.
     * @param {String} container 
     * @param {String} language 
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
     * .empty() clone with syntactic sugar
     * @param {Object: container} _currentEditor 
     */
    destroy: (container) => {
        $(container).empty();
    },
    /**
     * Checks a string to see if it includes a "//? "
     * And checks if it has any text after it.
     * @param {String: line} _currentEditor 
     */
    hasAQuestion: (line) => {
        if(line.includes("//? ")) {
            return line.substring(line.indexOf("//? "), line.length).length > 4;
        };
    },
    /**
     * Scans the current CodeMirror editor object 
     * for lines that includes "//? "
     * @returns {Array} Questions 
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
     */
    addReplaceAllFunc: () => {
        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.split(search).join(replacement);
        };
    },
    listeners: {
        /**
         * Listeners to listen for language selection
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
         * Listener to add to CodeMirror object to listens for 
         * cursor activity. Upon activity, will fire debounced 
         * query to stack overflow after 3.5 seconds of no activity.
         * @param {CodeMirror: editor} _currentEditor 
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
         * Listener for replacing the selected text in the editor
         * upon clicking a code block from the answers on the right.
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
     * Initiates all the necessary listeners upon loading
     */
    init: () => {
        editor.listeners.selectEditorLanguage();
        editor.addReplaceAllFunc();
    }
}

editor.init();