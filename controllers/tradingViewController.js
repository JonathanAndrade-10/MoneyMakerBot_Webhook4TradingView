const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const axios = require('axios').default;

const urlGetToken = process.env.ORCH_TOKEN_URL

const bodyGetToken = { 
  "grant_type": process.env.ORCH_GRANT_TYPE, 
  "client_id": process.env.ORCH_CLIENT_ID, 
  "refresh_token": process.env.ORCH_REFRESH_TOKEN 
}

const configGetToken = {
  headers: {
    'X-UIPATH-TenantName': process.env.ORCH_TENANT_NAME
  }
}

const urlAddQueueItem = process.env.ORCH_QUEUE_URL

const bodyAddQueueItem = { 
  "itemData": { 
      "Priority": process.env.ORCH_PRIORITY, 
      "Name": process.env.ORCH_QUEUE_NAME, 
      "SpecificContent": { 
          "Symbol@odata.type": "#String", 
          "Symbol": "%SYMBOL%", 
          "AlcistaBajista": "%ALCISTA_BAJISTA%", 
          "Duration": "%DURATION%", 
          "GoalPrice": "%GOAL_PRICE%"
      } 
  } 

}

const configAddQueueItem = {
  headers: {
    "X-UIPATH-OrganizationUnitId": process.env.ORCH_OUID,
    "Authorization": 'Bearer %ORCH_TOKEN%'
  }
}

exports.createQueueItem = (req, res) => {
  
  arrSplittedReq = req.body.split(" ");
  bodyAddQueueItem.itemData.SpecificContent.Symbol = arrSplittedReq[0];
  bodyAddQueueItem.itemData.SpecificContent.AlcistaBajista = arrSplittedReq[1];
  bodyAddQueueItem.itemData.SpecificContent.Duration = arrSplittedReq[2];
  bodyAddQueueItem.itemData.SpecificContent.GoalPrice = arrSplittedReq[3];

  axios.post(urlGetToken, bodyGetToken, configGetToken)
    .then( response => {
      var orchToken = response.data.access_token;
      configAddQueueItem.headers.Authorization = `Bearer ${orchToken}`;

      axios.post(urlAddQueueItem, bodyAddQueueItem, configAddQueueItem)
        .then( () => {
          console.log('Queue item created');

          res.status(200).json({
            status: 'success',
            message: 'The new queue item was created succesfully'
          });
        })
        .catch( err => {
          console.log(err);
        });
    })
    .catch( err => {
      console.log(err.message);

      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    });
};
