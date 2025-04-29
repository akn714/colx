## Routes
- LOST AND FOUND
    - GET /get_lost_and_found -> fetch all lost_and_found items
    - [ ] GET /get_lost_and_found/:id -> fetch details of a perticular lost_and_found item by id
    - POST /add_lost_and_found -> add lost_and_found item
    <!-- - POST /post_found
    - POST /post_lost -->
    - [ ] DELETE /delete_from_lost_and_found/:id -> delete a lost_and_found item from lost_and_found items by id
    - [ ] PATCH /update_lost_and_found/:id -> update a perticular lost_and_found item by id
- OLX
    - GET /fetch_products -> fetch all products
    - POST /post_product -> add a product
    - [ ] PATCH /set_sold/:id -> set the status of a product as sold
    - [ ] GET /get_product/:id -> get details of a product by id
    - [ ] DELETE /delete_product/:id -> delete a product by id
    - [ ] PATCH /update_product/:id -> update details of a perticular product
- GET * -> send index.html