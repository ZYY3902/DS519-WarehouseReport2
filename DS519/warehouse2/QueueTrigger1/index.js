const fetch = require("node-fetch");

module.exports = async function (context, myQueueItem, outputDocument) {
  // context.log('JavaScript queue trigger function processed work item', myQueueItem);

  // // Delay the execution of the function for 15 seconds
  // await new Promise(resolve => setTimeout(resolve, 15000));

  // context.log('Finished processing work item', myQueueItem);

  // // Get the image URL from the queue and call the Image Analysis API
  const image = myQueueItem.url;
  const image_url = `{'url': '${image}'}`;

  const url = "https://warehousecv.cognitiveservices.azure.com/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2023-02-01-preview";
  const subscription_key = process.env["COMPUTER_VISION_SUBSCRIPTION_KEY"];

  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Ocp-Apim-Subscription-Key": subscription_key,
          "Content-Type": "application/json",
      },
      body: image_url,
  });

  const data = JSON.stringify(await response.json());
  const dataResults = JSON.parse(data);
  const res = JSON.parse(JSON.stringify(dataResults.readResult));
  const output = res.content;

  context.log(`Image analysis Result: ${output}`);

  // post the data to Cosmos DB
  context.bindings.outputDocument = {
    imageUrl: image,
    imageData: output
  };
};
