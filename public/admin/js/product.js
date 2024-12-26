// Change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0){
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");
  // console.log(formChangeStatus)

  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      let statusChange = statusCurrent == "active" ? "inactive" : "active";
      
      const action = path + `/${statusChange}/${id}?_method=PATCH`; //Bên index.pug phải chỉnh cái method của form thành POST mới dùng được
      formChangeStatus.action = action; //Vì action là thuộc tính mặc định của HTML nên có thể sử dụng cú pháp như trên, nếu là các thuộc tính tự định nghĩa thì phải dùng setAttribute

      formChangeStatus.submit(); //Js hỗ trợ hàm submit để submit form
    })
  })
}

// End change status

// Delete item
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");

  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Are you sure that you want to delete this item?");
      if(isConfirm) {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=DELETE`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
