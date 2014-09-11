#1. Create 3 Users 
curl -i -H "Content-type: application/json" -X POST http://taylor.sqrawler.com/api/users -d '{"user": {"email":"Jon@splatter.com", "name":"Two Pack", "password":"P@ssw0rd"}}'
curl -i -H "Content-type: application/json" -X POST http://taylor.sqrawler.com/api/users -d '{"user": {"email":"Matt@splatter.com", "name":"Manny GEE", "password":"P@ssw0rd"}}'
curl -i -H "Content-type: application/json" -X POST http://taylor.sqrawler.com/api/users -d '{"user": {"email":"Jea@splatter.com", "name":"ASD", "password":"P@ssw0rd"}}'

#2. Create 5 Splatts for each user in a manner that mixes the chronological 
#order of the splatts between 3 users
curl -i -H "Content-type: application/json" -X POST http://taylor.sqrawler.com/api/splatts -d '{"splatt": {"body":"Hi low", "user_id":3}}'
curl -i -H "Content-type: application/json" -X POST http://taylor.sqrawler.com/api/splatts -d '{"splatt": {"body":"Splatt  2", "user_id":1}}'
curl -i -H "Content-type: application/json" -X POST http://taylor.sqrawler.com/api/splatts -d '{"splatt": {"body":"3 Splatt", "user_id":2}}'
curl -i -H "Content-type: application/json" -X POST http://taylor.sqrawler.com/api/splatts -d '{"splatt": {"body":"Good Bye", "user_id":1}}'
curl -i -H "Content-type: application/json" -X POST http://taylor.sqrawler.com/api/splatts -d '{"splatt": {"body":"Splatt", "user_id":3}}'

#3. Cause the first user to follow the other user:
curl -i -H "Content-type: application/json" -X POST http://taylor.sqrawler.com/api/users/follows -d '{"id":1, "follows_id":2}'
curl -i -H "Content-type: application/json" -X POST http://taylor.sqrawler.com/api/users/follows -d '{"id":1, "follows_id":3}'

#4 Show User 1's Splatts:
curl -i -H "Content-type: application/json" -X GET http://taylor.sqrawler.com/api/users/splatts/1

#5. Show users who User 1 Follows:
curl -i -H "Content-type: application/json" -X GET http://taylor.sqrawler.com/api/users/follows/1

#6. Get users news feed:
curl -i -H "Content-type: application/json" -X GET http://taylor.sqrawler.com/api/users/splatts-feed/1

#7. causes the first user to unfollow the third user
curl -i -H "Content-type: application/json" -X DELETE http://taylor.sqrawler.com/api/users/follows/1/3

#8.display the first users news feed after unfollowing the third
curl -i -H "Content-type: application/json" -X GET http://taylor.sqrawler.com/api/users/splatts-feed/1
