document.addEventListener("DOMContentLoaded", startApp);

function startApp(){
    const mainForm = document.querySelectorAll('.needs-validation')[0];
    mainForm.addEventListener('submit', event => {
       
       if(mainForm.checkValidity() === false){
           event.preventDefault();
           event.stopPropagation();
       }
       mainForm.classList.add('was-validated');
   });

   const modalForm = document.querySelectorAll('.needs-validation')[1];
   modalForm.addEventListener('submit', event => {
       if(modalForm.checkValidity() === false){
           event.preventDefault();
           event.stopPropagation();
       }
       modalForm.classList.add('was-validated');
   });
}

