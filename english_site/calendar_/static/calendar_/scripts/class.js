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

let backend = "http://localhost:8000/class/";
//let backend = "http://78.139.253.245:60833/class/";

function delete_class(id)
{
    $.get(backend + 'delete/' + id.toString());
    let rows = $('#class_grid').jqxGrid('getrows');
    for (let i = 0; ; ++i) {
        if (rows[i].id == id) {
            let row_id = $('#class_grid').jqxGrid('getRowId', i);
            $('#class_grid').jqxGrid('deleterow', row_id);
            return;
        }
    }
}

function init()
{
    $.get(backend + 'get_classes/')
    .success((data) => {
        console.log(data);
        for (let i = 0; i < data.length; ++i) {
            data[i].edit = '<a href="' + '/class/edit/' + data[i].id.toString() + '">редактировать</a>'
            data[i].del = '<a href="' + 'javascript:delete_class(' + data[i].id.toString() + ')">удалить</a>'
        }
        let source = {
            localdata: data,
            datafields: [
                { name: 'id', type: 'string'},
                { name: 'name', type: 'string' },
                { name: 'number_of_seats', type: 'int' },
                { name: 'edit', type: 'string' },
                { name: 'del', type: 'string' },
            ],
            datatype: "array"
        };
        let dataAdapter = new $.jqx.dataAdapter(source);
        $('#class_grid').jqxGrid({
            width: 580,
            source: dataAdapter,
            localization: get_loc(),
            sortable: true,
            pageable: true,
            autoheight: true,
            showsortmenuitems: false,
            editable: false,
            selectionmode: 'singlecell',
            columns: [
              { text: 'Номер аудитории', datafield: 'name', width: 180 },
              { text: 'Вместимость', datafield: 'number_of_seats', width: 150 },
              { text: '', datafield: 'edit', width: 150, sortable: false },
              { text: '', datafield: 'del', width: 100, sortable: false },
            ]
        });
    });
}

$(document).ready(function () {
    init();
});
