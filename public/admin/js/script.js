// button status
const buttonStatus = document.querySelectorAll("[button-status]") 
//Thuoc tinh button-status tu dinh nghia nen phai cho vao trong ngoac vuong
if(buttonStatus.length > 0){
  let url = new URL(window.location.href); //Lấy ra được URL

  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if(status.length){
        url.searchParams.set("status", status);
      } else{
        url.searchParams.delete("status");
      }
      
      window.location.href = url.href;
      // window.location.href: chuyển hướng sang một URL khác
    })
  });
}

// End button status

// Form search

const formSearch = document.querySelector("#form-search");
if(formSearch){
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (event) => {
    event.preventDefault(); //Không cho truyền lên URL
    const keyword = event.target.elements.keyword.value;
    if(keyword){
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}

// End form search

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]"); //Bắt thuộc tính tự định nghĩa 
// phải cho vào trong ngoặc vuông
if(buttonsPagination){
  let url = new URL(window.location.href);

  buttonsPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page);
      window.location.href = url.href;
    })
  })
}
// End Pagination

// checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti){
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsID = checkboxMulti.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("click", () => {
    // console.log(inputCheckAll.checked);
    if(inputCheckAll.checked){
      inputsID.forEach((input) => {
        input.checked = true;
      })
    } else {
      inputsID.forEach((input) => {
        input.checked = false;
      })
    }
  });

  inputsID.forEach((input) => {
    input.addEventListener("click", () =>{
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length; //Đoạn code CSS tìm ra các ô input đã được check

      if(countChecked === inputsID.length){
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
      // console.log(countChecked);
      // console.log(inputsID.length);
    })
  })
}
// end checkbox multi

// Form change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault(); //Khi gửi form thì hành động mặc định là reload trang web nên thêm preventDefault() vào để không reload
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

    const typeChange = e.target.elements.type.value;
    if(typeChange === "delete-all") {
      const isConfirm = confirm("Do you want to delete these items?");
      if(!isConfirm) {
        return;
      }
    }

    if(inputsChecked.length > 0){
      let ids = [];
      const inputIDs = formChangeMulti.querySelector("input[name='ids']");

      inputsChecked.forEach(input => {
        const id = input.value;
        
        if(typeChange === 'change-position') {
          const position = input.closest("tr").querySelector("input[name='position']").value;
          // Ham closest tra ve the lam cha gan nhat cua the hien tai
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      inputIDs.value = ids.join(', ');
      formChangeMulti.submit();
    } else {
      alert("Please choose at least one record");
    }
  })
}
// End Form change Multi

// Show Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector(".close-alert");
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  })

}

// End Show Alert

// upload image
const uploadImage = document.querySelector('[upload-image]')
if(uploadImage) {
  const uploadImageInput = document.querySelector('[upload-image-input]');
  const uploadImagePreview = document.querySelector('[upload-image-preview]');

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if(file) {
      // Tạo đường dẫn ảnh tạm
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  })
}
// end upload image

// Sort
const sort = document.querySelector('[sort]');
if(sort) {
  let url = new URL(window.location.href);
  const sortSelect = document.querySelector('[sort-select]');
  const sortClear = document.querySelector('[sort-clear]');

  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    const [sortKey, sortValue] = value.split('-');
    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);
    window.location.href = url.href;
  })
  // Delete sort
  sortClear.addEventListener("click", (e) => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url.href;
  })
  // End delete sort
  // Add selected to option
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");

  if(sortKey && sortValue) {
    const stringSort = `${sortKey}-${sortValue}`;
    const optionSelected = sortSelect.querySelector(`option[value=${stringSort}]`);
    optionSelected.selected = true;
  }
}


// End Sort

