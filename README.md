# Follow the steps to run the program

## HomeAway

Please follow the below steps to run the HomeAway application.

### Start Kafka server and create topics
    1. Use the below commands to start Zookeeper and Kafka servers.
       	./bin/zookeeper-server-start.sh config/zookeeper.properties
	./bin/kafka-server-start.sh config/server.properties
    2. Below command is to check the topic list.
	./bin/kafka-topics.sh --list --zookeeper localhost:2181
    3. Used the below command to create all topics used in the application.
        ./bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login
    4. Below are the list of topic names.
	login
	response_topic
	signup
	logout
	getprofile
	postprofile
	avatar
	addprop
	getpropuser
	getpropid
	updateprop
	getpropsearch
	upload
	postorder
	getorder
	postmessage
	getmessage

### Steps to start Node Back-end server
    1. cd Node-backend/
    2. npm install
    3. nodemon server.js

### Steps to start Kafka Back-end server
    1. cd Kafka-Backend/
    2. npm install
    3. nodemon index.js

### Steps to start Front-end server
    1. cd Frontend/homeaway-frontend
    2. npm install
    3. npm start
