function get_loc()
{
    return {
        // separator of parts of a date (e.g. '/' in 11/05/1955)
        '/': "/",
        // separator of parts of a time (e.g. ':' in 05:44 PM)
        ':': ":",
        // the first day of the week (0 = Sunday, 1 = Monday, etc)
        firstDay: 1,
        days: {
            // full day names
            names: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
            // abbreviated day names
            namesAbbr: ["Вос", "Пон", "Вт", "Ср", "Чет", "Пят", "Суб"],
            // shortest day names
            namesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
        },
        months: {
            // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
            names: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", ""],
            // abbreviated month names
            namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
        },
        // AM and PM designators in one of these forms:
        // The usual view, and the upper and lower case versions
        //      [standard,lowercase,uppercase]
        // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
        //      null
        AM: null,
        PM: null,
        eras: [
        // eras in reverse chronological order.
        // name: the name of the era in this culture (e.g. A.D., C.E.)
        // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
        // offset: offset in years from gregorian calendar
        {"name": "A.D.", "start": null, "offset": 0 }
        ],
        twoDigitYearMax: 2029,
//        patterns: {
//            // short date pattern
//            d: "M/d/yyyy",
//            // long date pattern
//            D: "dddd, MMMM dd, yyyy",
//            // short time pattern
//            t: "h:mm tt",
//            // long time pattern
//            T: "h:mm:ss tt",
//            // long date, short time pattern
//            f: "dddd, MMMM dd, yyyy h:mm tt",
//            // long date, long time pattern
//            F: "dddd, MMMM dd, yyyy h:mm:ss tt",
//            // month/day pattern
//            M: "MMMM dd",
//            // month/year pattern
//            Y: "yyyy MMMM",
//            // S is a sortable format that does not vary by culture
//            S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
//            // formatting of dates in MySQL DataBases
//            ISO: "yyyy-MM-dd hh:mm:ss",
//            ISO2: "yyyy-MM-dd HH:mm:ss",
//            d1: "dd.MM.yyyy",
//            d2: "dd-MM-yyyy",
//            d3: "dd-MMMM-yyyy",
//            d4: "dd-MM-yy",
//            d5: "H:mm",
//            d6: "HH:mm",
//            d7: "HH:mm tt",
//            d8: "dd/MMMM/yyyy",
//            d9: "MMMM-dd",
//            d10: "MM-dd",
//            d11: "MM-dd-yyyy"
//        },
        patterns: {
            d: "dd.MM.yyyy",
            D: "d MMMM yyyy 'г.'",
            t: "H:mm",
            T: "H:mm:ss",
            f: "d MMMM yyyy 'г.' H:mm",
            F: "d MMMM yyyy 'г.' H:mm:ss",
            Y: "MMMM yyyy"
        },
        agendaViewString: "Agenda",
        agendaAllDayString: "all day",
        agendaDateColumn: "Date",
        agendaTimeColumn: "Time",
        agendaAppointmentColumn: "Appointment",
        backString: "Back",
        forwardString: "Forward",
        toolBarPreviousButtonString: 'Предыдущая неделя',
        toolBarNextButtonString: "Следующая неделя",
        emptyDataString: "No data to display",
        loadString: "Loading...",
        clearString: "Закрыть",
        todayString: "Сегодня",
        dayViewString: "Day",
        weekViewString: "Week",
        monthViewString: "Month",
        timelineDayViewString: "Timeline Day",
        timelineWeekViewString: "Timeline Week",
        timelineMonthViewString: "Timeline Month",
        loadingErrorMessage: "The data is still loading and you cannot set a property or call a method. You can do that once the data binding is completed. jqxScheduler raises the 'bindingComplete' event when the binding is completed.",
        editRecurringAppointmentDialogTitleString: "Edit Recurring Appointment",
        editRecurringAppointmentDialogContentString: "Do you want to edit only this occurrence or the series?",
        editRecurringAppointmentDialogOccurrenceString: "Edit Occurrence",
        editRecurringAppointmentDialogSeriesString: "Edit The Series",
        editDialogTitleString: "Edit Appointment",
        editDialogCreateTitleString: "Создание нового занятия",
        contextMenuEditAppointmentString: "Открыть занятие",
        contextMenuCreateAppointmentString: "Создание нового занятия",
        editDialogSubjectString: "Subject",
        editDialogLocationString: "Location",
        editDialogFromString: "From",
        editDialogToString: "To",
        editDialogAllDayString: "All day",
        editDialogExceptionsString: "Exceptions",
        editDialogResetExceptionsString: "Reset on Save",
        editDialogDescriptionString: "Description",
        editDialogResourceIdString: "Owner",
        editDialogStatusString: "Status",
        editDialogColorString: "Color",
        editDialogColorPlaceHolderString: "Select Color",
        editDialogTimeZoneString: "Time Zone",
        editDialogSelectTimeZoneString: "Select Time Zone",
        editDialogSaveString: "Save",
        editDialogDeleteString: "Delete",
        editDialogCancelString: "Cancel",
        editDialogRepeatString: "Repeat",
        editDialogRepeatEveryString: "Repeat every",
        editDialogRepeatEveryWeekString: "week(s)",
        editDialogRepeatEveryYearString: "year(s)",
        editDialogRepeatEveryDayString: "day(s)",
        editDialogRepeatNeverString: "Never",
        editDialogRepeatDailyString: "Daily",
        editDialogRepeatWeeklyString: "Weekly",
        editDialogRepeatMonthlyString: "Monthly",
        editDialogRepeatYearlyString: "Yearly",
        editDialogRepeatEveryMonthString: "month(s)",
        editDialogRepeatEveryMonthDayString: "Day",
        editDialogRepeatFirstString: "first",
        editDialogRepeatSecondString: "second",
        editDialogRepeatThirdString: "third",
        editDialogRepeatFourthString: "fourth",
        editDialogRepeatLastString: "last",
        editDialogRepeatEndString: "End",
        editDialogRepeatAfterString: "After",
        editDialogRepeatOnString: "On",
        editDialogRepeatOfString: "of",
        editDialogRepeatOccurrencesString: "occurrence(s)",
        editDialogRepeatSaveString: "Save Occurrence",
        editDialogRepeatSaveSeriesString: "Save Series",
        editDialogRepeatDeleteString: "Delete Occurrence",
        editDialogRepeatDeleteSeriesString: "Delete Series",
        editDialogStatuses:
        {
            free: "Free",
            tentative: "Tentative",
            busy: "Busy",
            outOfOffice: "Out of Office"
        },
        loadingErrorMessage: "The data is still loading and you cannot set a property or call a method. You can do that once the data binding is completed. jqxScheduler raises the 'bindingComplete' event when the binding is completed.",
    }
}

