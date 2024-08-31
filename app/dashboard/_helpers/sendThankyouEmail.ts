// sends a POST request to /api/email
// takes a single email address as an argument

// create a type for responseBody of the successful POST request to /api/email
type ResponseBodyOk = {
  accepted: string[];
  rejected: string[];
  ehlo: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: { from: string; to: string[] };
  messageId: string;
};

const sendThankyouEmail = async (email: string, names: string[], custom_message?: string) => {
  console.log("Sending thank you email to:", email);
  try {
    // send a POST request to /api/email/reminder
    const res = await fetch("/api/email/thankyou", {
      method: "POST",
      body: JSON.stringify({
        email,
        names,
        custom_message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Failed to send email. Status: ${res.status}\n ${errorBody}`);
    }
    // get the response body
    const responseBody = await res.text();
    const parsedResponseBody = JSON.parse(responseBody) as ResponseBodyOk;

    // log to the console the emails that were accepted
    console.log("Successfully sent to: ", parsedResponseBody.accepted);
    // // log to the console the emails that were rejected
    if (parsedResponseBody.rejected.length > 0) {
      console.log("Rejected: ", parsedResponseBody.rejected);
    }
    // return the response body
    return parsedResponseBody;
  } catch (error) {
    // handle errors here
    console.error(error);
  }
};

export default sendThankyouEmail;
