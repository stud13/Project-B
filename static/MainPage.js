class AdvancedBlockActionSid {
    static SAVE_PLAY = 1;
    static MAP_PLAY = 2;
    static MAP_EDIT = 3;
}

function advancedBlockOpen(o_button, is_left = false, id_action) {
    var jq_button = $(o_button);
    if (jq_button.hasClass('button_disabled'))
        return;

    var jq_main_block = $('div.main_menu_block');
    var jq_main_block_width = jq_main_block.find('.main_menu_block_width');
    var jq_main_advanced_block = $('div.main_menu_advanced_block');

    // Загружаем сохранения.
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var jq_main_advanced_block_text = jq_main_advanced_block.find('.main_title_text');
    var jq_main_advanced_block_add_button = jq_main_advanced_block.find('.main_advanced_block_add_button');

    var text_action = '';
    if (id_action === AdvancedBlockActionSid.MAP_EDIT) {
        text_action = 'Выберите карту для изменения';
        jq_main_advanced_block_add_button.show();
    } else if (id_action === AdvancedBlockActionSid.MAP_PLAY) {
        text_action = 'Выберите карту для игры';
        jq_main_advanced_block_add_button.hide();
    } else if (id_action === AdvancedBlockActionSid.SAVE_PLAY) {
        text_action = 'Выберите сохранённую игру';
        jq_main_advanced_block_add_button.hide();
    }
    jq_main_advanced_block_text.html(text_action);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Рассчитываем данные для расширенного блока и отображаем его.
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var jq_main_advanced_block_left = jq_main_advanced_block.find('.main_menu_advanced_block_left');
    jq_main_advanced_block_left.data('is_left', is_left);

    var i_advanced_block_width = document.documentElement.clientWidth - jq_main_block_width.width() - 90;
    var i_advanced_block_height = document.documentElement.clientHeight - 30;//top*2+border*2

    if (is_left) {
        jq_main_block.css("align-items", "flex-end");

        jq_main_advanced_block.css({top: '10px'});
        jq_main_advanced_block.css({left: '10px'});
        jq_main_advanced_block.width(i_advanced_block_width + 'px');
        jq_main_advanced_block.height(i_advanced_block_height + 'px');
        jq_main_advanced_block.show('slide', {direction: 'left'}, 300);
    } else {
        jq_main_block.css("align-items", "flex-start");

        jq_main_advanced_block.css({top: '10px'});
        jq_main_advanced_block.css({left: jq_main_block_width.width() + 70 + 'px'});
        jq_main_advanced_block.width(i_advanced_block_width + 'px');
        jq_main_advanced_block.height(i_advanced_block_height + 'px');
        jq_main_advanced_block.show('slide', {direction: 'right'}, 300);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    jq_main_block.find('.main_button').removeClass('button_disabled');
    jq_button.addClass('button_disabled');
}

function advancedBlockClose() {
    var jq_main_block = $('div.main_menu_block');
    var jq_main_advanced_block = $('div.main_menu_advanced_block');

    var jq_main_advanced_block_left = jq_main_advanced_block.find('.main_menu_advanced_block_left');
    var is_left = !!jq_main_advanced_block_left.data('is_left');

    jq_main_advanced_block.hide('slide', {direction: is_left ? 'left' : 'right'}, 300);
    jq_main_block.css("align-items", "center");

    jq_main_block.find('.main_button').removeClass('button_disabled');
}