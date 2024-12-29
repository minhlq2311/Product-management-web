// Permission
const tablePermissions = document.querySelector('[table-permissions]');
if(tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");

  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const row = tablePermissions.querySelectorAll('[data-name]');
    row.forEach(row => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll('input');

      if(name == "id") {
        inputs.forEach(input => {
          const id = input.value;
          permissions.push({
            id: id,
            permissions: []
          })
        })
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if(checked) {
            permissions[index].permissions.push(name);
          }
        })
      }
    });

    if(permissions.length > 0) {
      const formChangePermissions = document.querySelector('#form-change-permissions');
      const inputPermissions = formChangePermissions.querySelector('input[name="permissions"]');
      inputPermissions.value = JSON.stringify(permissions);
      formChangePermissions.submit();
    }
  })
}
// End Permission

// Permission data default
const dataRecords = document.querySelector("[data-records]");
if(dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermissions = document.querySelector("[table-permissions]");

  // Lặp qua từng record dạng id, permissions[]
  records.forEach((records, index) => {
    // Lấy permissions[]
    const permissions = records.permissions;
    // Lặp qua từng gtri trong permissions[]
    permissions.forEach(permission => {
      // Tìm row có data-name = permission
      const row = tablePermissions.querySelector(`[data-name=${permission}]`);
      // Tìm input có value = id trong row đó
      const input = row.querySelectorAll('input')[index];
      input.checked = true;
    })
  })
}
// End Permission data default

// Delete roles
const buttons = document.querySelectorAll('[button-delete]');
const formDeleteRole = document.querySelector('#form-delete-role')

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const isConfirm = confirm("Are you sure that you want to delete this role?");
    if(isConfirm) {
      const id = button.getAttribute('data-id');
      const path = formDeleteRole.getAttribute('data-path')
      const action = `${path}/${id}?_method=DELETE`;
      formDeleteRole.action = action;
      formDeleteRole.submit();
    }
  })
})
// End delete roles
