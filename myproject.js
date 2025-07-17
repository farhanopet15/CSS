let globalIndex = null;

let name = document.getElementById("name");

let startDate = document.getElementById("startDate");

let endDate = document.getElementById("endDate");

let description = document.getElementById("description");

let tech1 = document.getElementById("tech1");

let tech2 = document.getElementById("tech2");

let tech3 = document.getElementById("tech3");

let tech4 = document.getElementById("tech4");

let image = document.getElementById("image");

let addButton = document.getElementById("add");

let nameEdit = document.getElementById("nameEdit");

let startDateEdit = document.getElementById("startDateEdit");

let endDateEdit = document.getElementById("endDateEdit");

let descriptionEdit = document.getElementById("descriptionEdit");

let tech1Edit = document.getElementById("tech1Edit");

let tech2Edit = document.getElementById("tech2Edit");

let tech3Edit = document.getElementById("tech3Edit");

let tech4Edit = document.getElementById("tech4Edit");

let imageEdit = document.getElementById("imageEdit");

let thumbnailEditImageUrl = null;

let thumbnailEditImage = document.querySelector(".thumbnailEditImage");

let thumbnailEdit = document.querySelector(".thumbnailEdit");

let removeThumbnailEdit = document.querySelector(".removeThumbnailEdit");

let editButton = document.getElementById("edit");

function setLocalStorage(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}

function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

function countDuration(startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) {
    return "Tanggal tidak valid";
  }

  if (end < start) {
    return "Tanggal akhir harus setelah tanggal mulai";
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  let parts = [];
  if (years > 0) parts.push(`${years} tahun`);
  if (months > 0) parts.push(`${months} bulan`);
  if (days > 0) parts.push(`${days} hari`);
  if (parts.length === 0) return "0 hari";

  return parts.join(" ");
}

function objectUrlToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

function renderElement() {
  let card = "";

  for (let i = 0; i < myProject.length; i++) {
    const e = myProject[i];
    card += `<div class="card">
              <div class="cardImage" style="background-image: url(${e.image});"></div>
              <div class="cardTitle">${e.name}</div>
              <p class="cardDuration">Durasi: ${countDuration(e.startDate, e.endDate)}</p>
              <p class="cardDesc">${e.description}</p>
              <div class="cardIcon"></div>
              <div class="cardButton">
                <button class="cardEdit">edit</button>
                <button class="cardDelete">delete</button>
              </div>
            </div>`;
  }

  cardsElement.innerHTML = card;

  const icons = [
    { name: "Node JS", imageUrl: "https://img.icons8.com/?size=100&id=54087&format=png&color=000000" },
    { name: "React JS", imageUrl: "https://img.icons8.com/?size=100&id=Ax6abTiOhdzW&format=png&color=000000" },
    { name: "Next JS", imageUrl: "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000" },
    { name: "Typescript", imageUrl: "https://img.icons8.com/?size=100&id=uJM6fQYqDaZK&format=png&color=000000" },
  ];

  let cardIcon = document.getElementsByClassName("cardIcon");

  for (let i = 0; i < myProject.length; i++) {
    const x = myProject[i];
    let icon = "";

    if (x.tech1) icon += `<img src="${icons[0].imageUrl}" alt="icon ${icons[0].name}" class="icon">`;
    if (x.tech2) icon += `<img src="${icons[1].imageUrl}" alt="icon ${icons[1].name}" class="icon">`;
    if (x.tech3) icon += `<img src="${icons[2].imageUrl}" alt="icon ${icons[2].name}" class="icon">`;
    if (x.tech4) icon += `<img src="${icons[3].imageUrl}" alt="icon ${icons[3].name}" class="icon">`;

    cardIcon[i].innerHTML = icon;
  }

  function formatTanggal(tanggal) {
    const bulanIndo = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const [tahun, bulan, hari] = tanggal.split("-");
    return `${parseInt(hari)} ${bulanIndo[parseInt(bulan) - 1]} ${tahun}`;
  }

  let cardElement = document.querySelectorAll(".card");
  let cardEdit = document.querySelectorAll(".cardEdit");
  let cardDelete = document.querySelectorAll(".cardDelete");
  let backLayerDetail = document.querySelector(".backLayerDetail");

  for (let i = 0; i < myProject.length; i++) {
    const e = myProject[i];

    cardElement[i].addEventListener("click", () => {
      backLayerDetail.innerHTML = `<div class="containerDetail">
        <div class="closeDetail"></div>
        <div class="containerDetailContent">
          <h2>${e.name}</h2>
          <div class="propertiesDetail">
            <div class="imageDetail" style="background-image: url(${e.image});"></div>
            <div class="textDetail">
              <div class="durationDetail">
                <b class="durationTitle">Duration</b>
                <div class="durationDate">
                  <span class="iconDate"></span><span>${formatTanggal(e.startDate)} - ${formatTanggal(e.endDate)}</span>
                </div>
                <div class="durationCount">
                  <span class="iconDuration"></span><span>${countDuration(e.startDate, e.endDate)}</span>
                </div>
              </div>
              <div class="durationDetail">
                <b class="durationTitle">Technologies</b>
                <div class="durationTech">
                  ${e.tech1 ? `
                    <div class="iconTech">
                      <span class="iconTechDetail" style="content: url(${icons[0].imageUrl})"></span>
                      <span>${icons[0].name}</span>
                    </div>` : ''}
                  ${e.tech2 ? `
                    <div class="iconTech">
                      <span class="iconTechDetail" style="content: url(${icons[1].imageUrl})"></span>
                      <span>${icons[1].name}</span>
                    </div>` : ''}
                  ${e.tech3 ? `
                    <div class="iconTech">
                      <span class="iconTechDetail" style="content: url(${icons[2].imageUrl})"></span>
                      <span>${icons[2].name}</span>
                    </div>` : ''}
                  ${e.tech4 ? `
                    <div class="iconTech">
                      <span class="iconTechDetail" style="content: url(${icons[3].imageUrl})"></span>
                      <span>${icons[3].name}</span>
                    </div>` : ''}
                </div>
              </div>
            </div>
          </div>
          <p class="descDetail">${e.description}</p>
        </div>
      </div>`;

      backLayerDetail.classList.add("show");
      backLayerDetail.classList.remove("hide");

      let closeDetail = document.querySelector(".closeDetail");
      closeDetail.addEventListener("click", () => {
        backLayerDetail.classList.remove("show");
        backLayerDetail.classList.add("hide");
      });
    });

    cardEdit[i].addEventListener("click", (el) => {
      el.stopPropagation();
      backLayerEdit.classList.remove("hide");
      backLayerEdit.classList.add("show");

      nameEdit.value = e.name;
      startDateEdit.value = e.startDate;
      endDateEdit.value = e.endDate;
      descriptionEdit.value = e.description;
      tech1Edit.checked = e.tech1;
      tech2Edit.checked = e.tech2;
      tech3Edit.checked = e.tech3;
      tech4Edit.checked = e.tech4;
      thumbnailEditImageUrl = e.image;

      if (thumbnailEditImage) {
        thumbnailEditImage.style.backgroundImage = `url(${thumbnailEditImageUrl})`;
      }

      globalIndex = i;
    });

    cardDelete[i].addEventListener("click", (el) => {
      el.stopPropagation();
      let result = confirm("Serius mau di hapus?");
      if (result) {
        myProject.splice(i, 1);
        setLocalStorage("myProject", myProject);
        renderElement();
      }
    });
  }
}

