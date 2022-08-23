function createMessage(value) {
  const fields = ['text', 'blocks', 'attachments', 'thread_ts', 'mrkdwn'];

  const jsonFields = ['blocks', 'attachments'];

  return fields.reduce((json, field) => {
    if (value) {
      try {
        if (jsonFields.includes(field)) {
          json[field] = JSON.parse(value.replace(/\r?\n/g, ' '));
        } else {
          json[field] = JSON.parse(value);
        }
      } catch (error) {
        json[field] = value;
      }
    }
    return json;
  }, {});
}

module.exports = createMessage;
