const angleDown = document.querySelectorAll(".angle-down");
const contentDiv = document.querySelectorAll(".content-div");

const toggleContent = (index) => {
    contentDiv[index].classList.toggle("active");
   
    angleDown[index].classList.toggle("rotated");
}

for (let i = 0; i < angleDown.length; i++) {
    angleDown[i].addEventListener("click", () => {
        toggleContent(i); 
    });
}