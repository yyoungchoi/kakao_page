// header
document.querySelectorAll(".local-nav li").forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    item.classList.add("black");
    document.querySelectorAll(".local-nav li").forEach(function (sibling) {
      if (sibling !== item && sibling.classList.contains("black")) {
        sibling.classList.remove("black");
      }
    });
  });
});

document.querySelectorAll(".gnb-area li").forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    item.classList.add("on");
    document.querySelectorAll(".gnb-area li").forEach(function (sibling) {
      if (sibling !== item && sibling.classList.contains("on")) {
        sibling.classList.remove("on");
      }
    });
  });
});

// main

const millionSlide = new Swiper(".sc-million .swiper", {
  loop: false,
  slidesPerView: 9.5,
  spaceBetween: 4,
  navigation: {
    prevEl: ".prev",
    nextEl: ".next",
  },
});

const waitFreeEl = `<img src="./asset/images/waitfree.svg" alt="기다리면무료뱃지" class="waitfree" />`;
const waitEl = `<img src="./asset/images/waiting.svg" alt="3다무뱃지" class="wait" />`;
const upEl = `<img src="./asset/images/up.svg" alt="회차업데이트뱃지" class="up" />`;
const newEl = `<img src="./asset/images/new.svg" alt="신작뱃지" class="new">`;
const age15El = `<div class="badge-box-r">
<img src="./asset/images/age15.svg" alt="15세뱃지" class="age15"></div>`;
const age19El = `<div class="badge-box-r"><img src="./asset/images/age19.svg" alt="19세뱃지" class="age19"></div>`;
const rankMaintainEl = `<img src="./asset/images/rank-maintain.svg" alt="유지" />`;
const novelEl = `<div class="badge-box-b">
<img src="./asset/images/novel-badge.svg" alt="웹소설뱃지">
</div>`;
const rankUpEl = `<img src="./asset/images/rank-up.svg" alt="상승" />`;
const rankDownEl = `<img src="./asset/images/rank-down.svg" alt="하락" />`;

const publishFreeEl = `<img src="./asset/images/publish-free.svg" alt="연재무료뱃지" class="publish-free" />`;
const eventEl = `<img src="./asset/images/event.svg" alt="이벤트뱃지" class="event" />`;
const detailEl = `<div class="detail"><img src="./asset/images/waiting.svg" alt="3다무" class="wait" /> <div class="detail-text"></div></div>`;

// mainSlide
fetch("./asset/data/data.json")
  .then((res) => res.json())
  .then((json) => {
    data = json.mainSlideList;
    let html = ``;
    data.forEach((el) => {
      isWaitFree = el.waitFree ? waitFreeEl : "";
      isWait = el.wait ? waitEl : "";
      isEvent = el.event ? eventEl : "";
      isUp = el.up ? upEl : "";
      isNew = el.new ? newEl : "";

      html += `
      <div class="swiper-slide">
        <a href="">
          <div class="thumb-area">
            <img src="${el.thumbnail}" alt/>
          </div>
          <div class="text-area">
            <img class="title-img" src="${el.titleThumbnail}" alt="${el.title}" />
            <p class="">${el.desc}</p>
            <div class="detail">
              ${isWait}${isEvent}${isWaitFree}
              <div class="detail-text">
              ${el.detail.category ? `<span>${el.detail.category}</span>` : ""}
              ${el.detail.category && el.detail.genre ? `<img src="./asset/images/dot.svg" alt="구분점" />` : ""}
              ${el.detail.genre ? `<span>${el.detail.genre}</span>` : ""}
              ${el.detail.genre && el.detail.view ? `<img src="./asset/images/dot.svg" alt="구분점" />` : ""}
              ${el.detail.view ? `<span>${viewNumFormat(el.detail.view)}</span>` : ""}
              </div>
            </div>
          </div>
        </a>
      </div>`;
    });
    $("#mainSlideList").html(html);

    const mainSlide = new Swiper(".sc-visual .swiper", {
      loop: true,
      autoplay: {
        delay: 3000,
      },
      centeredSlides: true,
      spaceBetween: 3,
      slidesPerView: 2,
      navigation: {
        prevEl: ".prev",
        nextEl: ".next",
      },
      pagination: {
        el: ".pagination",
        type: "fraction",
      },
    });
  });

// shortcutList
fetch("./asset/data/data.json")
  .then((res) => res.json())
  .then((json) => {
    data = json.shortcutList;
    let html = ``;
    data.forEach((el) => {
      isWaitFree = el.waitFree ? waitFreeEl : "";
      isWait = el.wait ? waitEl : "";
      isEvent = el.event ? eventEl : "";
      isUp = el.up ? upEl : "";
      isNew = el.new ? newEl : "";
      novelIcon = el.novel ? novelEl : "";

      html += `
      <a href="" class="shortcut-item">
      <div class="thumb-wrap">
        <div class="badge-box">
        ${isWait}${isEvent}${isWaitFree}${isUp}
        </div>
        ${novelIcon}
        <img src="${el.thumbnail}" alt />
        <div class="title-box">
          <img src="${el.titleThumbnail}" alt="${el.title}" class="title-img" />
          <p class="text">${formatText(el.text)}</p>
        </div>
      </div>
    </a>`;
    });
    $("#shortcutList").html(html);
  });

function formatText(text) {
  if (typeof text === "number") {
    return viewNumFormat(text);
  } else {
    return text;
  }
}

