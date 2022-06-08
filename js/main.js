function Staff(
  id,
  name,
  email,
  password,
  working,
  salary,
  position,
  time,
  total,
  rank
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.working = working;
  this.salary = salary;
  this.position = position;
  this.time = time;
  this.total = total;
  this.rank = rank;
}
Staff.prototype.calcTongLuong = function () {
  switch (this.position) {
    case "Sếp":
      this.total = this.salary * 3;
      break;
    case "Trưởng phòng":
      this.total = this.salary * 2;
      break;
    case "Nhân viên":
      this.total = this.salary;
  }
};
Staff.prototype.calcGioLam = function () {
  if (this.time >= 192) {
    this.rank = "nhân viên suất sắc";
  } else if (this.time >= 176) {
    this.rank = "nhân viên giỏi";
  } else if (this.time >= 160) {
    this.rank = "nhân viên khá";
  } else {
    this.rank = "nhân viên trung bình";
  }
};
// tạo mảng chứa danh sách nhân viên : staffs
var staffs = [];
init();
function init() {
  staffs = JSON.parse(localStorage.getItem("staff")) || [];
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    staffs[i] = new Staff(
      staff.id,
      staff.name,
      staff.email,
      staff.password,
      staff.working,
      staff.salary,
      staff.position,
      staff.time,
      staff.total,
      staff.rank
    );
  }
}
display(staffs);
function AddNhanVien() {
  // B1 : Dom tới value
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var working = document.getElementById("datepicker").value;
  var salary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var time = +document.getElementById("gioLam").value;

  // B2 : khởi tạo đối tượng staff
  var staff = new Staff(
    id,
    name,
    email,
    password,
    working,
    salary,
    position,
    time
  );
  staff.calcTongLuong();
  staff.calcGioLam();
  // B3 : hiển thị ra giao diện
  staffs.push(staff);
  // B4 : Lưu biến xuống localStorage
  localStorage.setItem("staff", JSON.stringify(staffs));
  display(staffs);
  resetForm();
  validation();
}

function display(staffs) {
  var tbodyEl = document.getElementById("tableDanhSach");
  // Chứa nội dung html sẽ được thêm vào bên trong tbody
  var html = "";

  // Duyệt mảng staffs
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    // Với mỗi staff tạo ra 1 thẻ tr và từng thẻ td chứa thông tin của chính staff đó
    console.log(staff);
    html += `
      <tr>
        <td>${staff.id}</td>
        <td>${staff.name}</td>
        <td>${staff.email}</td>
        <td>${staff.working}</td>
        <td>${staff.position}</td>
        <td>${staff.total}</td>
        <td>${staff.rank}</td>
        <td>
        <button
            class="btn btn-success"
            onclick="SelectStaff('${staff.id}')"
            data-toggle="modal" data-target="#myModal">
            Cập nhật
          </button>
          <button
            class="btn btn-danger"
            onclick="deleteStaff('${staff.id}')"
          >
            Xoá
          </button>
          </td>
    `;
  }
  // Đưa nội dung html được tạo động từ các đối tượng staff vào bên trong tbody
  tbodyEl.innerHTML = html;
}

function findStaff(staffId) {
  var index = -1; // giả định là không tìm thấy
  for (var i = 0; i < staffs.length; i++) {
    // Kiếm phần tử student trong mảng nào có id khớp với studentId
    if (staffs[i].id === staffId) {
      index = i;
      break;
    }
  }
  return index;
}

function deleteStaff(staffId) {
  // Tìm chỉ mục của phần tử muốn xoá trong mảng staffs
  var index = findStaff(staffId);
  if (index !== -1) {
    // Xoá 1 phần tử ở 1 vị trí bất kì trong mảng
    staffs.splice(index, 1);
    // Lưu thông tin mảng satffs xuống localstorage
    localStorage.setItem("staff", JSON.stringify(staffs));
    display(staffs);
  }
}

function searchStaff() {
  // B1: DOM lấy value
  var searchValue = document.getElementById("btnTimNV").value;
  searchValue = searchValue.toLowerCase();
  // B2: Lọc ra 1 mảng mới thoả mãn điều kiện giá trị searchValue phải bằng với tên
  var newStaffs = [];
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    var StaffName = staff.name.toLowerCase();
    if (StaffName.indexOf(searchValue) !== -1) {
      newStaffs.push(staff);
    }
  }
  // B3: Hiển thị ra giao diện danh sách sinh viên đã lọc
  display(newStaffs);
}

function resetForm() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";

  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
}

