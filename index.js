const AWS = require('aws-sdk');
const Axios = require('axios')
const dotenv = require("dotenv");
dotenv.config();

const SES_CONFIG = {
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: process.env.REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sendEmail = async (recipientEmail, msgBody, subject) => {
    let params = {
      Source: process.env.EMAILSOURCE,
      Destination: {
        ToAddresses: [
          recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: msgBody,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        }
      },
    };
    return await AWS_SES.sendEmail(params).promise();
};

const sendSlackMessage = async(slackMessage, slackChannel) =>{

  const httpPost = async (data, url) =>{
    try{
        const res = await Axios.post(url,data);
        return res.data;
    }
    catch(ex){
        console.log(`${new Date().toISOString()}: postData (Http Request) error`)
        console.log(ex)
    }
  }
  
  const payload = {
          "type":"mrkdwn",
          "text": slackMessage
      }

  await httpPost(payload,webhook)

}

module.exports = {
  sendEmail,
  sendSlackMessage
};