const cardsElement = document.querySelector(".cards");

let myProject = localStorage.getItem("myProject")
  ? getLocalStorage("myProject")
  : [];

renderElement();

addButton.addEventListener("click", async () => {
  let data = {
    name: name.value,
    startDate: startDate.value,
    endDate: endDate.value,
    description: description.value,
    tech1: tech1.checked,
    tech2: tech2.checked,
    tech3: tech3.checked,
    tech4: tech4.checked,
    image: image.files ? await objectUrlToBase64(image.files[0]) : null,
  };

  myProject.push(data);

  setLocalStorage("myProject", myProject);

  name.value = null;
  startDate.value = null;
  endDate.value = null;
  description.value = null;
  tech1.checked = false;
  tech2.checked = false;
  tech3.checked = false;
  tech4.checked = false;
  image.value = null;

  renderElement();
});

const backLayerEdit = document.querySelector(".backLayerEdit");

const closeEdit = document.querySelector(".closeEdit");

closeEdit.addEventListener("click", () => {
  backLayerEdit.classList.remove("show");
  backLayerEdit.classList.add("hide");
});

editButton.addEventListener("click", async () => {
  backLayerEdit.classList.remove("show");
  backLayerEdit.classList.add("hide");

  myProject[globalIndex] = {
    name: nameEdit.value,
    startDate: startDateEdit.value,
    endDate: endDateEdit.value,
    description: descriptionEdit.value,
    tech1: tech1Edit.checked,
    tech2: tech2Edit.checked,
    tech3: tech3Edit.checked,
    tech4: tech4Edit.checked,
    image: thumbnailEditImageUrl
      ? thumbnailEditImageUrl
      : imageEdit.files
      ? await objectUrlToBase64(imageEdit.files[0])
      : null,
  };

  nameEdit.value = null;
  startDateEdit.value = null;
  endDateEdit.value = null;
  descriptionEdit.value = null;
  tech1Edit.checked = false;
  tech2Edit.checked = false;
  tech3Edit.checked = false;
  tech4Edit.checked = false;
  imageEdit.value = null;
  thumbnailEditImageUrl = null;
  globalIndex = null;
  thumbnailEditImage = null;

  setLocalStorage("myProject", myProject);

  renderElement();
});

removeThumbnailEdit.addEventListener("click", () => {
  let result = confirm("Serius mau di hapus?");

  if (result) {
    thumbnailEditImageUrl = null;
    thumbnailEdit.classList.add("hide");
    thumbnailEdit.classList.remove("show");
    imageEdit.classList.add("show");
    imageEdit.classList.remove("hide");
  }
});