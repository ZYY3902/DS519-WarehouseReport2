module.exports = async function (context, req) {
  
  if (req.body && req.body.url) {
    // Add the image URL to the storage queue
    context.bindings.myoutputQueueItem = {
      url: req.body.url
    };

    context.res = {
      // Respond with a 200 status code and the URL that was added to the queue
      status: 200,
      body: `Added URL "${req.body.url}" to the queue`,
    };
  } else {
    context.res = {
      // Respond with a 400 status code if the request body doesn't contain a URL
      status: 400,
      body: "Please pass a URL in the request body",
    };
  }
};
