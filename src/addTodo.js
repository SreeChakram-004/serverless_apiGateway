const {v4 : uuidv4} = require('uuid');
const AWS = require("aws-sdk");

const addTodo = async (event) => {
  try{
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { todo } = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = uuidv4();
  console.log("this is id",id)

  const newTodo = {id,todo,createdAt,completed: false};

  await dynamodb.put({
    TableName: 'TodoTable',
    Item: newTodo,
  }).promise()
  
  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  }
    
  }catch(error){
    console.log(error)
  } 
}

module.exports = { 
  handler : addTodo
};