let backend = "http://localhost:8000/calendar/";
let host = "http://localhost:8000/";
//let backend = "http://78.139.253.245:60833/calendar/";
//let host = "http://78.139.253.245:60833/";
let CURRENT_WEEK_DATE = '';
let lesson_aux_data = {};

let lesson = {
    id: 0,
    room_id: 0,
    csrfmiddlewaretoken: null,
    period: 1,
    begin: '00:00',
    end: '00:00',
    date: new $.jqx.date('todayDate'),
    description: ''
};

function get_role()
{
    return $('#role').val().toString();
}

function get_user_id()
{
    return $('#user_id').val().toString();
}

function clear_lesson()
{
    lesson.id = 0;
    lesson.room_id = 0;
    lesson.group_id = 0;
    lesson.begin = '00:00';
    lesson.end = '00:00';
    lesson.date = new $.jqx.date('todayDate');
    lesson.period = 1;
    lesson.description = '';
}

function fill_schedule()
{
    $.get(backend + 'get_lessons/' + CURRENT_WEEK_DATE + '/')
    .success((data) => {
        lesson_aux_data = {};
        for (let i = 0; i < data.length; ++i) {
            lesson_aux_data[data[i].id] = data[i];
        }
        data.unshift({
            id: '1294578567856786123',
            begin: new Date(2012, 12, 12),
            end: new Date(2012, 12, 12),
            title: 'kostil',
            calendar: true,
        });
        data.unshift({
            id: '1294578567856786',
            begin: new Date(2012, 12, 12),
            end: new Date(2012, 12, 12),
            title: 'kostil',
            calendar: false,
        });
        let source = {
            dataType: "array",
            dataFields: [
                { name: 'id', type: 'string' },
                { name: 'begin', type: 'date' },
                { name: 'end', type: 'date' },
                { name: 'title', type: 'string' },
                { name: 'calendar', type: 'string' },
            ],
            id: 'id',
            localData: data,
        };
        let adapter = new $.jqx.dataAdapter(source);
        $('#scheduler').jqxScheduler('source', adapter);
    });
}

