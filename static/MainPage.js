class AdvancedBlockActionSid {
    static SAVED_PLAY = 1;
    static MAP_PLAY = 2;
    static MAP_EDIT = 3;
}

var id = null;
function sideWindow(o_button, id_action) {
    var main_menu_advanced_block = document.getElementById("main_menu_advanced_block");
    var main_menu_block_width = document.getElementById("main_menu_block_width");
    var main_menu_block = document.getElementById("main_menu_block");
    var pos = window.innerWidth;

    main_menu_advanced_block.style.display = "none";


    // Загружаем сохранения.
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var main_title_text = document.getElementById("main_title_text");
    var main_advanced_block_add_button = document.getElementById("main_advanced_block_add_button");

    var text_action = "";
    if (id_action === AdvancedBlockActionSid.MAP_EDIT) {
        text_action = "Выберите карту для изменения";
        main_advanced_block_add_button.style.display = "block";
    } else if (id_action === AdvancedBlockActionSid.MAP_PLAY) {
        text_action = "Выберите карту для игры";
        main_advanced_block_add_button.style.display = "none";
    } else if (id_action === AdvancedBlockActionSid.SAVED_PLAY) {
        text_action = "Выберите сохранённую игру";
        main_advanced_block_add_button.style.display = "none";
    }

    main_title_text.innerHTML = text_action;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Рассчитываем данные для расширенного блока и отображаем его.
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (window.innerWidth < 900) {
        var b_center = 310;
    } else {
        var b_center = window.innerWidth / 2 - 300;
    }

    clearInterval(id);
    id = setInterval(frame, 1);
    function frame() {
        if (pos <= b_center) {
            clearInterval(id);
        } else {
            pos = pos-5;
            main_menu_advanced_block.style.left = pos + 'px';
            main_menu_advanced_block.style.display = "block";
            main_menu_block_width.style.alignSelf = "self-start";
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

function closeWindow() {
    var main_menu_advanced_block = document.getElementById("main_menu_advanced_block");
    var main_menu_block_width = document.getElementById("main_menu_block_width");
    main_menu_block_width.style.alignSelf = "center";
    main_menu_advanced_block.style.display = "none";
}