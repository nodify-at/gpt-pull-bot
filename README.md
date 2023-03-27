# GPT Review Action

![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

GPT Review Action is a GitHub action that allows users to easily integrate GPT-powered code reviews into their
repositories. Leverage the power of GPT to automatically review your code, providing suggestions and improvements.

## Features

- GPT-powered code review
- Easy integration with GitHub repositories
- Customizable settings for review depth, focus, and model

## Prerequisites

- A GitHub account
- A GitHub repository
- A GPT API key from OpenAI
- A GitHub token for repository access

## Getting Started

1. In your repository, create a new `.github/workflows` directory if it doesn't already exist.
2. Create a new file named `gpt_review.yml` inside the `.github/workflows` directory.
3. Copy and paste the following code into your `gpt_review.yml` file:
    ```yaml
    name: GPT Review
    on: [push, pull_request]
    
    jobs:
      gpt_review:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout code
          uses: actions/checkout@v2
    
        - name: Run GPT Review Action
          uses: nodify-at/gpt-review-action@1.0.2 # or main to get the latest version always
          with:
            api-key: ${{ secrets.GPT_API_KEY }}
            github-token: ${{ secrets.GITHUB_TOKEN }}
    ```
4. Commit and push your changes to your repository.
5. Go to your repository's Settings > Secrets, and add a new repository secret named GPT_API_KEY with the value of your
   GPT API key from OpenAI.
6. In the same Secrets settings, add another repository secret named GITHUB_TOKEN with the value of your GitHub token.
7. The GPT Review Action will now run on every push and pull request.

### Parameters

| Name         | Type   | Description                          | Required | Defaults      |
|--------------|--------|--------------------------------------|----------|---------------|
| github-token | string | GitHub Token                         | yes      |               |
| api-token    | string | GPT API Token                        | yes      |               |
| model        | string | GPT Model Name                       | no       | gpt-3.5-turbo |
| review-focus | enum   | oneOf: syntax, performance, security | no       | syntax        |


# Customization

You can customize the GPT Review Action by modifying the gpt_review.yml file. For example, you can change the review
focus by adding the review-focus option:

```yaml
with:
  api-key: ${{ secrets.GPT_API_KEY }}
  github-token: ${{ secrets.GITHUB_TOKEN }}
  review-focus: 'performance'
```

You can also change the GPT model used for the review by adding the model option:

```yaml
with:
  api-key: ${{ secrets.GPT_API_KEY }}
  github-token: ${{ secrets.GITHUB_TOKEN }}
  model: 'your-model-name'
```

The action can use environment variables instead of action inputs, which can be helpful for integration tests. If
environment variables are set, they take precedence over action inputs. The following environment variables are
available:

* GPT_API_KEY
* GITHUB_TOKEN
* REVIEW_FOCUS
* REVIEW_MODEL

You can create a .env file in the root of your repository to apply local environment variables. This is useful for
testing the action locally. The .env file should be formatted as follows:

```properties
GPT_API_KEY=your-api-key
GITHUB_TOKEN=your-github-token
REVIEW_FOCUS=your-review-focus
REVIEW_MODEL=your-review-model
```

# Contributing

We welcome contributions to the GPT Review Action! To contribute, please follow these steps:

* Fork the repository
* Create a new branch with a descriptive name
* Commit your changes to the branch
* Open a pull request against the main branch

# License

This project is licensed under the MIT License - see the LICENSE file for details.