# How to Create a GitHub Release for NoteGame

This document provides step-by-step instructions for creating a GitHub release to distribute the NoteGame installer.

## Prerequisites

1. The installer file (`NoteGame-1.0.0 Setup.exe`) has been built and is available locally
2. You have appropriate permissions to create releases in the GitHub repository

## Steps to Create a Release

1. **Navigate to the GitHub Repository**
   - Go to https://github.com/GitHixy/NoteGame

2. **Create a New Release**
   - Click on the "Releases" link on the right sidebar
   - Click on the "Draft a new release" button

3. **Fill in Release Information**
   - **Tag version**: `v1.0.0` (use semantic versioning)
   - **Release title**: `NoteGame v1.0.0`
   - **Description**: Provide release notes, including:
     - New features
     - Bug fixes
     - Installation instructions
     - System requirements

4. **Upload the Installer**
   - Drag and drop the `NoteGame-1.0.0 Setup.exe` file into the designated area
   - Wait for the upload to complete (this may take some time due to the file size)

5. **Publish the Release**
   - When you're satisfied with the release information, click "Publish release"

## After Publishing

Once published, the installer will be available for download from the GitHub Releases page. The URL will be:
https://github.com/GitHixy/NoteGame/releases/tag/v1.0.0

You can then share this URL with users or update documentation to point to this release.

## Updating the README

Make sure the README.md file points to the GitHub Releases page for downloads:
```markdown
## 💾 Installation

### Windows

You can download the installer from the GitHub Releases page:

- **[Download from GitHub Releases](https://github.com/GitHixy/NoteGame/releases)**: Get the latest installer
```
