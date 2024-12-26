// Variables
const carouselImages = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
const leftBtn = document.querySelector('.carousel-btn.left');
const rightBtn = document.querySelector('.carousel-btn.right');

let index = 0; // Índice inicial
let isReversing = false; // Indica si el carrusel está en modo reversa
const intervalTime = 3500; // Tiempo de cambio automático

// Función para cambiar la imagen
function changeImage(direction = null) {
    if (direction) {
        // Cambio manual usando botones
        isReversing = direction === 'left'; // Cambia la dirección según el botón presionado
        index = direction === 'left' ? index - 1 : index + 1;
    } else {
        // Cambio automático
        if (isReversing) {
            index--; // Retroceder
            if (index <= 0) {
                isReversing = false; // Cambiar a avanzar cuando llega al inicio
            }
        } else {
            index++; // Avanzar
            if (index >= images.length - 1) {
                isReversing = true; // Cambiar a retroceder cuando llega al final
            }
        }
    }

    // Asegurarse de que el índice esté dentro de los límites
    if (index < 0) {
        index = 0;
    } else if (index >= images.length) {
        index = images.length - 1;
    }

    carouselImages.style.transform = `translateX(-${index * 100}%)`;
}

// Eventos para las flechas
leftBtn.addEventListener('click', () => changeImage('left'));
rightBtn.addEventListener('click', () => changeImage('right'));

// Movimiento automático
let autoMove = setInterval(() => changeImage(), intervalTime);

// Detener y reiniciar el carrusel al interactuar con el mouse
document.querySelector('.carousel').addEventListener('mouseover', () => clearInterval(autoMove));
document.querySelector('.carousel').addEventListener('mouseout', () => {
    autoMove = setInterval(() => changeImage(), intervalTime);
});

// Funcionalidad de arrastre
let isDragging = false;
let startPos = 0;

carouselImages.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPos = e.clientX;
    clearInterval(autoMove);
});

carouselImages.addEventListener('mouseup', () => {
    isDragging = false;
    autoMove = setInterval(() => changeImage(), intervalTime);
});

carouselImages.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const moveBy = e.clientX - startPos;
    if (moveBy > 100) {
        changeImage('left');
        isDragging = false;
    } else if (moveBy < -100) {
        changeImage('right');
        isDragging = false;
    }
});


//SCROLL AREA | MISION , VISION Y VALORES

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".scroll-item");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
          }
        });
      },
      {
        threshold: 0.3,
      }
    );
  
    items.forEach((item) => {
      observer.observe(item);
    });
  });
  


  document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".scroll-item");
    const titles = document.querySelectorAll(".text h2");
    const paragraphs = document.querySelectorAll(".text p");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = "running";
                    
                    // Activar animación de títulos
                    if (entry.target.querySelector("h2")) {
                        const title = entry.target.querySelector("h2");
                        title.querySelectorAll("span").forEach((letter, index) => {
                            letter.style.setProperty("--index", index);
                        });
                    }

                    // Activar animación de párrafos
                    if (entry.target.querySelector("p")) {
                        entry.target.querySelector("p").style.animationPlayState = "running";
                    }
                }
            });
        },
        {
            threshold: 0.3,
        }
    );

    items.forEach((item) => {
        observer.observe(item);
    });

    titles.forEach((title) => {
        const text = title.textContent;
        title.innerHTML = "";
        text.split("").forEach((letter) => {
            const span = document.createElement("span");
            span.textContent = letter;
            title.appendChild(span);
        });
    });
});



