const tabcontent = document.querySelectorAll('.tabcontent');
const topNavLinks = document.querySelectorAll('.topnav-link');
const headers = document.querySelectorAll('.header')
const descriptions = document.querySelectorAll('.description')
const expAllBtns = document.querySelectorAll('.expand-all')
const collAllBtns = document.querySelectorAll('.collapse-all')
const signsEd = document.querySelectorAll('#education .school button')
const signsWh = document.querySelectorAll('#working-history .job button')
const aboutMe = document.querySelectorAll('#about-me p')

let allExpandedEd = false
let allExpandedWh = false

let dur = 5

function openTab(evt, tabName) {
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    for (let i = 0; i < topNavLinks.length; i++) {
        topNavLinks[i].className = topNavLinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    if (tabName === "education" && allExpandedEd) {
        expandAll("btns-ed")
    }
    else if (tabName === "working-history" && allExpandedWh) {
        expandAll("btns-Wh")
    }
}

document.querySelector('#defaultOpen').click();

for (let i = 0; i < headers.length; i++) {
    headers[i].addEventListener("click", function () {
        this.classList.toggle("activeH")
        let desc = this.nextElementSibling

        if (desc.style.maxHeight) {
            desc.style.maxHeight = null
        }
        else {
            desc.style.maxHeight = desc.scrollHeight + "px"
        }
    })
}

for (let i = 0; i < expAllBtns.length; i++) {
    expAllBtns[i].addEventListener("click", function () {
        let parent = expAllBtns[i].parentElement.className

        expandAll(parent)
    })
}

for (let i = 0; i < collAllBtns.length; i++) {
    collAllBtns[i].addEventListener("click", function () {
        let parent = collAllBtns[i].parentElement.className

        collapseAll(parent)
    })
}

function collapseAll(parent) {
    for (let i = 0; i < descriptions.length; i++) {
        descriptions[i].style.maxHeight = null
    }

    if (parent === "btns-ed") {
        for (let i = 0; i < signsEd.length; i++) {
            signsEd[i].classList.remove("activeH")
        }

        allExpandedEd = false
    }
    else {
        for (let i = 0; i < signsWh.length; i++) {
            signsWh[i].classList.remove("activeH")
        }

        allExpandedWh = false
    }
}

function expandAll(parent) {
    for (let i = 0; i < descriptions.length; i++) {
        descriptions[i].style.maxHeight = descriptions[i].scrollHeight + "px"
    }

    if (parent === "btns-ed") {
        for (let i = 0; i < signsEd.length; i++) {
            signsEd[i].classList.add("activeH")
        }

        allExpandedEd = true
    }
    else {
        for (let i = 0; i < signsWh.length; i++) {
            signsWh[i].classList.add("activeH")
        }

        allExpandedWh = true
    }
}

function writingAnimation(index = 0) {
    if (index >= aboutMe.length) return;

    let element = aboutMe[index];
    let text = element.innerText;
    element.innerHTML = "";
    element.style.display = "block"
    let char = 0;

    function typeChar() {
        if (char < text.length) {
            element.innerHTML += text.charAt(char);
            char++;
            setTimeout(typeChar, dur);
        } else {
            writingAnimation(index + 1);
        }
    }

    typeChar();
}

window.addEventListener("load", function () {
    for (i = 0; i < aboutMe.length; i++) {
        aboutMe[i].style.display = "none"
    }

    writingAnimation()
})