# Tikitoko (Frontend)

<!-- Logo -->
<div align="center">
<img src="./documentation/logo.png" align="center" width="200" height="auto" />
</div>

<!-- Table of Contents -->
## Table of Contents

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setup-env-example">Setup .env example</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#screenshoots">Screenshoots</a></li>
    <li><a href="#related-project">Related Projects</a></li>
    <li><a href="#meet-the-teams">Meet The Teams</a></li>
  </ol>
</details>

<!-- About The Project -->
## About The Project
Tikitoko is an ecommerce app where you can buy and sell things.
You can start by making a new account with the corresponding role- either buyer or seller.
As a buyer, you can keep your stuff in your bag before buying, you can see your account and order details in your profile. As a seller, you can add stuff to your store and sell it worldwide. Manage your store and inventory to keep your store running.

### Built With
This app was built with some technologies below:
- [JavaScript](https://www.javascript.com/)
- [Node.js](https://nodejs.org/en/)
- [React.js](https://reactjs.org/)
- [Socket.io](https://socket.io/)
- [Bootstrap](https://getbootstrap.com/)
- [Axios](https://axios-http.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Getting Started -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* [Node.js](https://nodejs.org/en/download/)
* [React.js](https://reactjs.org/docs/create-a-new-react-app.html)
* [Socket.io](https://socket.io/docs/v4/client-api/)

### Installation

- Clone the repository
```
git clone https://github.com/brndnwjy/tikitoko-app
```
- Go to repository folder
```
cd tikitoko-app
```
- Install Module
```
npm install / npm i
```
- Connect with database
- <a href="#setup-env-example">Setup .env</a>
- Type ` npm run dev` To Start Development
- Type ` npm run start` To Start Production

<p align="right">(<a href="#top">back to top</a>)</p>

### Setup .env example

Create .env file in your root project folder.

```env
# app
BACKEND_APP_API_URL = [API_URL]
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Contributing -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Screenshoots -->
## Screenshoots
<table>
  <tr>
    <td><image src="./documentation/register-b.jpeg" alt="Register - Buyer" width=100% ></td>
    <td><image src="./documentation/login-b.jpeg" alt="Login - Buyer" width=100%/></td>
  </tr>
  <tr>
    <td align="center">Register (Buyer)</td>
    <td align="center">Login (Buyer)</td>
  </tr>
  
  <tr>
    <td><image src="./documentation/register-s.jpeg" alt="Register - Seller" width=100% ></td>
    <td><image src="./documentation/login-s.jpeg" alt="Login - Seller" width=100%/></td>
  </tr>
  <tr>
    <td align="center">Register (Seller)</td>
    <td align="center">Login (Seller)</td>
  </tr>
  
  <tr>
    <td><image src="./documentation/home.png" alt="Homepage" width=100%></td>
    <td><image src="./documentation/search.png" alt="Searchpage" width=100%></td>
  </tr>
  <tr>
      <td align="center">Homepage</td>
      <td align="center">Search Result</td>
  </tr>

  <tr>
    <td><image src="./documentation/product-detail.png" alt="Product Detail" width=100%></td>
    <td><image src="./documentation/chat.jpeg" alt="Chat page" width=100%/></td>
  </tr>
   <tr>
    <td align="center">Product Detail</td>
    <td align="center">Chat Page</td>
  </tr>
  
  <tr>
    <td><image src="./documentation/mybag.jpeg" alt="Mybag" width=100%></td>
    <td><image src="./documentation/checkout.jpeg" alt="Checkout" width=100%></td>
  </tr>
  <tr>
      <td align="center">My Bag</td>
       <td align="center">Checkout</td>
  </tr>
  
  <tr>
    <td><image src="./documentation/profile-b.jpeg" alt="Profile" width=100%></td>
    <td><image src="./documentation/profile-b-address.jpeg" alt="Profile - Address" width=100%></td>
  </tr>
  <tr>
      <td align="center">Profile (Buyer)</td>
     <td align="center">Profile (Buyer) - Address Sect.</td>
  </tr>
  
  <tr>
    <td><image src="./documentation/profile-b-all-order.jpeg" alt="Profile - Order" width=100%></td>
    <td><image src="./documentation/profile-b-unpaid-order.jpeg" alt="Profile - Cancel Order" width=100%></td>
  </tr>
  <tr>
      <td align="center">Profile (Buyer) - Order Sect.</td>
     <td align="center">Profile (Buyer) - Cancel Order Sect.</td>
  </tr>
  
  <tr>
    <td><image src="./documentation/profile-s.jpeg" alt="Profile (Seller)" width=100%></td>
    <td><image src="./documentation/profile-s-list-product.jpeg" alt="Profile (Seller) - Product List" width=100%></td>    
  </tr>
  <tr>
     <td align="center">Profile (Seller)</td>
     <td align="center">Profile (Seller) - List Product</td>
  </tr>
  
  <tr>
    <td><image src="./documentation/product-add.png" alt="Profile (Seller) - New Product" width=100%></td>
    <td><image src="./documentation/profile-s-order.jpeg" alt="Profile (Seller) - Order" width=100%></td>    
  </tr>
  <tr>
     <td align="center">Profile (Seller) - New Product</td>
     <td align="center">Profile (Seller) - Order</td>
  </tr>
</table>


<!-- Related Projects -->
## Related Project
:rocket: [`Tikitoko (Backend)`](https://github.com/brndnwjy/tikitoko-api)

:rocket: [`Tikitoko App Demo`](https://tikitoko.netlify.app)

:rocket: [`Tikitoko (Admin)`](https://github.com/brndnwjy/tikitoko-admin)

:rocket: [`Tikitoko Admin Demo`](https://tikitoko-admin.netlify.app/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Meet The Teams -->
## Meet The Teams

<center>
  <table align="center">
    <tr>
      <th>Backend/PO</th>
      <th>Frontend</th>
      <th>Frontend</th>
      <th>Frontend</th>
      <th>Frontend</th>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/brndnwjy">
          <img width="150" src="https://avatars.githubusercontent.com/u/68231097?v=4" alt="Brandon Wijaya"><br/>
          <b>Brandon Wijaya</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/alfatpololo">
          <img width="150" src="https://media-exp1.licdn.com/dms/image/D5603AQFsGr9k1i8aQg/profile-displayphoto-shrink_100_100/0/1664426265179?e=1676505600&v=beta&t=BuTa0qWttnRgh3JuoOS-oYUVqEcvkM5i4h2UxdRH0Qg" alt="Muhammad Alfath Aditya"><br/>
          <b>Muhammad Alfath Aditya</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/rezafauzanakbar">
          <img width="150" src="https://avatars.githubusercontent.com/u/47907237?v=4" alt="Reza Fauzan Akbar"><br/>
          <b>Reza Fauzan Akbar</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/taufikrmdhan">
          <img width="150" src="https://avatars.githubusercontent.com/u/59110317?v=4" alt="Taufik Ramadhan"><br/>
          <b>Taufik Ramadhan</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/vickomaris">
          <img width="150" src="https://avatars.githubusercontent.com/u/64400928?v=4" alt="Vicko Maris Septiadi"><br/>
          <b>Vicko Maris Septiadi</b>
        </a>
      </td>
    </tr>
  </table>
</center>

<p align="right">(<a href="#top">back to top</a>)</p>
