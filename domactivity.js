document.addEventListener("DOMContentLoaded", function () {
   const paintings = JSON.parse(content);
   const paintingList = document.querySelector("#paintings ul");
   const figure = document.querySelector("#details figure");
   const title = document.querySelector("#title");
   const artist = document.querySelector("#artist");
   const description = document.querySelector("#description");

   paintings.forEach(function (painting) {
      const listItem = document.createElement("li");
      const thumbnail = document.createElement("img");

      thumbnail.src = `images/small/${painting.id}.jpg`;
      thumbnail.alt = painting.title;
      thumbnail.dataset.id = painting.id;

      listItem.appendChild(thumbnail);
      paintingList.appendChild(listItem);
   });

   paintingList.addEventListener("click", function (event) {
      const thumbnail = event.target.closest("img[data-id]");

      if (!thumbnail || !paintingList.contains(thumbnail)) {
         return;
      }

      const painting = paintings.find(function (item) {
         return item.id === thumbnail.dataset.id;
      });

      if (!painting) {
         return;
      }

      figure.innerHTML = "";
      description.textContent = "";
      title.textContent = painting.title;
      artist.textContent = painting.artist;

      const fullImage = document.createElement("img");
      fullImage.id = "full";
      fullImage.src = `images/large/${painting.id}.jpg`;
      fullImage.alt = painting.title;
      figure.appendChild(fullImage);

      painting.features.forEach(function (feature) {
         const box = document.createElement("div");
         const left = feature.upperLeft[0];
         const top = feature.upperLeft[1];

         box.className = "box";
         box.style.position = "absolute";
         box.style.left = `${left}px`;
         box.style.top = `${top}px`;
         box.style.width = `${feature.lowerRight[0] - left}px`;
         box.style.height = `${feature.lowerRight[1] - top}px`;

         box.addEventListener("mouseover", function () {
            description.textContent = feature.description;
         });

         box.addEventListener("mouseout", function () {
            description.textContent = "";
         });

         figure.appendChild(box);
      });
   });
});