function set_week(event)
{
    console.log(123);
    let from = event.args.from.toString('yyyy-MM-dd');
    CURRENT_WEEK_DATE = from;
    fill_schedule();
}

function open_create_dialog()
{
    clear_lesson();
    let selection = $('#scheduler').jqxScheduler('getSelection')
    console.log(selection);
    $("#lesson_date").jqxDateTimeInput('setDate', selection.from.toDate());

    $('#title').jqxInput('val', '');
    //set begin/end time
    let str = selection.from.hour().toString() + ':';
    if (selection.from.minute().toString().length < 2)
        str += '0';
    str += selection.from.minute().toString();
    $('#begin_time').jqxInput('val', str);
    str = selection.to.hour().toString() + ':';
    if (selection.to.minute().toString().length < 2)
        str += '0';
    str += selection.to.minute().toString();
    $('#end_time').jqxInput('val', str);
    $('group_box').css('display', '');
    $('#teacher_list').jqxDropDownList('uncheckAll');

    $('#period_box').css('display', '');
    $('#lesson_period').jqxInput('val', 1);
    $('#description').jqxTextArea('val', '');
    $('#check').jqxCheckBox('check');

    $("#lesson_dialog").jqxWindow('open');
}

function open_dialog(event)
{
    data = event.args.appointment.originalData;
    console.log(event.args);
    console.log('opening dialog');
    console.log(data);
    lesson.id = data.id;

    //set date
    $("#lesson_date").jqxDateTimeInput('setDate', data.begin);
    //set begin/end time
    $('#begin_time').jqxInput('val', data.begin.toTimeString().slice(0, 5));
    $('#end_time').jqxInput('val', data.end.toTimeString().slice(0, 5));

    data = lesson_aux_data[data.id];
    console.log(data);
    $('#title').jqxInput('val', data.title);

    //select room
    let rooms = $('#room_list').jqxDropDownList('getItems');
    let i = 0;
    while (rooms[i].originalItem.id != data.room_id)
        ++i;
    $('#room_list').jqxDropDownList({selectedIndex: i });

    //select group
    let groups = $('#group_list').jqxDropDownList('getItems');
    i = 0;
    while (i < groups.length && groups[i].originalItem.id != data.group_id)
        ++i;
    if (i != groups.length) {
        $('#group_list').jqxDropDownList({selectedIndex: i });
    }
    else {
    }

    // Select teacher
    let ts = $('#teacher_list').jqxDropDownList('getItems');
    for (i = 0; i < data.teachers.length; ++i) {
        let j = 0;
        while (ts[j].value != data.teachers[i])
            ++j;
        $('#teacher_list').jqxDropDownList('checkIndex', ts[j].index);
    }

    $('#description').jqxTextArea('val', data.description);
    if (data.calendar) {
        $('#check').jqxCheckBox('check');
    }
    else {
        $('#check').jqxCheckBox('uncheck');
    }

    $('#period_box').css('display', 'none');
    $("#lesson_dialog").jqxWindow('open');
}

function close_dialog()
{
    $("#lesson_dialog").jqxWindow('close');
}

