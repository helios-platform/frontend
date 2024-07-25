// import AWS from 'aws-sdk'

// Configure AWS SDK
AWS.config.update({
  region: 'us-west-1',
  credentials: new AWS.SharedIniFileCredentials({ profile: 'capstone-team4' })
});

// Create Kinesis client
const kinesis = new AWS.Kinesis();

const STREAM_NAME = 'Clickstream';

const clickstreamData = [
  {
    user_id: "user-001",
    session_id: "session-001",
    event_type: "click",
    event_timestamp: "2024-07-24T10:00:00Z",
    page_url: "https://example.com/product/1",
    product_id: 1,
    device: "mobile",
    browser: "chrome",
  },
  {
    user_id: "user-002",
    session_id: "session-002",
    event_type: "view",
    event_timestamp: "2024-07-24T10:01:00Z",
    page_url: "https://example.com/product/2",
    product_id: 2,
    device: "desktop",
    browser: "firefox",
  },
  {
    user_id: "user-003",
    session_id: "session-003",
    event_type: "add_to_cart",
    event_timestamp: "2024-07-24T10:02:00Z",
    page_url: "https://example.com/product/3",
    product_id: 3,
    device: "tablet",
    browser: "safari",
  },
  {
    user_id: "user-004",
    session_id: "session-004",
    event_type: "purchase",
    event_timestamp: "2024-07-24T10:03:00Z",
    page_url: "https://example.com/product/4",
    product_id: 4,
    device: "desktop",
    browser: "edge",
  },
  {
    user_id: "user-005",
    session_id: "session-005",
    event_type: "click",
    event_timestamp: "2024-07-24T10:04:00Z",
    page_url: "https://example.com/product/5",
    product_id: 5,
    device: "mobile",
    browser: "chrome",
  },
];

function sendToKinesis(data) {
  return new Promise((resolve, reject) => {
    const params = {
      Data: JSON.stringify(data),
      PartitionKey: data.user_id,
      StreamName: STREAM_NAME
    };

    kinesis.putRecord(params, (err, data) => {
      if (err) {
        console.error("Error sending to Kinesis:", err);
        reject(err);
      } else {
        console.log(`Sent event for user ${params.PartitionKey}. Kinesis response:`, data);
        resolve(data);
      }
    });
  });
}

export async function generateData() {
  try {
    console.log("Starting to send 5 clickstream events...");

    for (const data of clickstreamData) {
      await sendToKinesis(data);
      // Wait for 1 second between events
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("Test completed. Sent 5 clickstream events.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

generateData();