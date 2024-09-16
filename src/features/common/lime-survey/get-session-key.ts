import axios from 'axios';

exports.getSessionKey = async () => {
  try {
    return await axios.post(
      `${process.env.LIME_SURVEY_URL}/admin/remotecontrol`,
      {
        method: 'get_session_key',
        params: {
          username: process.env.LIMESURVEY_ADMIN_USER,
          password: process.env.LIMESURVEY_ADMIN_PASSWORD,
        },
        id: 1,
      },
      {
        timeout: 10000, // Timeout duration set to 10 seconds
      },
    );
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new GatewayTimeoutError(
        'The request to get the session key timed out',
      );
    } else {
      throw new BadGatewayError(
        'An error occurred while trying to get the session key',
      );
    }
  }
};