function read_lesson()
{
    lesson.date = $("#lesson_date").jqxDateTimeInput('getDate').toISOString();
    lesson.room_id = $("#room_list").jqxDropDownList('val');
    if (!$("#check").jqxCheckBox('val'))
        lesson.group_id = $("#group_list").jqxDropDownList('val');
    else
        lesson.group_id = 0;
    let t = $("#begin_time").jqxInput('val').split(':');
    lesson.is_event = $("#check").jqxCheckBox('val');
    lesson.title = $('#title').jqxInput('val');
    lesson.begin =  $("#lesson_date").jqxDateTimeInput('getDate');
    lesson.begin.setHours(t[0], t[1]);
    lesson.begin = lesson.begin.toISOString();
    t = $("#end_time").jqxInput('val').split(':');
    lesson.end =  $("#lesson_date").jqxDateTimeInput('getDate');
    lesson.end.setHours(t[0], t[1]);
    lesson.end = lesson.end.toISOString();
    lesson.teachers = {};
    let ts = $('#teacher_list').jqxDropDownList('getCheckedItems');
    for (let i = 0; i < ts.length; ++i) {
        if (ts[i].checked) {
            lesson.teachers[ts[i].value] = ts[i].value;
        }
    }
    lesson.period = $("#lesson_period").jqxInput('val');
    lesson.description = $('#description').jqxTextArea('val');
}

function save_lesson()
{
    if (get_role() == 'student') {
        fill_schedule();
        return;
    }
    read_lesson();
    console.log(lesson);
    if (lesson.id) {
        $.post(backend + 'update_lesson/', lesson)
        .success((data) => {
            fill_schedule();
            $("#message").text(data.message);
            $("#message").jqxNotification("open");
            if (data.ok)
               close_dialog();
        });
    }
    else {
        $.post(backend + 'create_lesson/', lesson)
        .success((data) => {
            fill_schedule();
            $("#message").text(data.message);
            $("#message").jqxNotification("open");
            if (data.ok)
               close_dialog();
        });
    }
}

function delete_lesson()
{
    $.get(backend + 'delete_lesson/' + lesson.id + '/')
    .success((data) => {
        console.log(data);
        $("#scheduler").jqxScheduler('deleteAppointment', lesson.id);
        $("#message").text(data.message);
        $("#message").jqxNotification("open");
        close_dialog();
    });
}

function drag_or_resize(event)
{
    console.log('resized or dragged');
    appointment = event.args.appointment;
    lesson.id = appointment.id;
    lesson.room_id = lesson_aux_data[lesson.id].room_id;
    lesson.group_id = lesson_aux_data[lesson.id].group_id;
    $("#lesson_date").jqxDateTimeInput('setDate', appointment.from.toDate());
    let str = appointment.from.hour().toString() + ':';
    if (appointment.from.minute().toString().length < 2)
        str += '0';
    str += appointment.from.minute().toString();
    $('#begin_time').jqxInput('val', str);
    str = appointment.to.hour().toString() + ':';
    if (appointment.to.minute().toString().length < 2)
        str += '0';
    str += appointment.to.minute().toString();
    $('#end_time').jqxInput('val', str);
    data = lesson_aux_data[lesson.id];

    //select room
    let rooms = $('#room_list').jqxDropDownList('getItems');
    let i = 0;
    while (rooms[i].originalItem.id != data.room_id)
        ++i;
    $('#room_list').jqxDropDownList({selectedIndex: i });

    //select group
    let groups = $('#group_list').jqxDropDownList('getItems');
    i = 0;
    while (i < groups.length && groups[i].originalItem.id != data.group_id)
        ++i;
    if (i != groups.length) {
        $('#group_list').jqxDropDownList({selectedIndex: i });
        $('#check').jqxCheckBox('uncheck');
    }
    else {
        $('#check').jqxCheckBox('check');
    }

    $('#teacher_list').jqxDropDownList('uncheckAll');
    let ts = $('#teacher_list').jqxDropDownList('getItems');
    for (i = 0; i < data.teachers.length; ++i) {
        let j = 0;
        while (ts[j].value != data.teachers[i])
            ++j;
        $('#teacher_list').jqxDropDownList('checkIndex', ts[j].index);
    }

    $('#description').jqxTextArea('val', data.description);
    $('#title').jqxInput('val', data.title);

    save_lesson();
}

function on_menu_event(event)
{
    if (event.args.item.id == 'editAppointment') {
        open_dialog(event);
    }
    else if (event.args.item.id == 'createAppointment') {
        open_create_dialog();
    }
}

