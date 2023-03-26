# GPT Review Action

![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

GPT Review Action is a GitHub action that allows users to easily integrate GPT-powered code reviews into their repositories. Leverage the power of GPT to automatically review your code, providing suggestions and improvements.

## Features

- GPT-powered code review
- Easy integration with GitHub repositories
- Customizable settings for review depth and focus

## Prerequisites

- A GitHub account
- A GitHub repository
- A GPT API key from OpenAI

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
      uses: yourusername/gpt-review-action@main
      with:
        api-key: ${{ secrets.GPT_API_KEY }}
```

Replace yourusername with your GitHub username.
Go to your repository's Settings > Secrets, and add a new repository secret named GPT_API_KEY with the value of your GPT API key from OpenAI.
Commit and push the changes to your repository.
The GPT Review Action will now run on every push and pull request.
Customization

You can customize the GPT Review Action by modifying the gpt_review.yml file. For example, you can change the review depth by adding the review_depth option:

```yaml
with:
api-key: ${{ secrets.GPT_API_KEY }}
review-depth: 3
```

You can also change the focus of the review by adding the review_focus option:
```yaml
with:
api-key: ${{ secrets.GPT_API_KEY }}
review-focus: 'performance'
```

# Contributing

We welcome contributions to the GPT Review Action! To contribute, please follow these steps:

* Fork the repository
* Create a new branch with a descriptive name
* Commit your changes to the branch
* Open a pull request against the main branch

# License

This project is licensed under the MIT License - see the LICENSE file for details.
    


