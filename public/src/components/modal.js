document.addEventListener("DOMContentLoaded", function(){

    var modal = document.getElementById('simple-modal');
    var modalBtn = document.getElementById('modal-button');
    var closeBtn = document.getElementsByClassName('close-button')[0];

    modalBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);


    function openModal(){
    modal.style.display = 'block';
    }

    function closeModal(){
        modal.style.display = 'none';
    }

    function outsideClick(e){
    if(e.target == modal){
        modal.style.display = 'none';
    }
    }
});
