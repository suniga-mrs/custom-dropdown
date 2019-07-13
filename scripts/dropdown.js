$.fn.myDropdown = function(options) {

    let _options = new Object();

    if (!options) {
        if (typeof options !== "object") {
            return new Error('Dropdown: Option object is invalid');
        }
    }
    else {
        _options = new Object(options);
    }
    
    
    let _defaults={
        defaultText: 'Nothing selected',
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
    // let _options = {
    //     defaultText: 'Select fruit'
    // }

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
        


        if (_options.hasOwnProperty('defaultText')) {
            newDOM.find('button.dropdown-toggle .filter-text .filter-text-inner').text(_options.defaultText);
        }
        else {
            newDOM.find('button.dropdown-toggle .filter-text .filter-text-inner').text(_defaults.defaultText);
        }



        $(drpObj).replaceWith(newDOM);
        newDOM.prepend(obj.hide());

        eventHandlers(newDOM)
    }

    function eventHandlers(newDOM) {
        let btnToggle = newDOM.find('button.dropdown-toggle');
        let drpMenu = newDOM.find('button ~ .dropdown-menu:first');
        
        btnToggle.on('click', function() {
            drpMenu.toggleClass('show');
            drpMenu.find('.inner:first').toggleClass('show');
        });
    }

    return this.each(function() {
        // console.log($(this))
        replaceDOM($(this));
    });
}