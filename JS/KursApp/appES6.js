console.log("appES6.js çalışıyor..")

class Course {
    constructor(title, instructor, image) {
        this.courseId = Math.floor(Math.random() * 10000); // db'den gelecek normalinde..
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}
class UI {
    // Bilgi mesajı veren fonksiyon
    showAlert(message, alertClass) {
        var alertHtml = `
        <div class="alert alert-${alertClass}">
            ${message}
        </div>
        `;
        var rowElement = document.querySelector('.row');
        // 'beforeBegin' , 'beforeEnd' , 'afterBegin', 'afterEnd'
        rowElement.insertAdjacentHTML('beforeBegin', alertHtml);

        setTimeout(() => {
            window.document.querySelector('.alert').remove();
        }, 2000);
    }
    // formu kurs listesine ekleme
    addCourseToList(course) {
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
                <a href="#" data-id='${course.courseId}' class="btn btn-danger btn-sm delete"> Delete </a>
            </td>
        </tr>
        `;
            course_list.innerHTML += html;

        } catch (e) {
            console.log("err:displayCourses from LS before add");
        }
    }
    // Formu temizleyen fonksiyon
    clearControls() {
        const title = document.getElementById('title').value = '';
        const instructor = document.getElementById('instructor').value = '';
        const image = document.getElementById('image').value = '';
    }
    // kurs listesinden kurs silme fonksiyonu
    deleteCourse(e) {
        if (e.classList.contains('delete')) { // Eğer dönen elementin class listesinde 'delete' classı varsa bu satırı sil.
            e.parentElement.parentElement.remove();
            this.showAlert("Kurs başarıyla silindi..", 'danger');
            return true;
        }
    }
}

// Bilgilerin LS'e alındığı,saklandığı ve silindiği class
class Storage {
    static getCourses() {
        let courses;
        if (localStorage.getItem('courses') === null) {
            courses = [];
        }
        else {
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        console.log('LS: Get Courses Running...:',courses);
        return courses;
    }
    static displayCourses() {
        const courses = Storage.getCourses();
        const ui = new UI();
        courses.forEach(course => {
            ui.addCourseToList(course);
        });
        console.log("LS: Display Course Running..");//debug
    }

    static addCourse(course) {
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
        console.log('LS: Add Course Running..') ;// debug
    }
    static deleteCourse(e) {
        if (e.classList.contains('delete')) {

            let id = e.getAttribute('data-id'); // Element'in id degerini al

            const courses = Storage.getCourses();

            courses.forEach((course, index) => {
                if (course.courseId == id) {
                    courses.splice(index, 1)
                }
            });

            localStorage.setItem('courses',JSON.stringify(courses));
            console.log("LS: Delete Course Running..."); // debug
        }

    }

}

// DOM yüklendiği anda
document.addEventListener('DOMContentLoaded', Storage.displayCourses);

/// Submit edildiğinde ekleme yapan fonksiyon..
window.document.getElementById('kurs-form').addEventListener('submit', function (e) {
    // formdaki bilgileri al 
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;


    // Bilgilerden Object oluştur
    let courseObj = new Course(title, instructor, image);
    console.log("Course Obj:",courseObj) // debug
    // create ui object
    let uiObj = new UI();

    // Boş bilgi olup olmadığını kontrol et .
    if (title == '' || instructor == '' || image == '') {
        uiObj.showAlert('Formu eksik doldurdunuz!', 'warning');
    }

    else {
        // add course to list 
        try{
        uiObj.addCourseToList(courseObj);
        Storage.addCourse(courseObj); // Save to LS 
        uiObj.showAlert("Kurs başarıyla eklendi...", "success");
        }
        catch(e)
        {
            console.log("Eklemede Hata!");
        }

        // Clear controls.
        uiObj.clearControls();
    }
    console.log(courseObj);  // debug
    e.preventDefault(); // Butona tıklandığında sayfanın yukarı atılması engellensin.
});

// Tıklanan kursu silen fonksiyon.
window.document.getElementById('course-list').addEventListener('click', function (e) {
    let uiObj = new UI();

    if(uiObj.deleteCourse(e.target)){
    // delete from LS
    Storage.deleteCourse(e.target);
    }
    e.preventDefault();
});
