const base_url = "https://retoolapi.dev/HJEuFZ/data";

$(function() {
    listPeople();

    $("#person-form").submit(function (e) { 
        e.preventDefault();
        const név = $("#név").val();
        const email = $("#email_input").val();
        const cim = $("#cim").val();
        if (név.length > 6) {
            if (cim.length>=10) {
                const person = {
                    név: név,
                    email: email,
                    cim: cim
                }
                $.post(base_url, person,
                    function (data, textStatus, jqXHR) {
                        if (textStatus === "success") {
                            $("#név").val("");
                            $("#email_input").val("");
                            $("#cim").val("");
                            listPeople();
                        }
                    },
                    "json"
                );
            } else {
                alert("A címnek legalább 10 betű hosszúnak kell");
            }
        } else {
            alert("A névnek legalább 7 karakter hosszúnak kell lennie.");
        }
    });
});

function listPeople() {
    $.get(base_url, function(data, textStatus) {
        let html = "";
        data.forEach(person => {
            html += `<tr>
                <td>${person.id}</td>
                <td>${person.név}</td>
                <td>${person.email}</td>
                <td>${person.cim}</td>
                <td>
                <i onclick="deletePerson(${person.id})" class="fa fa-remove" style="color:red"></i>
                </td>
                <td>
                <i onclick="editPerson(${person.id})" class="fa fa-edit" style="color:blue" ></i>
                </td>
            </tr>`;
        });
        $("#people-table").html(html);
    },
    "json");
}

function deletePerson(personId) {
    $.ajax({
        type: "DELETE",
        url: `${base_url}/${personId}`,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (textStatus === "success") {
                listPeople();
            }
        }
    });
}
function editPerson(personId) {
    $.get(`${base_url}/${personId}`, function(data, textStatus) {
        if (textStatus === "success") {
            $("#név").val(data.név);
            $("#email_input").val(data.email);
            $("#cim").val(data.cim);
            editingPersonId = personId;
        }
    },
    "json");
}