// millionList
fetch("./asset/data/data.json")
  .then((res) => res.json())
  .then((json) => {
    data = json.millionList;
    let html = ``;
    data.forEach((el) => {
      isWaitFree = el.waitFree ? waitFreeEl : "";
      isWait = el.wait ? waitEl : "";
      isUp = el.up ? upEl : "";
      isNew = el.new ? newEl : "";
      html += `
      <div class="swiper-slide">
      <a href="">
        <div class="thumb-area">
        <div class="badge-box">
        ${isWaitFree}${isWait}${isUp}${isNew}
        </div>
          <img src="${el.thumbnail}" alt class="thumb"/>
        </div>
        <div class="title-area">
          <p class="title">${el.title}</p>
          <p class="type">${el.category}</p>
        </div>
      </a>
    </div>`;
    });
    $("#millionList").html(html);
  });

// contentsList
function contentList(idx, frame) {
  fetch("./asset/data/data.json")
    .then((res) => res.json())
    .then((json) => {
      dataArr = [
        json.waitWebtoonList,
        json.waitnovelList,
        json.actionWebtoonList,
        json.fantasyNovelList,
        json.dramaWebtoonList,
        json.roroFanNovelList,
        json.romanceWebtoonList,
        json.newNovelList,
        json.publishFreeList,
      ];
      data = dataArr[idx];
      let html = ``;
      data.forEach((el) => {
        isWaitFree = el.waitFree ? waitFreeEl : "";
        isWait = el.wait ? waitEl : "";
        isUp = el.up ? upEl : "";
        isNew = el.new ? newEl : "";
        publishFree = el.publish ? publishFreeEl : "";
        ageIcon = el.age === 19 ? age19El : el.age === 15 ? age15El : "";
        novelIcon = el.novel ? novelEl : "";

        html += `
        <a href="" class="content-item">
        <div class="thumb-wrap">
          <img src="${el.thumbnail}" alt />
          <div class="badge-box">
          ${isWaitFree}${isWait}${publishFree}
          ${isUp}${isNew}
          </div>
          ${ageIcon}${novelIcon}
          <div class="title-box">
            <img src="${el.titleThumbnail}" alt="${el.title}" class="title-img" />
            <p class="view">${viewNumFormat(el.view)}
            </p>
          </div>
        </div>
      </a>`;
      });
      $(frame).html(html);
    });
}
contentList(0, "#waitWebtoonList");
contentList(1, "#waitnovelList");
contentList(2, "#actionWebtoonList");
contentList(3, "#fantasyNovelList");
contentList(4, "#dramaWebtoonList");
contentList(5, "#roroFanNovelList");
contentList(6, "#romanceWebtoonList");
contentList(7, "#newNovelList");
contentList(8, "#publishFreeList");

// top300List
function chartList(idx, frame) {
  fetch("./asset/data/data.json")
    .then((res) => res.json())
    .then((json) => {
      dataArr = [json.top300WebtoonList, json.top300NovelList];
      data = dataArr[idx];
      // data = json.top300WebtoonList;
      let html = ``;
      data.forEach((el) => {
        isWaitFree = el.waitFree ? waitFreeEl : "";
        isWait = el.wait ? waitEl : "";
        isUp = el.up ? upEl : "";
        isNew = el.new ? newEl : "";
        ageIcon = el.age === 19 ? age19El : el.age === 15 ? age15El : "";
        rankData = el.ranking.up ? rankUpEl + el.ranking.up : el.ranking.down ? rankDownEl + el.ranking.down : rankMaintainEl;

        html += `<a href="" class="content-item">
    <div class="thumb-wrap">
      <img src="${el.thumbnail}" alt />
      <div class="badge-box">
      ${isWait}${isWaitFree}${isUp}${isNew}
        </div>
        ${ageIcon}
      <div class="title-box">
        <img src="${el.titleThumbnail}" alt="${el.title}" class="title-img" />
        <div class="status">
          <div class="rank">${el.ranking.curr}</div>
          <div class="state-data">
          ${rankData}
          </div>
        </div>
      </div>
    </div>
  </a>`;
      });
      $(frame).html(html);
    });
}
chartList(0, "#top300WebtoonList");
chartList(1, "#top300NovelList");

// eventList
fetch("./asset/data/data.json")
  .then((res) => res.json())
  .then((json) => {
    data = json.eventList;
    let html = ``;
    data.forEach((el) => {
      isWaitFree = el.waitFree ? waitFreeEl : "";
      isWait = el.wait ? waitEl : "";
      isUp = el.up ? upEl : "";
      isNew = el.new ? newEl : "";
      html += `
      <a href="" class="content-item">
      <div class="thumb-wrap">
      <img src="${el.thumbnail}" alt class="thumb"/>
        <div class="badge-box">
          <img src="./asset/images/event.svg" alt="이벤트뱃지" class="event" />
        </div>
        <div class="title-box">
          <img src="${el.titleThumbnail}" alt="${el.title}" class="title-img" />
          <p class="view">${el.desc}</p>
        </div>
      </div>
    </a>`;
    });
    $("#eventList").html(html);
  });

function viewNumFormat(num) {
  let unit = "";
  if (num >= 100000000) {
    unit = "억";
    num /= 100000000; //num = num / 100000000;
  } else if (num >= 10000) {
    unit = "만";
    num /= 10000; //num = num / 10000
  }

  const result = new Intl.NumberFormat("ko-KR", {
    //locale
    style: "decimal", //(천 단위마다 쉼표로 구분/ 정수,소수로 구분 )
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(num);

  return result + unit;
}
