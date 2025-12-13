Warehouse, Purchase & Sales Management System
===============================================

A complete backend ERP engine for managing products, categories, suppliers, purchases, purchase orders, sales orders, inventory batches, and sales bills with automatic stock tracking and GST computation.

This system implements real-world business workflows used in wholesale/retail operations and includes robust validation, multi-level batch management, and full audit logging.

Tech Stack
==========
Backend:	Node.js, Express.js
Database:	MySQL (InnoDB)
Auth	:   JWT (JSON Web Tokens)
Docs	:   Swagger (OpenAPI 3.0)
Security:	bcrypt, role-based middleware
Utils	:   dotenv, transactions, soft delete



Core Features Overview
======================


1️⃣ User & Authentication
----------------------------
Login, logout
JWT-based authentication
Role-based access (Admin / Standard User)
Authorization middleware
All protected routes validate user token
Admin routes use isAdminMiddleware

2️⃣ Category Management
----------------------------
Supports organizing products into logical groups.
Features:
Create / Update / Delete categories
Fetch category list
Map multiple categories to a product
On product update → old categories soft-deleted & rewritten
Category-based filtering

Tables:
categories : for decaring ne categories 
product_categories: mapping cayrgories with products

3️⃣ Product Management
----------------------------
Each product includes:
Name
SKU / Product Code
UOM
HSN/SAC Code
GST %
Image URL
Category mapping (multiple allowed)
Features:
CRUD operations
Category assignment
Update with category replacement
Soft deletion

Tables:
Products : creating produts

4️⃣ Product Batch Management
----------------------------
tables :
product_batches  

Each product has multiple batches.
Batch fields:
batchNumber
expiryDate
purchasePrice
sellingPrice
purchaseGst
salesGst
quantity (inventory)
UOM

Features:
Auto batch creation on purchase
Reduce batch stock on sales
FIFO or EXPIRY-based batch selection
Soft delete handling


5️⃣ Supplier Management
--------------------------
table : suppliers

Add / edit suppliers
 
6️⃣ Purchase Order (PO) Module (pending ...)
-----------------------------------------
Allows planning of incoming stock.
Features:
Create purchase order
Add PO items
Modify quantities & GST
Link PO to purchase bill (actual receipt)
Auto-fetch prices from PO when adding purchase items
No stock change until final purchase bill creation
Tables:
purchase_orders
purchase_order_items

7️⃣ Purchase Bill Module
--------------------------
Tables:
purchase_summary
purchase_items


Used for receiving goods.
Features:
Create purchase summary
Add items
Auto-create batch if batch does not exist
Increase stock per batch
Update purchase summary totals
Delete purchase item → restore stock
Delete purchase bill → restore all stock
bill approval to  lock the transaction 


8️⃣ Sales Order (SO) Module (pending ....)
-------------------------------------------
Tables:
sales_orders
sales_order_items

(If enabled for your project)
Features:
Create sales order
Add SO items
Convert SO → Sales Invoice
Auto-populate invoice items
Reserve stock option (if needed)


9️⃣ Sales Bill Module
----------------------
ables:
sales_summary
sales_items

Billing system with auto invoice number generation.
Auto-generated invoice series:
CASH → C-000001
CREDIT → CR-000001
ESTIMATE → EST-000001
Custom: first 2 letters of type
Features:
Create sales invoice
Add item to invoice
Auto batch selection:
batchId
productCode + batchNumber
productId + batchNumber
FIFO / EXPIRY
Deduct batch stock
Delete sales item → restore batch stock
Delete sales bill → restore all batches
Auto recalculation of totals:
taxableValue
gstAmount
lineTotal
cgstAmount / sgstAmount / igstAmount


🔟 Audit Logging System
------------------------
Table:
audit_log

Every critical operation logs:
userId
username
module
action
recordId
before & after snapshot
IP address
user agent
timestamp


Database ER Overview
----------------------
Modules covered:

Users
Categories
Products
Product Categories
Product Batches
Purchase Orders(pending...)
Purchase Bills
Sales Bills
Audit Logs


Running the Project
-------------------
npm install
create .env in the root folder 

variables  for .env :
---------------------
DB_HOST = hopper.proxy.rlwy.net
DB_PORT=16894
DB_USER=root
DB_PASSWORD=SKJvfPkmoVRuffqUVyTmFDaYdxPVkvAY
DB_NAME=railway
JWT_SECRET  = peko123

npm start
Swagger Documentation link :http://localhost:8092/api-docs



How to Test the API Using Swagger
---------------------------------
go to : http://localhost:8092/api-docs/#/Users/post_users_login
Copy the value of "token".
2. Authorize Swagger with JWT At the top of Swagger UI:
    Click the "Authorize" button .In the popup, enter the token there


To log out
Swagger does not have a UI logout, but you can:
Click Authorize → Logout : Clear token manually and click Authorize again