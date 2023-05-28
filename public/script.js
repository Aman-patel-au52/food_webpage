const localStorageUserKey = "food_app_login_data";

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
  });
  // .then((response) => response.json());
  const jsonResponse = await response.json();
  console.log("jsondata", jsonResponse);

  if (jsonResponse?.status) {
    const userId = jsonResponse?.data?.userId || "";

    if (userId) {
      localStorage.setItem(localStorageUserKey, userId);
    }

    window.location = "/index.html";
  } else {
    const errorMessage = jsonResponse?.message;
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
    body: JSON.stringify({ firstname, lastname, email, password }),
  });
  const jsondata = await response.json();
  // .then((response) => response.json());
  if (password !== confirmPassword) {
    const errorMessage = response?.message;
    const errorTag = document.getElementById("password-error");
    errorTag.innerText = errorMessage;
    errorTag.style.display = "inline";
  }

  if (jsondata?.status) {
    window.location = "/signin.html";
  } else {
    const errorMessage = jsondata?.message;
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
      const {
        productDescription,
        productImage,
        productName,
        productPrice,
        productId,
      } = response?.data[index];
      htmlTags = `${htmlTags} 
        <div class="card" style="width: 18rem;">
        <img src=${productImage[0]} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${productName}y</h5>
            <p class="card-text">${productDescription}</p>
            <h5 class="card-text">${productPrice}</h5>
            <a href="#" class="btn btn-success" onclick="createOrder('${productId}', ${productPrice})" id="buy">Buy</a>
        </div>
    </div>
        `;
    }
    const parentDiv = document.getElementById("menu-cards");
    parentDiv.innerHTML = htmlTags;
  }
}

async function createOrder(productId, orderPrice) {
  const userId = getUserIdFromLocalStorage();
  if (userId) {
    const fields = {
      totalItem: 1,
      userId,
      productId,
      orderPrice,
    };
    const response = await fetch("/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const jsondata = await response.json();

    if (jsondata?.status) {
      window.location = "/myorder.html";
    } else {
      // const errorMessage = jsondata?.message;
      // const errorTag = document.getElementById("signup-error");
      // errorTag.innerText = errorMessage;
      // errorTag.style.display = "inline";
    }
  }
}

// order
async function showMyOrder(userId) {
  const response = await fetch(`/order/list/${userId}/10/1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => await response.json());

  if (response?.data?.length) {
    let htmlTags = "";
    for (let index = 0; index < response?.data?.length; index++) {
      const { orderPrice, totalItem, productId } = response?.data[index];

      const res = await fetch(`/product/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => await res.json());

      console.log("response", res);

      const productName = res?.data?.productName || "nnn";

      htmlTags = `${htmlTags} 
      <div class="list_details">
      <h2>${productName}</h2>
      <h2>${totalItem}</h2>
      <h2>${orderPrice}</h2>
  </div>
        `;
    }
    const parentDiv = document.getElementById("my-orders");
    parentDiv.innerHTML = htmlTags;
  }
}

const getUserIdFromLocalStorage = () => {
  return localStorage.getItem(localStorageUserKey);
};

const logout = () => {
  localStorage.removeItem(localStorageUserKey);
  window.location = "/signin.html";
};

async function addProduct() {
  const userId = getUserIdFromLocalStorage();
  if (userId) {
    const fields = {
      totalItem: 10,
      userId,
    };
    const products = document.getElementsByClassName("addProduct");
    for (let i = 0; i < products.length; i++) {
      const name = products[i].name;
      const value = products[i].value;
      if (name === "productImage") {
        fields[name] = value.split(",");
      } else {
        fields[name] = value;
      }
    }
    const response = await fetch("/product/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const jsondata = await response.json();

    if (jsondata?.status) {
      window.location = "/menu.html";
    } else {
      // const errorMessage = jsondata?.message;
      // const errorTag = document.getElementById("signup-error");
      // errorTag.innerText = errorMessage;
      // errorTag.style.display = "inline";
    }
  }
}

// // append menu product cards to my orders
// const buy = document.getElementById("buy");
// buy.addEventListener("click", () => {});

function homeOnLoad() {
  const userId = getUserIdFromLocalStorage();
  if (userId) {
    document.getElementById("user-section").style.display = "none";
    document.getElementById("user-section-logout").style.display = "inline";
  }
  showProducts();
}

function homeLoadMyOrder() {
  const userId = getUserIdFromLocalStorage();
  if (userId) {
    document.getElementById("user-section").style.display = "none";
    document.getElementById("user-section-logout").style.display = "inline";
  }
  showMyOrder(userId);
}
