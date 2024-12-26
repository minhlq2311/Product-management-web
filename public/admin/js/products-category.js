// Delete category
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0) {
  const formDeleteCategory = document.querySelector("#form-delete-products-category");
  const path = formDeleteCategory.getAttribute("data-path");

  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Are you sure that you want to delete this category?");
      if(isConfirm) {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=DELETE`;
        formDeleteCategory.action = action;
        formDeleteCategory.submit();
      }
    });
  });
}