console.log("appES5.js çalışıyor..")

// Constructor
function Course(title, instructor, image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

// UI Constructor
function UI() {
}
UI.prototype.showAlert = function (message, alertClass) {
    var alertHtml = `
    <div class="alert alert-${alertClass}">
        ${message}
    </div>
    `;
    var rowElement = document.querySelector('.row');
    // 'beforeBegin' , 'beforeEnd' , 'afterBegin', 'afterEnd'
    rowElement.insertAdjacentHTML('beforeBegin', alertHtml);

    setTimeout(()=>{
        window.document.querySelector('.alert').remove();
    },2000);
}
UI.prototype.addCourseToList = function (course) {
    const course_list = document.getElementById('course-list');
    try {
        var html = `
    <tr>
        <td>    
            <img src="img/${course.image}" class="course-image">
        </td>
        <td>
            ${course.title}
        </td>
        <td>
            ${course.instructor}
        </td>
        <td>
            <a href="#" class="btn btn-danger btn-sm delete"> Delete </a>
        </td>
    </tr>
    `;
        course_list.innerHTML += html;
        ui.showAlert("Kurs başarıyla eklendi...", "success");
    } catch (e) {
        console.log("err:add");
    }
}

// clear controls
UI.prototype.clearControls = function () {
    const title = document.getElementById('title').value = '';
    const instructor = document.getElementById('instructor').value = '';
    const image = document.getElementById('image').value = '';
}

// delete item 
UI.prototype.deleteCourse = function (e) {
    if (e.classList.contains('delete')) { // Eğer dönen elementin class listesinde 'delete' classı varsa bu satırı sil.
        e.parentElement.parentElement.remove();
        ui.showAlert("Kurs başarıyla silindi..", 'warning');
    }
}


/// Submit edildiğinde ekleme yapan fonksiyon..
window.document.getElementById('kurs-form').addEventListener('submit', function (e) {
    // formdaki bilgileri al 
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;


    // Bilgilerden Object oluştur
    let courseObj = new Course(title, instructor, image);

    // create ui object
    let uiObj = new UI();
    // Boş bilgi olup olmadığını kontrol et .
    if (title == '' || instructor == '' || image == '') {
        uiObj.showAlert('Formu eksik doldurdunuz!', 'warning');
    }
    else {
        // add course to list 
        try {
            uiObj.addCourseToList(courseObj);
        }
        catch (e) {
            let err = new Error('Error when trying to add an item to list!');
            console.log(err);
        }

        // Clear controls.
        try {
            uiObj.clearControls();
        } catch (e) {
            let err = new Error('Error when trying to clear controls!');
            console.log(err);
        }


    }
    console.log(courseObj);  // debug
    e.preventDefault(); // Butona tıklandığında sayfanın yukarı atılması engellensin.
});

// Tıklanan kursu silen fonksiyon.
window.document.getElementById('course-list').addEventListener('click', function (e) {
    let uiObj = new UI();
    uiObj.deleteCourse(e.target);
    e.preventDefault();
});
