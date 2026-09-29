import {
  bio,
  skills,
  talks,
  conferences,
  footer,
} from "./user-data/data.js";

function populateBio(items, id) {
  const bioTag = document.getElementById(id);
  items.forEach((bioItem) => {
    const p = getElement("p", null);
    p.innerHTML = bioItem;
    bioTag.append(p);
  });
}

// Turns bare URLs (e.g. DOIs) into clickable links
function linkify(text) {
  return text.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener">$1</a>'
  );
}

// Renders a list of HTML strings; used for publications, talks and conferences
function populateList(items, id) {
  const listTag = document.getElementById(id);
  items.forEach((item) => {
    const li = getElement("li", null);
    li.innerHTML = linkify(item);

    const divProgressWrap = getElement("div", "progress-wrap");
    divProgressWrap.append(li);

    const divAnimateBox = getElement("div", "col-md-12 animate-box");
    divAnimateBox.append(divProgressWrap);

    listTag.append(divAnimateBox);
  });
}

function populateLinks(items, id) {
  let footer = document.getElementById(id);

  items.forEach(function (item) {
    if (item.label !== "copyright-text") {
      let span = document.createElement("span");
      span.className = "col";

      let p = document.createElement("p");
      p.className = "col-title";
      p.innerHTML = item.label;
      span.append(p);

      let nav = document.createElement("nav");
      nav.className = "col-list";

      let ul = document.createElement("ul");
      item.data.forEach(function (data) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        if (data.link) {
          a.href = data.link;
          a.target = "_blank";
        }
        if (data.func) {
          a.setAttribute("onclick", data.func);
        }
        a.innerHTML = data.text;

        li.append(a);
        ul.append(li);
      });
      nav.append(ul);
      span.append(nav);
      footer.append(span);
    }

    if (item.label === "copyright-text") {
      let div = document.createElement("div");
      div.className = "copyright-text no-print";
      item.data.forEach(function (copyright) {
        let p = document.createElement("p");
        p.innerHTML = copyright;
        div.append(p);
      });
      footer.append(div);
    }
  });
}

function getElement(tagName, className) {
  let item = document.createElement(tagName);
  item.className = className;
  return item;
}

populateBio(bio, "bio");
populateList(skills, "skills");
populateList(talks, "talks");
populateList(conferences, "conferences");
populateLinks(footer, "footer");
