async function join (req) {
  const { id } = req.body;
  const user = req.user;

  const conversation = await req.db.Conversation
    .findByIdAndUpdate(id,
      { '$addToSet': { 'participants': user._id } },
      { 'new': true, 'upsert': true });

  req.$scope.conversation = conversation;

  return req;
}

module.exports = {
  join
};
