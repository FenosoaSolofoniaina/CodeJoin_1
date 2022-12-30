"use strict";

(function() {
    const LIST = $("#list");
    let tasks = ["Coder"];

    function taskToDom(tasks) {
        if(tasks.length == 0) {
            LIST.html("<p>Vous ne disposez d'aucune tâche</p>").css({
                "color": "#444",
                "font-size": "20pt"
            });
        }
        else {
            LIST.html("");
            for(let task of tasks) {
                const image = $("<img>").attr("src", "icons/icons16x16/close.png")
                                            .attr("title", "Supprimer de la liste"),
                    btnRemove = $("<button>").attr("id", "btnRemove")
                                            .attr("data-name", task)
                                            .addClass("btn btn-danger")
                                            .append(image)
                                            .click((e) => { removeTask(e) }),
                    span2 = $("<span>").append(btnRemove),
                    span1 = $("<span>").css("padding-right", "20px")
                                        .text(task),
                    li = $("<li>").append(span1, span2);
                LIST.append(li);
            }
        }
    }

    function addTask(newTask) {
        tasks.push(newTask);
        taskToDom(tasks);
        console.log("Ajout de tâche " + newTask + " avec succès");
    }

    function clearTask() {
        tasks = [];
        taskToDom(tasks);
        console.log("Suppression de tous les tâches réussies");
    }

    function removeTask(event) {
        event.preventDefault();
        event.stopPropagation();

        const elm = event.target,
            data = elm.getAttribute("data-name") ? elm.getAttribute("data-name") : elm.parentNode.getAttribute("data-name");
        tasks.splice(tasks.indexOf(data), 1);
        taskToDom(tasks);
    }

    function initializing() {
        taskToDom(tasks);

        $("#btnAdd").click((e) => {
            e.preventDefault();
            let newTasks = $("#task").val().split(",");
            for (let newTask of newTasks){ 
                if(newTask) { addTask(newTask); $("#task").val(""); }
                else { alert("Votre champ est vide") }
            }
        });
        $("#btnClear").click((e) => { e.preventDefault(); clearTask(); });
        $("#btnRemove").click((e) => { removeTask(e); });
    }

    initializing();
})();