function init_client()
{
    //csrf
    lesson.csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();

    $("#lesson_dialog").jqxWindow({
        autoOpen:false,
        width: '500px',
        height: '550px',
    });
    $("#title").jqxInput({ width: 250, height: 30, disabled: true });

    //date
    $("#lesson_date").jqxDateTimeInput({ width: '300px', height: '25px', disabled: true });

    //begin time
    $("#begin_time").jqxInput({ placeHolder: "Введите время начала", width: 250, height: 30, disabled: true });
    //end time
    $("#end_time").jqxInput({ placeHolder: "Введите время конца света", width: 250, height: 30, disabled: true });
    //period
    $("#lesson_period").jqxInput({ placeHolder: "Введите период занятия", width: 250, height: 30, disabled: true });

    // notification
    $("#message").jqxNotification({
        width: 250, position: "top-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
    });

    //room drop down
    let source = {
        datatype: "json",
        datafields: [
            { name: 'id' },
            { name: 'name' }
        ],
        url: backend + 'get_rooms/',
        async: true
    };
    let dataAdapter = new $.jqx.dataAdapter(source);
    $("#room_list").jqxDropDownList({
        selectedIndex: 0,
        source: dataAdapter,
        displayMember: "name",
        valueMember: "id",
        width: 200,
        height: 30,
        disabled: true
    });

    //group drop down
    source = {
        datatype: "json",
        datafields: [
            { name: 'id' },
            { name: 'name' }
        ],
        url: host + 'group/get_groups/',
        async: true
    };
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#group_list").jqxDropDownList({
        selectedIndex: 0,
        source: dataAdapter,
        displayMember: "name",
        valueMember: "id",
        width: 200,
        height: 30,
        disabled: true
    });
    source = {
        datatype: "json",
        datafields: [
            { name: 'id' },
            { name: 'full_name' }
        ],
        url: host + 'teacher/get_teachers/',
        async: true
    };
    dataAdapter = new $.jqx.dataAdapter(source);
    //teachers drop down
    $("#teacher_list").jqxDropDownList({
        checkboxes: true,
        source: dataAdapter,
        displayMember: "full_name",
        valueMember: "id",
        width: 200,
        height: 30,
        disabled: true
    });

    //description
    $('#description').jqxTextArea({ height: 150, width: 300, disabled: true});

    //checkbox
    $("#check").jqxCheckBox({ width: 120, height: 25, disabled: true});
    $("#check").on('checked', () => {
        $('#group_box').css('display', 'none');
    });
    $("#check").on('unchecked', () => {
        $('#group_box').css('display', '');
    });

    //buttons
    $("#close_button").jqxButton({template:'primary'});
    $("#close_button").on('click', close_dialog);
}

function init_manager()
{
    //csrf
    lesson.csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();

    $("#lesson_dialog").jqxWindow({
        autoOpen:false,
        width: '500px',
        height: '550px',
    });

    $("#title").jqxInput({ width: 250, height: 30});
    //date
    $("#lesson_date").jqxDateTimeInput({ width: '300px', height: '25px' });

    //begin time
    $("#begin_time").jqxInput({ placeHolder: "Введите время начала", width: 250, height: 30 });
    //end time
    $("#end_time").jqxInput({ placeHolder: "Введите время конца света", width: 250, height: 30 });
    //period
    $("#lesson_period").jqxInput({ placeHolder: "Введите период занятия", width: 250, height: 30 });

    // notification
    $("#message").jqxNotification({
        width: 250, position: "top-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
    });

    //room drop down
    let source = {
        datatype: "json",
        datafields: [
            { name: 'id' },
            { name: 'name' }
        ],
        url: backend + 'get_rooms/',
        async: true
    };
    let dataAdapter = new $.jqx.dataAdapter(source);
    $("#room_list").jqxDropDownList({
        selectedIndex: 0,
        source: dataAdapter,
        displayMember: "name",
        valueMember: "id",
        width: 200,
        height: 30,
    });

    //group drop down
    source = {
        datatype: "json",
        datafields: [
            { name: 'id' },
            { name: 'name' }
        ],
        url: host + 'group/get_groups/',
        async: true
    };
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#group_list").jqxDropDownList({
        selectedIndex: 0,
        source: dataAdapter,
        displayMember: "name",
        valueMember: "id",
        width: 200,
        height: 30,
    });

    source = {
        datatype: "json",
        datafields: [
            { name: 'id' },
            { name: 'full_name' }
        ],
        url: host + 'teacher/get_teachers/',
        async: true
    };
    dataAdapter = new $.jqx.dataAdapter(source);
    //teachers drop down
    $("#teacher_list").jqxDropDownList({
        checkboxes: true,
        source: dataAdapter,
        displayMember: "full_name",
        valueMember: "id",
        width: 200,
        height: 30,
    });

    //description
    $('#description').jqxTextArea({ height: 150, width: 300});

    //checkbox
    $("#check").jqxCheckBox({ width: 120, height: 25});
    $("#check").on('checked', () => {
        $('#group_box').css('display', 'none');
    });
    $("#check").on('unchecked', () => {
        $('#group_box').css('display', '');
    });

    //buttons
    $("#save_button").jqxButton({template:'primary'});
    $("#save_button").on('click', save_lesson);

    $("#close_button").jqxButton({template:'primary'});
    $("#close_button").on('click', close_dialog);

    $("#delete_button").jqxButton({template:'danger'});
    $("#delete_button").on('click', delete_lesson);
}

