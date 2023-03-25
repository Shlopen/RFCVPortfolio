// --- Text fade in

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
            if(entry.isIntersecting){
                entry.target.classList.add('show');
            }else{
                entry.target.classList.remove('show');
            }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// ------

//-- CV Card Animation
$("#cv-card-tech").click(function(event){
    if($("#cv-card-tech-content").hasClass("invis")){
        $("#cv-card-tech-content").slideDown("0.5");
        $("#cv-card-tech-content").removeClass("invis");
    }else{
        $("#cv-card-tech-content").slideUp("0.5");
        $("#cv-card-tech-content").addClass("invis");
    }
});
$("#cv-card-certf").click(function(event){
    if($("#cv-card-certf-content").hasClass("invis")){
        $("#cv-card-certf-content").slideDown("0.5");
        $("#cv-card-certf-content").removeClass("invis");
    }else{
        $("#cv-card-certf-content").slideUp("0.5");
        $("#cv-card-certf-content").addClass("invis");
    }
});