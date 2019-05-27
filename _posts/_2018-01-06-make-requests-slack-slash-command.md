
- command: /ams.connect/perform/unplugged
- url: https://limitless-sea-32755.herokuapp.com/providers/perform/unplugged
- method: GET
- Customize name: AMS.Connect-command

# Get query parameters
Then there will be an additional query parameter named text that will contain everything else after the slash command. If you just have one parameter then it should be simple to just trim and use the text query parameter but if you have multiple words and need to split them into something more meaningful, then you might have to use some regex or simple string split function.

It is documented at [How do commands work](https://api.slack.com/slash-commands#how_do_commands_work). 
For example, imagine that there's an app command installed called /weather. If someone on the example.slack.com types /weather 94070 in the #test channel and hits enter, this data would be posted to the external URL:

```
token=gIkuvaNzQIHg97ATvDxqgjtO
team_id=T0001
team_domain=example
channel_id=C2147483705
channel_name=test
user_id=U2147483697
user_name=Steve
command=/weather
text=94070
response_url=https://hooks.slack.com/commands/1234/5678
```

# Furthermore

- [Slack API: A style guide for slash commands](https://api.slack.com/tutorials/slash-commands-style-guide)
- [Slack API: Your first slash command and custom integration](https://api.slack.com/tutorials/your-first-slash-command)
- [Slack Slash Command Tutorial](https://rominirani.com/slack-slash-command-tutorial-8f78a5a2ea4a)
- [Create a custom Slack slash command with Node.js and Express](https://scotch.io/tutorials/create-a-custom-slack-slash-command-with-nodejs-and-express)