// function này được gọi khi click vào nút Cập Nhật của 1 nhân viên trên table
function SelectStaff(staffId) {
  var index = findStaff(staffId);
  // lấy ra staff muốn cập nhật từ mảng staffs
  var staff = staffs[index];
  // đưa thông tin staff này lên giao diện
  document.getElementById("tknv").value = staff.id;
  document.getElementById("name").value = staff.name;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.password;
  document.getElementById("datepicker").value = staff.working;
  document.getElementById("luongCB").value = staff.salary;
  document.getElementById("chucvu").value = staff.position;
  document.getElementById("gioLam").value = staff.time;

  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
}

// Hàm này sẽ được gọi khi click vào nút Cập Nhật ở bên dưới form
function updateStaff() {
  // B1 : DOM tới value
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var working = document.getElementById("datepicker").value;
  var salary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var time = +document.getElementById("gioLam").value;
  var total;
  var rank;

  var staff = new Staff(
    id,
    name,
    email,
    password,
    working,
    salary,
    position,
    time,
    total,
    rank
  );
  //  Cập nhật
  // Tìm index của sinh viên muốn cập nhật
  var index = findStaff(staff.id);
  // Cập nhật
  staffs[index] = staff;
  // Lưu thông tin mảng staffs xuống localstorage
  localStorage.setItem("staff", JSON.stringify(staffs));

  // B4: Gọi hàm display để hiển thị kết quả mới nhất lên giao diện
  display(staffs);
  resetForm();
}
// Các hàm kiểm tra xem input có hợp lệ hay không

function validation() {
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var working = document.getElementById("datepicker").value;
  var salary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var time = +document.getElementById("gioLam").value;

  var isValid = true;

  // kiểm tra mã nhân viên
  var idPx = new RegExp("{4,6}$");
  if (!isRequired(id)) {
    isValid = false;
    document.getElementById("tknv").innerHTML = "Mã NV không được để trống";
  } else if (!idPx.test(id)) {
    isValid = false;
    document.getElementById("tknv").innerHTML = "Mã NV phải có từ 4 - 6 kí tự";
  } else {
    // Đúng
    document.getElementById("tknv").innerHTML = "";
  }

  // kiểm tra tên nhân viên
  var letters = new RegExp("^[A-Za-z]+$");
  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("name").innerHTML = "Tên NV không được để trống";
  } else if (!letters.test(name)) {
    isValid = false;
    document.getElementById("name").innerHTML = "Tên NV có kí tự không hợp lệ";
  } else {
    // Đúng
    document.getElementById("name").innerHTML = "";
  }

  // Dùng regex để kiểm tra email có đúng định dạng hay không
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("email").innerHTML = "Email không được để trống";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("email").innerHTML = "Email không đúng định dạng";
  } else {
    // Đúng
    document.getElementById("email").innerHTML = "";
  }

  // Dùng regex để kiểm tra mật khẩu có đúng định dạng hay không
  var pwPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/;
  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("password").innerHTML =
      "Mật khẩu không được để trống";
  } else if (!pwPattern.test(password)) {
    isValid = false;
    document.getElementById("password").innerHTML =
      "Mật khẩu không đúng định dạng";
  } else {
    // Đúng
    document.getElementById("password").innerHTML = "";
  }

  // Dùng regex để kiểm tra ngày có đúng định dạng hay không
  var dayPattern =
    /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
  if (!isRequired(working)) {
    isValid = false;
    document.getElementById("datepicker").innerHTML =
      "ngày không được để trống";
  } else if (!dayPattern.test(working)) {
    isValid = false;
    document.getElementById("datepicker").innerHTML =
      "ngày không đúng định dạng";
  } else {
    // Đúng
    document.getElementById("datepicker").innerHTML = "";
  }

  // dùng regexp kiểm tra lương có đúng định dạng hay ko
  if (!isRequired(salary)) {
    isValid = false;
    document.getElementById("luongCB").innerHTML = "lương không được để trống";
  } else if (salary < 1000000 && salary > 20000000) {
    isValid = false;
    document.getElementById("luongCB").innerHTML = "lương từ 1tr - 20tr";
  } else {
    // Đúng
    document.getElementById("luongCB").innerHTML = "";
  }
  // kiểm tra số giờ làm trong tháng
  if (!isRequired(time)) {
    isValid = false;
    document.getElementById("gioLam").innerHTML =
      "giờ làm không được để trống";
  } else if (time < 80 && time > 200) {
    isValid = false;
    document.getElementById("gioLam").innerHTML = "giờ làm từ 80h - 200h";
  } else {
    // Đúng
    document.getElementById("gioLam").innerHTML = "";
  }
  return isValid;
}
validation();
// Hàm kiểm tra input có rỗng hay không
function isRequired(value) {
  if (!value) {
    return false;
  }
  return true;
}
