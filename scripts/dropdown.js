$.fn.myDropdown = function() {

    let _defaults={
        template: `
            <div class="custom-dropdown">
                <button class="dropdown-toggle">
                    <div class="filter-text">
                        <div class="filter-text-inner">
                        </div>
                    </div>
                    <div class="dropdown-icon">
                        <span></span>
                    </div>
                </button>
                <div class="dropdown-menu">
                    <div class="inner">
                        <ul class="dropdown-menu inner show">
                        </ul>
                    </div>
                </div>
            </div>
        `,
        listTemplate: `
            <li><a href="#" class="dropdown-item"></a></li>
        `

    };

    function replaceDOM(drpObj) {
        let obj = $(drpObj)

        let newDOM = $(_defaults.template);
        let drpObj_items = $(drpObj).find('option');

        drpObj_items.each(function() {
            let _old = $(this);
            let _new = $(_defaults.listTemplate);

            _new.find('.dropdown-item').text($(_old).text());
            _new.find('.dropdown-item').attr('data-value', $(_old).val());
            
            newDOM.find('ul.dropdown-menu.inner').append(_new);
        });



        $(drpObj).replaceWith(newDOM);
        newDOM.prepend(obj.hide());
    }

    function assignList(drpObj) {

    }


    return this.each(function() {
        // console.log($(this))
        replaceDOM($(this));
    });
}