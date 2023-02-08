const axios = require('axios');

async function sendLead(lead, status, type) {
    const putLead = axios({
        method: 'post',
        headers: { 
            'Content-Type': 'application/json', 
            'Cookie': 'gerchick_web:sess=D8p5Nw_BqeT8q7Nr6eq6csQn4inaaFeu'
        },
        url: 'https://eorqcjtf57qm0ub.m.pipedream.net',
        data: { lead, status, type }
      });
    // console.log(putLead);
    return putLead;
}

export { sendLead }; 