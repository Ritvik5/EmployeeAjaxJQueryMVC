$(document).ready(function () {
    ShowEmployeeData();
});

function ShowEmployeeData() {

    var url = '/Emp/EmployeeList';
    $.ajax({
        url: url,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var object = '';
            console.log(result)
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.employeeId +'</td>';
                object += '<td>' + item.name +'</td>';
                object += '<td>' + item.profileImage +'</td>';
                object += '<td>' + item.gender +'</td>';
                object += '<td>' + item.department +'</td>';
                object += '<td>' + item.salary +'</td>';
                object += '<td>' + item.startDate +'</td>';
                object += '<td>' + item.notes +'</td>';
                object += '<td><a href = "#" class="btn btn-primary" onclick="Edit(' + item.employeeId +')">Edit</a> | <a href = "#" class="btn btn-danger" onclick="Delete('+item.employeeId+')">Delete</a></td>';
                object += '<tr>';
            }); 
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't be fetch");
        }
    });
};



$('#btnAddEmployee').click(function () {
    $('#EmployeeMadal').modal('show');
})

function AddEmployee() {
    var objData = {
        Name: $('#Name').val(),
        ProfileImage: $('#ProfileImage').val(),
        Gender: $('#Gender').val(),
        Department: $('#Department').val(),
        Salary: $('#Salary').val(),
        StartDate: $('#StartDate').val(),
        Notes: $('#Notes').val()
    };

    $.ajax({
        url: '/Emp/AddEmployee',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Saved');
            ShowEmployeeData(); 
            HideModalPopUp();
            ClearTextBox();
        },
        error: function () {
            alert('Data can not be saved ');
        }
    });

    

    
}
function Delete(employeeId) {
    if(confirm('Are you sure,You want to delete this employee with employeeid: '+employeeId))
    $.ajax({
        url: '/Emp/Delete?employeeId=' + employeeId,
        success: function () {
            alert('Employee record deleted!');
            ShowEmployeeData();
        },
        error: function () {
            alert('Employee cant be deleted!');
        }
    })
}

function Edit(employeeId){
    $.ajax({
        url: '/Emp/Edit?employeeId=' + employeeId,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#EmployeeMadal').modal('show');
            $('#EmployeeId').val(response.employeeId);
            $('#Name').val(response.name);
            $('#ProfileImage').val(response.profileImage);
            $('#Gender').val(response.gender);
            $('#Department').val(response.department);
            $('#Salary').val(response.salary);
            $('#StartDate').val(response.startDate);
            $('#Notes').val(response.notes);
            $('#AddEmployee').css('display', 'none');
            $('#btnUpdate').css('display', 'block');

            //$('#AddEmployee').hide();
            //$('#btnUpdate').show();

        },
        error: function () {
            alert('Data not found');
        }
    })
}
function UpdateEmployee() {
    var objData = {
        EmployeeId:$('#EmployeeId').val(),
        Name: $('#Name').val(),
        ProfileImage: $('#ProfileImage').val(),
        Gender: $('#Gender').val(),
        Department: $('#Department').val(),
        Salary: $('#Salary').val(),
        StartDate: $('#StartDate').val(),
        Notes: $('#Notes').val()
    };

    $.ajax({
        url: '/Emp/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Saved');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert('Data can not be saved ');
        }
    })
}
function ClearTextBox() {
    $('#EmployeeId').val('');
    $('#Name').val('');
    $('#ProfileImage').val('');
    $('#Gender').val('');
    $('#Department').val('');
    $('#Salary').val('');
    $('#StartDate').val('');
    $('#Notes').val('');
}
function HideModalPopUp() {
    $('#EmployeeMadal').modal('hide');
}