function init_teacher()
{
    //csrf
    lesson.csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();

    $("#lesson_dialog").jqxWindow({
        autoOpen:false,
        width: '500px',
        height: '550px',
    });

    $("#title").jqxInput({ width: 250, height: 30, disabled: true });
    //date
    $("#lesson_date").jqxDateTimeInput({ width: '300px', height: '25px' });

    //begin time
    $("#begin_time").jqxInput({ placeHolder: "Введите время начала", width: 250, height: 30 });
    //end time
    $("#end_time").jqxInput({ placeHolder: "Введите время конца света", width: 250, height: 30 });
    //period
    $("#lesson_period").jqxInput({ placeHolder: "Введите период занятия", width: 250, height: 30 });

    // notification
    $("#message").jqxNotification({
        width: 250, position: "top-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
    });

    //room drop down
    let source = {
        datatype: "json",
        datafields: [
            { name: 'id' },
            { name: 'name' }
        ],
        url: backend + 'get_rooms/',
        async: true
    };
    let dataAdapter = new $.jqx.dataAdapter(source);
    $("#room_list").jqxDropDownList({
        selectedIndex: 0,
        source: dataAdapter,
        displayMember: "name",
        valueMember: "id",
        width: 200,
        height: 30,
        disabled: true
    });

    //group drop down
    source = {
        datatype: "json",
        datafields: [
            { name: 'id' },
            { name: 'name' }
        ],
        url: host + 'group/get_groups/',
        async: true
    };
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#group_list").jqxDropDownList({
        selectedIndex: 0,
        source: dataAdapter,
        displayMember: "name",
        valueMember: "id",
        width: 200,
        height: 30,
        disabled: true
    });
    source = {
        datatype: "json",
        datafields: [
            { name: 'id' },
            { name: 'full_name' }
        ],
        url: host + 'teacher/get_teachers/',
        async: true
    };
    dataAdapter = new $.jqx.dataAdapter(source);
    //teachers drop down
    $("#teacher_list").jqxDropDownList({
        checkboxes: true,
        source: dataAdapter,
        displayMember: "full_name",
        valueMember: "id",
        width: 200,
        height: 30,
        disabled: true
    });

    //description
    $('#description').jqxTextArea({ height: 150, width: 300, disabled: true});

    //checkbox
    $("#check").jqxCheckBox({ width: 120, height: 25, disabled: true});
    $("#check").on('checked', () => {
        $('#group_box').css('display', 'none');
    });
    $("#check").on('unchecked', () => {
        $('#group_box').css('display', '');
    });

    //buttons
    $("#save_button").jqxButton({template:'primary'});
    $("#save_button").on('click', save_lesson);

    $("#close_button").jqxButton({template:'primary'});
    $("#close_button").on('click', close_dialog);

    $("#delete_button").jqxButton({template:'danger'});
    $("#delete_button").on('click', delete_lesson);
}

