import {
  SNSClient,
  PublishCommand,
  SetSMSAttributesCommand
} from '@aws-sdk/client-sns'

// Set the AWS Region.
const REGION = process.env.REGION

// Create SNS service object.
const snsClient = new SNSClient({ region: REGION })

const generateSecretSantaPairs = (participants) => {
  const shuffledParticipants = shuffleArray(participants)

  return shuffledParticipants.map((santa, index) => {
    const recipient =
      shuffledParticipants[(index + 1) % shuffledParticipants.length]

    return {
      santa: santa.name,
      recipient: recipient.name,
      santaNumber: santa.number.replace('04', '+614')
    }
  })
}

// Fisher-Yates shuffle algorithm to shuffle an array randomly
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const generateMessages = (secretSantaPairs) => {
  return secretSantaPairs.map((pair) => {
    return {
      Message: `Hello ${pair.santa}. You are assigned as the Secret Santa for ${pair.recipient}. Happy gifting!`,
      PhoneNumber: pair.santaNumber
    }
  })
}

export const handler = async (event) => {
  console.log(event.participants)

  const participants = event.participants

  const secretSantaPairs = generateSecretSantaPairs(participants)

  const messages = generateMessages(secretSantaPairs)

  const params = {
    attributes: {
      /* required */
      DefaultSMSType: 'Transactional' /* highest reliability */
      //'DefaultSMSType': 'Promotional' /* lowest cost */
    }
  }
  await snsClient.send(new SetSMSAttributesCommand(params))
  try {
    for (const message of messages) {
      const data = await snsClient.send(new PublishCommand(message))
      console.log('SMS sent successfully:', data)
    }

    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: true })
    }
    return response
  } catch (error) {
    console.log('Error sending SMS:', error)

    const response = {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: false, error: error.message })
    }
    return response
  }
}
