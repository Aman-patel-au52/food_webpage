
// signin
async function onClickLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => response.json());
  

  if (response?.status) {
    window.location = "/index.html";
  } else {
    const errorMessage = response?.message;
    const errorTag = document.getElementById("login-error");
    errorTag.innerText = errorMessage;
    errorTag.style.display = "inline";
  }
}


// signup
async function onclicksignup() {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const response = await fetch("/user/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstname , lastname , email, password  }),
  }).then((response) => response.json());

  if(password !== confirmPassword){
    const errorMessage = response?.message;
    const errorTag = document.getElementById("password-error");
    errorTag.innerText = errorMessage;
    errorTag.style.display = "inline";
  }

  if (response?.status) {
    window.location = "/index.html";
  } else {
    const errorMessage = response?.message;
    const errorTag = document.getElementById("signup-error");
    errorTag.innerText = errorMessage;
    errorTag.style.display = "inline";
  }
}


// products
async function showProducts() {
  const response = await fetch("/product/list/10/1", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  if (response?.data?.length) {
    let htmlTags = "";
    for (let index = 0; index < response?.data?.length; index++) {
      const { productDescription, productImage, productName, productPrice } =
        response?.data[index];
      htmlTags = `${htmlTags} 
        <div class="card" style="width: 18rem;">
        <img src=${productImage[0]} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${productName}y</h5>
            <p class="card-text">${productDescription}</p>
        </div>
    </div>
        `;
    }

    const parentDiv = document.getElementById("cards");
    parentDiv.innerHTML = htmlTags;
  }
}

function homeOnLoad() {
  showProducts();
}
