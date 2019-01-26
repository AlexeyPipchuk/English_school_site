function get_loc()
{
    let loc = {};
    loc.pagergotopagestring = "Страница:";
    loc.pagershowrowsstring = "Кол-во строчек";
    loc.pagerrangestring = " из ";
    loc.pagernextbuttonstring = 'Следующая';
    loc.pagerpreviousbuttonstring = "Предыдущая";
    loc.sortascendingstring = "По возврастанию";
    loc.sortdescendingstring = "По убыванию";
    loc.sortremovestring = "Не сортировать";
    loc.firstDay = 1;
    loc.percentsymbol = "%";
    loc.currencysymbol = "€";
    loc.currencysymbolposition = "before";
    loc.decimalseparator = ".";
    loc.thousandsseparator = ",";
    var days = {
        // full day names
        names: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        // abbreviated day names
        namesAbbr: ["Sonn", "Mon", "Dien", "Mitt", "Donn", "Fre", "Sams"],
        // shortest day names
        namesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
    };
    loc.days = days;
    let months = {
        // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
        names: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],
        // abbreviated month names
        namesAbbr: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez", ""]
    };
    loc.months = months;
    return loc;
}

let backend = "http://localhost:8000/client/";
let host = "http://localhost:8000/";
//let backend = "http://78.139.253.245:60833/client/";
//let host = "http://78.139.253.245:60833/";

function get_user_id()
{
    return $('#hid').val().toString();
}

function delete_group(id)
{
    $.get(backend + 'delete_group/' + get_user_id() + '/' + id.toString());
    let rows = $('#group_grid').jqxGrid('getrows');
    for (let i = 0; ; ++i) {
        if (rows[i].id == id) {
            let row_id = $('#group_grid').jqxGrid('getRowId', i);
            $('#group_grid').jqxGrid('deleterow', row_id);
            return;
        }
    }
}

let group_aux = {};
function add_group()
{
    data = $('#add_group').jqxDropDownList('val');
    console.log(data);
    if (data) {
        console.log(group_aux[data]);
        console.log(group_aux);
        $.get(backend + 'add_group/' + get_user_id() + '/' + data.toString())
        .success((res) => {
            if (res.ok) {
                $('#group_grid').jqxGrid('addrow', null, group_aux[data]);
            }
        });
    }
}

function init_group_section()
{
    $.get(backend + 'get_groups/' + get_user_id() + '/')
    .success((data) => {
        console.log(data);
        for (let i = 0; i < data.length; ++i) {
            data[i].del = '<a href="' + 'javascript:delete_group(' + data[i].id.toString() + ')">удалить</a>'
        }
        let source = {
            localdata: data,
            datafields: [
                { name: 'id', type: 'string'},
                { name: 'name', type: 'string' },
                { name: 'course', type: 'string' },
                { name: 'del', type: 'string' },
            ],
            datatype: "array"
        };
        let dataAdapter = new $.jqx.dataAdapter(source);
        $('#group_grid').jqxGrid({
            width: 800,
            source: dataAdapter,
            localization: get_loc(),
            sortable: true,
            pageable: true,
            showsortmenuitems: false,
            autoheight: true,
            editable: false,
            selectionmode: 'singlecell',
            columns: [
              { text: 'Группа', datafield: 'name', width: 350 },
              { text: 'Занятия', datafield: 'course', width: 350 },
              { text: '', datafield: 'del', width: 100, sortable: false },
            ]
        });
    });
    $.get('http://localhost:8000/group/get_groups')
    .success((data) => {
        for (let i = 0; i < data.length; ++i) {
            group_aux[data[i].id] = data[i];
            group_aux[data[i].id].del = '<a href="' + 'javascript:delete_group(' + data[i].id.toString() + ')">удалить</a>'
        }
        let source = {
            localdata: data,
            datatype: "array",
            datafields: [
                { name: 'id'},
                { name: 'name'},
            ],
        };
        $("#add_group").jqxDropDownList({
            placeHolder: 'Выберите группу',
            source: new $.jqx.dataAdapter(source),
//            minLength: 1,
            displayMember: 'name',
            valueMember: 'id',
        });
    });
}

function add_payment()
{
    val = parseInt($('#add_payment')[0].value);
    if (val && val > 0) {
        console.log(val);
        let item =  {
            difference: val,
            date: new Date()
        }
        $('#payment_grid').jqxGrid('addrow', null, item);
        $.get(backend + 'add_payment/' + get_user_id() + '/' + val);
    }
}

function init_payment_section()
{
    $.get(backend + 'get_payments/' + get_user_id() + '/')
    .success((data) => {
        let source = {
            localdata: data,
            datafields: [
                { name: 'difference', type: 'string' },
                { name: 'date', type: 'date' },
            ],
            datatype: "array"
        };
        let dataAdapter = new $.jqx.dataAdapter(source);
        $('#payment_grid').jqxGrid({
            width: 800,
            source: dataAdapter,
            localization: get_loc(),
            sortable: true,
            pageable: true,
            showsortmenuitems: false,
            autoheight: true,
            editable: false,
            selectionmode: 'singlecell',
            columns: [
              { text: 'Сумма', datafield: 'difference', width: 400 },
              { text: 'Дата', datafield: 'date', width: 400, cellsformat: 'd' },
            ]
        });
    });
}

function init_journal_section()
{
    $.get(backend + 'get_lessons/' + get_user_id() + '/')
    .success((data) => {
        console.log(data);
        let source = {
            localdata: data,
            datafields: [
                { name: 'begin', type: 'date'},
                { name: 'group_name', type: 'string'},
                { name: 'course_name', type: 'string'},
                { name: 'course_cost', type: 'string'},
            ],
            datatype: "array"
        };
        let dataAdapter = new $.jqx.dataAdapter(source);
        $('#journal_grid').jqxGrid({
            width: 800,
            source: dataAdapter,
            localization: get_loc(),
            sortable: true,
            pageable: true,
            showsortmenuitems: false,
            autoheight: true,
            editable: false,
            selectionmode: 'singlecell',
            columns: [
              { text: 'Группа', datafield: 'group_name', width: 200 },
              { text: 'Курс', datafield: 'course_name', width: 200 },
              { text: 'Дата', datafield: 'begin', width: 200, cellsformat: "hh:mm yyyy-MM-dd" },
              { text: 'Стоимость занятия', datafield: 'course_cost', width: 200 },
            ]
        });
    });
}

$(document).ready(function () {
    init_group_section();
    init_payment_section();
    init_journal_section();
});
