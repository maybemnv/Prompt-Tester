

# AI Prompt Stress Tester — "PromptTest"

## Overview
A sleek, dark-themed single-page application that lets users paste AI prompts and run simulated adversarial stress tests against them, displaying categorized results with risk-level color coding.

## Pages & Layout

### Single Page App
- **Header**: "PromptTest" branding (gray + orange styling), dark/light theme toggle
- **Main Content**: Centered card-based layout with clean spacing

## Features

### 1. Prompt Input
- Large textarea for pasting AI prompts
- "Generate Tests" button with orange accent styling
- Character count or prompt preview

### 2. Loading State
- Animated scanner/progress effect while "tests run" (simulated 2-3 second delay)
- Subtle pulsing or scanning animation for visual interest

### 3. Results Dashboard
- **Summary Bar**: Four stats cards showing total tests (25), breaks, risky, and safe counts with color-coded indicators (red/yellow/green)
- Results dynamically generated from mock data based on the submitted prompt

### 4. Categorized Mutation Cards
Four collapsible sections, each with expandable mutation items:
- 🔓 **Jailbreak Attacks** (7 mutations) — attempts to bypass prompt instructions
- 🎭 **Adversarial Mutations** (6 mutations) — subtle rewording attacks
- ✏️ **Typo & Confusables** (5 mutations) — character substitution tricks
- 🌀 **Edge Cases** (7 mutations) — unusual formatting and boundary tests

Each mutation card shows:
- Risk badge (red "Break" / yellow "Risky" / green "Safe")
- The mutated prompt text
- Reason/explanation for the classification
- Copy button to clipboard

### 5. Design & UX
- Dark theme by default with light theme toggle
- Orange accent color for primary actions and branding
- Smooth fade-in animations for results appearing
- Responsive layout: single column on mobile, wider cards on desktop
- Toast notifications for copy actions
- Sparkle/decorative icons for visual polish

## Mock Data Strategy
- Pre-built set of realistic adversarial mutations that adapt to include snippets of the user's actual prompt
- Randomized risk levels for variety between runs

