## Routes
- AUTH
    - POST /register
    - POST /login
- LOST AND FOUND
    - GET /get_lost_and_found -> fetch all lost_and_found items
    - [x] GET /get_lost_and_found/:id -> fetch details of a perticular lost_and_found item by id
    - POST /add_lost_and_found -> add lost_and_found item
    <!-- - POST /post_found
    - POST /post_lost -->
    - [x] DELETE /delete_from_lost_and_found/:id -> delete a lost_and_found item from lost_and_found items by id
    - [x] PATCH /update_lost_and_found/:id -> update a perticular lost_and_found item by id
- OLX
    - GET /fetch_products -> fetch all products
    - POST /post_product -> add a product
    - [x] PATCH /set_sold/:id -> set the status of a product as sold
    - [x] GET /get_product/:id -> get details of a product by id
    - [x] DELETE /delete_product/:id -> delete a product by id
    - [x] PATCH /update_product/:id -> update details of a perticular product
- GET * -> send index.html

### What has been done
- [x] update all controllers
- [x] updated all models
- [x] added more models
- [x] updated routers
- [x] updated routes in index.js
- [x] added authorizeUsers middleware in utils.js
- [x] Creating different models like Categories
- [ ] creating admin portal for managing whole portal like adding categories, listing users, deleting users, blocking users, deleting spams