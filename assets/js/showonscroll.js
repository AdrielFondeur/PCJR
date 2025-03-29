const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('showscroll');
        } else {
            entry.target.classList.remove('showscroll');
        }
    });
 });
 
 const hiddenElements = document.querySelectorAll('.hiddenscroll');
 hiddenElements.forEach((el) => observer.observe(el));