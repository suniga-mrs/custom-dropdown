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
    
    
    let _defaults = {
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


    function replaceDOM(drpObj) {
        let oldObj = $(drpObj)
        let newDOM = $(_defaults.template);
        let drpObj_items = $(drpObj).find('option');
        let defaultText = '';
        //add default first option
        if (_options.hasOwnProperty('defaultText')) {
            defaultText = _options.defaultText;
        }
        else {
            defaultText = _defaults.defaultText;
        }
        //appends first default option        
        let firstOption = $(_defaults.listTemplate);
        firstOption.find('.dropdown-item').text(defaultText);
        firstOption.find('.dropdown-item').attr('data-value', 0);
        newDOM.find('ul.dropdown-menu.inner').append(firstOption);
        //sets first option as displayed
        newDOM.find('button.dropdown-toggle .filter-text-inner').text(defaultText);

        drpObj_items.each(function() {
            let _old = $(this);
            let _new = $(_defaults.listTemplate);

            _new.find('.dropdown-item').text($(_old).text());
            _new.find('.dropdown-item').attr('data-value', $(_old).val());
            
            newDOM.find('ul.dropdown-menu.inner').append(_new);
        });

        $(drpObj).replaceWith(newDOM);
        newDOM.prepend(oldObj.hide());

        //select the first option
        newDOM.find('select').val("0");

        eventHandlers(newDOM, oldObj)
    }

    function eventHandlers(newDOM, oldObj) {
        const drpContainer = newDOM;
        let btnToggle = newDOM.find('button.dropdown-toggle');
        let drpMenu = newDOM.find('button ~ .dropdown-menu:first');
        let listItems = drpMenu.find('li');

        btnToggle.on('click', btnToggleClickEvent);

        drpMenu.on('click', 'a', listItemClickEvent)

        $(document).on('click', closeDropdown)

        function closeDropdown(e) {

            let trigger = $(drpContainer);

            if (trigger !== e.target && !trigger.has(event.target).length) {
                drpMenu.removeClass('show');
                btnToggle.removeClass('show');
                drpMenu.find('.inner:first').removeClass('show');
            }

        }

        function btnToggleClickEvent(e) {
            drpMenu.toggleClass('show');
            btnToggle.toggleClass('show');
            drpMenu.find('.inner:first').toggleClass('show');
        }

        function listItemClickEvent(e) {
            e.preventDefault();
            // UI
            listItems.find('a').each(function() {
                $(this).removeClass('active')
            })
            $(this).addClass('active');
            drpContainer.find('button .filter-text-inner').text($(this).text());

            //change select DOM value
            newDOM.find('select').val($(this).attr('data-value')).change();
        }
    }

    return this.each(function() {
        // console.log($(this))
        replaceDOM($(this));
    });
}
