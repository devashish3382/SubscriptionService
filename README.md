# SubscriptionService
Add User, Get User, Purchase Plan, Get Plans

**Overview **
----------
REST service for a "Subscription as a Service" startup . Subscriptions plans to which the users of the platform can subscribe to. 

The details of each of these APIs are as follows: 
--------------------------------------------------
1. /user 
This is a simple CRUD API that adds a user to DB. PUT /user/ creates a user with specified username in the DB.

Sample Input: PUT /user/jay  
Output: Just a HTTP status: 200 on success, other appropriate code for failures

2. GET /user/< username> 
Sample Input: GET /user/jay 
Sample Output:

{      "user\_name": "jay",      "created\_at": "2020-02-29 19:30:00"  } 

3. POST /subscription/
 Description: Register a new subscription for an existing user, with a specified plan and start date 
Inputs:

{      "user\_name": < username >,     "plan\_id": < plan_id >,      "start\_date": < date in YYYY-MM-DD format >  } 

Sample Input

{ "user_name": "jay", "plan_id": "PRO_1M", "start_date": "2020-03-03" } 

Expected Output:

{ "status": <["SUCCESS"|"FAILIURE"]>, "amount": <+/- amount credited/debited> } 

Sample Output:

{ "status": "SUCCESS", "amount": -200.0 } 

Additional Details

4. GET /subscription/< username >/< date > 
Sample Input: 
/subscription/jay/2020-02-29

Note that the date in the above is optional: /subscription/jay

Expected Output:
When input date is specified
plan_id that will be active for user at specified date. Number of days left in plan from the specified input date 
Sample output 
{ "plan_id": "PRO_1M", "days_left": 3 }
When input date is NOT specified
List all subscription entries available in database for user with start and valid till dates.

Sample output

[      {          "plan_id": "TRIAL",          "start_date": "2020-02-22",          "valid_till": "2020-02-28"      },      {          "plan_id": "PRO_1M",          "start_date": "2020-02-29",          "valid_till": "2020-03-30"      }  ] 

**Database Details**
-------------------------
**NOTE: Use Mysql or mariadb**

Create Database as subscriptionservice
Inside Database subscriptionservice ,create 3 tables with help of below commands:
1. CREATE TABLE `users` (
	`user` VARCHAR(50) NOT NULL,
	`created_at` DATETIME NOT NULL DEFAULT curtime(),
	UNIQUE INDEX `unique_user_id` (`user`)
)
2. CREATE TABLE `userplans` (
	`plan_id` VARCHAR(50) NOT NULL,
	`start_date` DATE NOT NULL DEFAULT curdate(),
	`user_name` VARCHAR(50) NOT NULL,
	`expiry_date` DATE NOT NULL,
	UNIQUE INDEX `unique_user_id` (`plan_id`, `user_name`)
)
3. CREATE TABLE `plans` (
	`plan_id` VARCHAR(50) NOT NULL,
	`cost` DOUBLE NOT NULL DEFAULT 0,
	`validity` INT(11) NOT NULL,
	UNIQUE INDEX `unique_user_id` (`plan_id`)
)
