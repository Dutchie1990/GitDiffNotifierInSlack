# GitHub Action for notify GIT DIFF with connecting JIRA tickets to slack channel

## Feature

This custom action can sent a GIT DIFF with connecting JIRA tickets to a release slack channel.

## Usage

```yaml
- name: Slack Notification
  uses: AlphaFounders/slack-release-bot@main
  with:
    compareURL: ${{ secrets.COMPARE_URL }}
    projectNames: ${{ secrets.PROJECT_NAMES }}
    slackWebhook: ${{ secrets.INCOMING_WEBHOOK_URL }}
    repository: ${{ secrets.REPOSITORY }}
    authToken: ${{ secrets.AUTH_TOKEN }}
    jiraURL: ${{ secrets.JIRA_URL }}
    repositoryKind: 'private'
```

## Params

- compareURL:
  Please define the git diff URL of your repository,
  { required: true }
- projectNames:
  Please define your JIRA project names,
  { required: true }
- slackWebhook:
  Please define your slack webhook,
  { required: true }
- repository:
  Please define your repository name,
  { required: true }
- authToken:
  Please define your github auth token,
  { required: false }
- jiraURL:
  Please provide the jira project names,
  { required: true }
- repositoryKind:
  Please state if the repository is public or private,
  { required: true }

Here's what the Slack message would look like:

![example](/docs/images/example.png)

## Change the icon

You can change the icon for a Slack message in the Slack App settings.

Slack's new Incoming Webhooks do not allow API payloads to override the icon.

- Open [Your Apps](https://api.slack.com/apps) page
- Select your app for Incoming Webhooks
- Select `Basic Information` > `Display Information`
- Set any icon you like!
