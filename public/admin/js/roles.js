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

  /* Trong trường hợp này dù trên console biến records được
  xác định là một object nhưng vì khi chuyển chuỗi JSON sang một object ở 
  câu lệnh trên, và chuỗi JSON ban đầu đại diện cho một mảng, nên 
  records vẫn được coi là một mảng và có thể sử dụng forEach */
  /* Để kiểm tra xem một biến có phải là array hay không thì
  sử dụng câu lệnh Array.isArray(records) */

  records.forEach((records, index) => {
    const permissions = records.permissions;
    permissions.forEach(permission => {
      const row = tablePermissions.querySelector(`[data-name=${permission}]`);
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
