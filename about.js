
const REPO = "Viktoria-Kiyashko/web-coder-portfolio";
const BRANCH = "main";

const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalImages = document.getElementById("modalImages");
const modalText = document.getElementById("modalText");
const cmsContainer = document.getElementById("cms-posts");

const categories = {
  personal: "Личное",
  study: "Учёба",
  work: "Работа",
  "3d": "3D",
  web: "Веб-разработка"
};

function closeModal() {
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

function openModal({ title, images = [], content, isHtml = false }) {
  modalTitle.textContent = title;
  modalImages.replaceChildren();

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = title;
    modalImages.appendChild(img);
  });

  if (isHtml) {
    modalText.innerHTML = DOMPurify.sanitize(
      marked.parse(content)
    );
  } else {
    modalText.textContent = content;
  }

  modal.classList.add("active");
  document.body.classList.add("modal-open");
}


document.querySelectorAll(".post").forEach(post => {
  post.addEventListener("click", () => {
    const tags = Array.from(
      post.querySelectorAll(".tag")
    ).map(tag => tag.textContent).join(" ");

    const images = Array.from(
      post.querySelectorAll("img")
    ).map(img => img.src);

    openModal({
      title: tags,
      images,
      content: post.querySelector("p")?.textContent || ""
    });
  });
});


function parsePost(markdown) {
  const match = markdown.match(
    /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)([\s\S]*)/
  );

  if (!match) {
    throw new Error("Неверный формат публикации");
  }

  const metadata = jsyaml.load(match[1]);

  return {
...metadata,
    date: metadata.date instanceof Date
      ? metadata.date.toISOString().slice(0, 10)
      : String(metadata.date || ""),
    body: match[2].trim()
  };
}

function createPostCard(post) {
  const article = document.createElement("article");
  article.className = "post";

  const header = document.createElement("div");
  header.className = "post-header";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = "#" + (
    categories[post.category] || post.category || "blog"
  );
  header.appendChild(tag);

  const title = document.createElement("h3");
  title.className = "post-title";
  title.textContent = post.title || "Без названия";

  const date = document.createElement("time");
  date.className = "post-date";
  date.textContent = post.date || "";

  article.append(header, title, date);

  if (post.cover) {
    const image = document.createElement("img");
    image.className = "cms-cover";
    image.src = post.cover;
    image.alt = post.title || "";
    image.loading = "lazy";
    article.appendChild(image);
  }

  const description = document.createElement("p");

  description.textContent =
    post.description ||
    post.body.replace(/[#*_[\]`]/g, "").slice(0, 180) + "...";

  article.appendChild(description);

  article.addEventListener("click", () => {
    openModal({
      title: post.title,
      images: post.cover ? [post.cover] : [],
      content: post.body,
      isHtml: true
    });
  });

  return article;
}


async function loadCmsPosts() {
  try {
    const response = await fetch(
      "/web-coder-portfolio/posts.json"
    );

    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }

    const posts = await response.json();

    cmsContainer.replaceChildren();

    posts.forEach(post => {
      cmsContainer.appendChild(createPostCard(post));
    });

    console.log(`Загружено публикаций: ${posts.length}`);

  } catch (error) {
    console.error("Не удалось загрузить блог:", error);
  }
}





// Закрытие модального окна
modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

// Загрузка публикаций из CMS
loadCmsPosts();
