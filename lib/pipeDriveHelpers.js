const axios = require("axios");
const { sendLead } = require("./logging");
const pipeDriveApiKey = "fdec785fb9ccfff15d6fc0519fe28cd2ab004268";

// Create person on PipeDrive
async function createPerson(email, phone, name, ref) {
  try {
    const data = JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      "6a4cfc9829228defd65df4595d7c2fcd9b85a63c": ref,
    });

    const config = {
      method: "post",
      url: `https://jerold2.pipedrive.com/api/v1/persons?api_token=${pipeDriveApiKey}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    if (response && response.data) {
      const person = {
        id: response.data.data.id,
        name: response.data.data.name,
        phone: response.data.data.phone[0].value,
        email: response.data.data.email[0].value,
      };
      sendLead(person, true, "Create Person - Success");
      return person;
    } else {
      sendLead(data, false, "Create Person - Failure");
      return { result: false, message: "Creating person error" };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

// Check if person is exists on PipeDrive
async function checkPerson(email, phone, name, ref) {
  try {
    const config = {
      method: "get",
      url: `https://jerold2.pipedrive.com/api/v1/persons/search?term=${phone}&api_token=${pipeDriveApiKey}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(config);

    if (response && response.data.data.items.length > 0) {
      const person = {
        id: response.data.data.items[0].item.id,
        name: response.data.data.items[0].item.name,
        phone: response.data.data.items[0].item.phones[0],
        email: response.data.data.items[0].item.emails[0],
      };
      sendLead(person, true, "Check Person - Success");
      return person;
    } else {
      sendLead({ email, phone, name }, false, "Check Person - Failure");
      return await createPerson(email, phone, name, ref);
    }
  } catch (err) {
    console.log(err);
  }
}

// Create new lead on PipeDrive CRM
async function createNewLead(
  name,
  phone,
  email,
  wantNotifications,
  planPackage,
  ref
) {
  try {
    const person = await checkPerson(email, phone, name, ref);

    let packageId = planPackage === "Essential" ? "27" : "28";
    let wantSecondPlan = wantNotifications === true ? "29" : "30";
    const data = JSON.stringify({
      title: `Лид ${name}`,
      // "3d83b8de4975aec7ac71f309c2ed05a7a37dba3c": packageId,
      c628a25dcd660dd15bf7db199deeec5b426062dc: "21",
      d290a81dd1f94ce65a4435af4fa757310767294b: name,
      "7512528fcc0d8403d69f581196318593bd29f81e": email,
      c7001075c6b3d8c64a75525ac032f760b56a4ed3: phone,
      "3d4189fc3def499bfc4b682147bd16752ce7256f": wantSecondPlan,
      person_id: person.id,
    });
    const config = {
      method: "post",
      url: `https://jerold2.pipedrive.com/api/v1/leads?api_token=${pipeDriveApiKey}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    if (response && response.data) {
      sendLead(JSON.parse(data), true, "Create Lead - Success");
      return response.data;
    } else {
      sendLead(JSON.parse(data), false, "Create Lead - Failure");
      return { result: false, message: "Creating lead error" };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

export { createNewLead, checkPerson, createPerson };
