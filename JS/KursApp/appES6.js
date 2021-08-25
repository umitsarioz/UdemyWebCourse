window.document.getElementById('kurs-form').addEventListener('submit',e => {   
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    e.preventDefault(); // Butona tıklandığında sayfanın yukarı atılması engellensin.
});