function init_schedule(date)
{
    CURRENT_WEEK_DATE = date;
    $.get(backend + 'get_lessons/' + date + '/')
    .success((data) => {
    for (let i = 0; i < data.length; ++i) {
        lesson_aux_data[data[i].id] = data[i];
    }
    data.unshift({
        id: '1294578567856786123',
        begin: new Date(2012, 12, 12),
        end: new Date(2012, 12, 12),
        title: 'kostil',
        calendar: true,
    });
    data.unshift({
        id: '1294578567856786',
        begin: new Date(2012, 12, 12),
        end: new Date(2012, 12, 12),
        title: 'kostil',
        calendar: false,
    });
    let source = {
        dataType: "array",
        dataFields: [
            { name: 'id', type: 'string' },
            { name: 'begin', type: 'date' },
            { name: 'end', type: 'date' },
            { name: 'title', type: 'string' },
            { name: 'calendar', type: 'string' },
        ],
        id: 'id',
        localData: data,
    };
    var adapter = new $.jqx.dataAdapter(source);
    $("#scheduler").on('appointmentDoubleClick', open_dialog);
    $('#scheduler').on('dateChange', set_week);
    $('#scheduler').on('contextMenuItemClick', on_menu_event);
    $('#scheduler').on('appointmentChange', drag_or_resize);
    $("#scheduler").jqxScheduler({
        width: 1600,
        height: 1000,
        rowsHeight: 20,
        source: adapter,
        view: 'weekView',
        localization: get_loc(),
        editDialog: false,
        appointmentDataFields:
        {
            id: "id",
            from: "begin",
            to: "end",
            subject: "title",
            resourceId: "calendar",
        },
        resources:
        {
            colorScheme: "scheme05",
            dataField: "calendar",
            source:  new $.jqx.dataAdapter(source)
        },
        contextMenuCreate: function(menu, settings)
        {
            var source = settings.source;
            if (get_role() == 'teacher')
                source.push({ id: "presence", label: "Отметить посещаемость" });
            if (get_role() != 'student')
                source.push({ id: "delete", label: "Удалить занятие" });
        },
        contextMenuItemClick: function (menu, appointment, event)
        {
            var args = event.args;
            switch (args.id) {
                case "delete":
                    lesson.id = appointment.id;
                    delete_lesson();
                    return true;
                case "presence":
                  let url = backend + 'journal/' + lesson_aux_data[appointment.id].group_id + '/' + appointment.id + '/';
                  $.get(url)
                  .success(() => {
                  window.location = url;
                  });
                  return true;
            }
        },
        contextMenuOpen: function (menu, appointment, event) {
            if (get_role() == 'student') {
                menu.jqxMenu('hideItem', 'createAppointment');
                menu.jqxMenu('hideItem', 'delete');
                menu.jqxMenu('hideItem', 'presence');
            }
            if (get_role() == 'teacher') {
                menu.jqxMenu('hideItem', 'createAppointment');
                if (!appointment) {
                    menu.jqxMenu('hideItem', 'delete');
                    menu.jqxMenu('hideItem', 'presence');
                }
                else {
                    menu.jqxMenu('showItem', 'delete');
                    menu.jqxMenu('showItem', 'presence');
                }
            }
            if (get_role() == 'manager') {
                menu.jqxMenu('hideItem', 'presence');
                if (!appointment) {
                    menu.jqxMenu('hideItem', 'delete');
                }
                else {
                    menu.jqxMenu('showItem', 'delete');
                }
            }
        },
        ready: function () {
//            if (data.length > 2) {
//                $("#scheduler").jqxScheduler('ensureAppointmentVisible', data[2].id);
//            }
//             $("#scheduler").jqxScheduler('scrollTop', 700);
        },
        views:
        [{
            type: 'weekView',
            timeRuler: {
                formatString: "HH:mm",
                scaleStartHour: 0,
                scaleEndHour: 27,
                appointmentsRenderMode: 'exactTime',
            },workTime:
            {
                fromDayOfWeek: 4,
                toDayOfWeek: 4,
                fromHour: 2,
                toHour: 2
            }
        }]
    });
    });
}

$(document).ready(function () {
    let role = get_role();
    let date = new $.jqx.date('todayDate').toString('yyyy-MM-dd');
    CURRENT_WEEK_DATE = date;
    if (role == 'student') {
        init_client();
    }
    if (role == 'manager') {
        init_manager();
    }
    if (role == 'teacher') {
        init_teacher();
    }
    init_schedule(date);
});
